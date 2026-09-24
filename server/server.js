import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import express from 'express';
import helmet from 'helmet';
import compression from 'compression';
import rateLimit from 'express-rate-limit';
import cors from 'cors';
import fs from 'fs';
import OpenAI from 'openai';

// Import routes & db AFTER env setup
import connectDatabase from './config/database.js';
import authRoutes from './routes/auth.js';
import projectRoutes from './routes/projects.js';
import skillRoutes from './routes/skills.js';
import testimonialRoutes from './routes/testimonials.js';
import contactRoutes from './routes/contact.js';
import { initOpenAIRoutes } from './routes/openAI.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '.env') });

// Fail fast if required secrets are missing
const requiredEnvVars = ['MONGODB_URI', 'JWT_SECRET', 'GROQ_API_KEY'];
const missingEnvVars = requiredEnvVars.filter((key) =>!process.env[key]);
if (missingEnvVars.length > 0) {
  console.error(`Missing required environment variables: ${missingEnvVars.join(', ')}`);
  process.exit(1);
}

const knowledgePath = path.join(__dirname, "knowledge.txt");
const knowledgeText = fs.readFileSync(knowledgePath, 'utf-8');

// OPENAI / GROQ CLIENT
const client = new OpenAI({
  baseURL: 'https://api.groq.com/openai/v1',
  apiKey: process.env.GROQ_API_KEY,
});

// FIXED askLLM - now uses safeHistory correctly
async function askLLM(question, context = "", history = []) {
  const systemMessage = context
   ? `You are a helpful assistant for NovaTech. Use ONLY the context below to answer questions about NovaTech.
- If the answer is clearly in the context, answer concisely using that information.
- If the answer is NOT in the context, say: "I don't have information about that in my knowledge base."

Context: ${context}`
    : "You are a helpful assistant. Answer clearly and concisely";

  // Build messages: system + history + current question
  const messages = [
    { role: "system", content: systemMessage },
   ...history, // <-- safeHistory from router lands here
    { role: "user", content: question }
  ];

  const completion = await client.chat.completions.create({
    model: "openai/gpt-oss-20b",
    messages: messages,
  });

  return completion.choices[0].message.content;
}

// NOW init router - after askLLM is defined
const openAIRouter = initOpenAIRoutes(askLLM, knowledgeText);

const app = express();
const PORT = process.env.PORT || 5000;

connectDatabase();
app.set('trust proxy', 1);

app.use(helmet());
app.use(compression());

if (process.env.NODE_ENV!== 'production') {
  app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
  });
}

// CORS
const allowedOrigins = (process.env.ALLOWED_ORIGINS || 'https://personal-portfolio-ten-lime-93.vercel.app,http://localhost:5173,http://localhost:5174')
 .split(',')
 .map((origin) => origin.trim());

app.use(cors({
  origin(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    return callback(new Error('Not allowed by CORS'));
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  credentials: true,
}));

// Rate limits
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 300,
  standardHeaders: true,
  legacyHeaders: false,
});
app.use('/api', apiLimiter);

const chatLimiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 10,
  message: { error: "Too many messages, slow down." }
});

app.use(express.json({ limit: '100kb' }));
app.use(express.urlencoded({ extended: true, limit: '100kb' }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/skills', skillRoutes);
app.use('/api/testimonials', testimonialRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/openAI', chatLimiter, openAIRouter); // limiter + router together

app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import Skill from './models/Skill.js';

dotenv.config({ path: new URL('./.env', import.meta.url) });

const aiSkills = [
  {
    name: 'AI API Integration',
    category: 'tools',
    level: 'Intermediate',
    percentage: 60,
    experience: '1+ year'
  },
  {
    name: 'Prompt Engineering',
    category: 'tools',
    level: 'Intermediate',
    percentage: 60,
    experience: '1+ year'
  },
  {
    name: 'Retrieval-Augmented Generation (RAG)',
    category: 'tools',
    level: 'Beginner',
    percentage: 45,
    experience: 'Learning'
  }
];

try {
  await mongoose.connect(process.env.MONGODB_URI);
  await Skill.deleteMany({ category: 'tools' });
  await Skill.insertMany(aiSkills);
  console.log('AI skills migrated successfully.');
} catch (error) {
  console.error(`AI skills migration failed: ${error.message}`);
  process.exitCode = 1;
} finally {
  await mongoose.disconnect();
}

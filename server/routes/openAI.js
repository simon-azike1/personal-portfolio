import express from 'express';

export function initOpenAIRoutes(_askLLM, _knowledgeText) {
  const router = express.Router(); // create INSIDE, not outside
  const askLLM = _askLLM;
  const knowledgeText = _knowledgeText;

  // POST /ask - single question
  router.post('/ask', async (req, res) => {
    try {
      const { question } = req.body;

      if (!question || typeof question !== 'string' || question.trim().length === 0) {
        return res.status(400).json({ error: "Missing or invalid 'question'" });
      }
      if (question.length > 500) {
        return res.status(400).json({ error: "Question too long (max 500)" });
      }

      const answer = await askLLM(question, knowledgeText);
      const outOfKnowledge = answer.toLowerCase().includes("i don't have information");

      res.json({ question, answer, outOfKnowledge });

    } catch (err) {
      console.error('REAL ERROR in /ask:', err);
      res.status(500).json({ error: err.message });
    }
  });

  // POST /chat - with history
  router.post('/chat', async (req, res) => {
    try {
      const { message, history } = req.body;

      if (!message || typeof message !== 'string' || message.trim().length === 0) {
        return res.status(400).json({ error: "Missing or invalid 'message'" });
      }
      if (message.length > 500) {
        return res.status(400).json({ error: "Message too long (max 500)" });
      }

      const safeHistory = (history || []).slice(-6);

      const reply = await askLLM(message, knowledgeText, safeHistory);

      res.json({ message, reply });

    } catch (err) {
      console.error('REAL ERROR in /chat:', err);
      res.status(500).json({ error: err.message });
    }
  });

  return router;
}
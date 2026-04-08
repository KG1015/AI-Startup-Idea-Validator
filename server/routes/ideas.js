import express from 'express';
import Idea from '../models/Idea.js';
import { analyzeIdea } from '../services/aiService.js';

const router = express.Router();

// POST /api/ideas -> accepts idea + triggers AI analysis
router.post('/', async (req, res) => {
  try {
    const { title, description } = req.body;
    if (!title || !description) {
      return res.status(400).json({ error: 'Title and description are required' });
    }

    const analysis = await analyzeIdea(title, description);

    const newIdea = new Idea({
      title,
      description,
      analysis
    });

    const savedIdea = await newIdea.save();
    res.status(201).json(savedIdea);
  } catch (error) {
    console.error(error);
    const message = error.message === "The free AI model is currently overloaded. Please try again in a few seconds." 
      ? error.message 
      : 'Server error analyzing or saving idea';
    res.status(error.message.includes('overloaded') ? 429 : 500).json({ error: message });
  }
});

// GET /api/ideas -> returns list of saved ideas
router.get('/', async (req, res) => {
  try {
    const ideas = await Idea.find().sort({ createdAt: -1 });
    res.json(ideas);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error fetching ideas' });
  }
});

// GET /api/ideas/:id -> returns full analysis report
router.get('/:id', async (req, res) => {
  try {
    const idea = await Idea.findById(req.params.id);
    if (!idea) {
      return res.status(404).json({ error: 'Idea not found' });
    }
    res.json(idea);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error fetching idea' });
  }
});

// DELETE /api/ideas/:id -> optional
router.delete('/:id', async (req, res) => {
  try {
    const idea = await Idea.findByIdAndDelete(req.params.id);
    if (!idea) {
      return res.status(404).json({ error: 'Idea not found' });
    }
    res.json({ message: 'Idea deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error deleting idea' });
  }
});

export default router;

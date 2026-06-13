import express from 'express';
import Submission from '../models/Submission.js';
import { requireAdmin } from '../middleware/auth.js';

const router = express.Router();

// POST /api/submissions — public, called by the contact form
router.post('/', async (req, res) => {
  try {
    const { name, email, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'name, email, and message are required' });
    }
    const submission = await Submission.create({ name, email, message });
    res.status(201).json(submission);
  } catch (err) {
    console.error('POST /submissions:', err.message);
    res.status(500).json({ error: 'Failed to save submission' });
  }
});

// All routes below require admin auth
router.use(requireAdmin);

// GET /api/submissions — list all (with optional ?status= and ?search=)
router.get('/', async (req, res) => {
  try {
    const { status, search } = req.query;
    const query = {};
    if (status && status !== 'all') query.status = status;
    if (search) {
      const re = { $regex: search, $options: 'i' };
      query.$or = [{ name: re }, { email: re }, { message: re }];
    }
    const submissions = await Submission.find(query).sort({ createdAt: -1 });
    res.json(submissions);
  } catch (err) {
    console.error('GET /submissions:', err.message);
    res.status(500).json({ error: 'Failed to fetch submissions' });
  }
});

// GET /api/submissions/stats — counts per status
router.get('/stats', async (req, res) => {
  try {
    const [total, newCount, read, replied] = await Promise.all([
      Submission.countDocuments(),
      Submission.countDocuments({ status: 'new' }),
      Submission.countDocuments({ status: 'read' }),
      Submission.countDocuments({ status: 'replied' }),
    ]);
    res.json({ total, new: newCount, read, replied });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch stats' });
  }
});

// PATCH /api/submissions/:id/status — update status
router.patch('/:id/status', async (req, res) => {
  try {
    const { status } = req.body;
    const allowed = ['new', 'read', 'replied'];
    if (!allowed.includes(status)) {
      return res.status(400).json({ error: `status must be one of: ${allowed.join(', ')}` });
    }
    const submission = await Submission.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    if (!submission) return res.status(404).json({ error: 'Submission not found' });
    res.json(submission);
  } catch (err) {
    console.error('PATCH /submissions/:id/status:', err.message);
    res.status(500).json({ error: 'Failed to update status' });
  }
});

// DELETE /api/submissions/:id
router.delete('/:id', async (req, res) => {
  try {
    const submission = await Submission.findByIdAndDelete(req.params.id);
    if (!submission) return res.status(404).json({ error: 'Submission not found' });
    res.json({ success: true });
  } catch (err) {
    console.error('DELETE /submissions/:id:', err.message);
    res.status(500).json({ error: 'Failed to delete submission' });
  }
});

export default router;

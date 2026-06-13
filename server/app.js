import express from 'express';
import cors from 'cors';
import submissionsRouter from './routes/submissions.js';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/submissions', submissionsRouter);

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok' });
});

export default app;

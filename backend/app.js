import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import blogRoutes from './routes/blogRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';
import authRoutes from './routes/auth.js';

dotenv.config();

const app = express();

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

app.use(express.json());

// Main API routes
app.use('/api/blogs', blogRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/auth', authRoutes);

// Test routes
app.get('/', (req, res) => {
  res.send('✅ Server is up and running!');
});

app.get('/api', (req, res) => {
  res.send('✅ API base route is working!');
});

export default app;  
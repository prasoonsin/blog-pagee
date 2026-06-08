import express from 'express';
import { loginUser } from '../controllers/authcontroller.js';

const router = express.Router();

// Test route to check if the auth route is working
router.get('/test', (req, res) => {
  res.send("✅ Auth route is working. Use POST /login to log in.");
});

// Login route
router.post('/login', loginUser);

export default router;

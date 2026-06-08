import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import app from './app.js'; //  main Express app

dotenv.config();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});

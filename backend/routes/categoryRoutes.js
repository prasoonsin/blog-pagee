// routes/categoryRoutes.js
import express from 'express';
import {
  getAllCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from '../controllers/categoryController.js';

import { authenticate, authorizeAdmin } from '../middleware/auth.js';

const router = express.Router();

// Public: Fetch all categories
router.get('/', getAllCategories);

// Admin only: Create, Update, Delete
router.post('/', authenticate, authorizeAdmin, createCategory);
router.put('/:id', authenticate, authorizeAdmin, updateCategory);
router.delete('/:id', authenticate, authorizeAdmin, deleteCategory);

export default router;

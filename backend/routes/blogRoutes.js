import express from 'express';
import {
  getAllBlogs,
  getBlogById,
  createBlog,
  updateBlog,
  deleteBlog,
  getBlogsByCategory,
  getBlogsByUser,
} from '../controllers/blogController.js';

import { authenticate, authorizeAdmin } from '../middleware/auth.js';

const router = express.Router();

// Public Routes (no auth required)
router.get('/', getAllBlogs);
router.get('/category/:categoryId', getBlogsByCategory);  
router.get('/user/:userId', getBlogsByUser);             
router.get('/:id', getBlogById);                         

//  Admin Routes (require auth + admin role)
router.post('/', authenticate, authorizeAdmin, createBlog);
router.put('/:id', authenticate, authorizeAdmin, updateBlog);
router.delete('/:id', authenticate, authorizeAdmin, deleteBlog);

export default router;  
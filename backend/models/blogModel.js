import sql from 'mssql';
import { poolPromise } from '../config/db.js';

// Get all blogs
export const getAllBlogs = async () => {
  const pool = await poolPromise;
  const result = await pool.request().query(`
    SELECT 
      b.id, b.title, b.content, b.image_url, b.created_at,
      u.username AS author,
      c.name AS category
    FROM Blogs b
    LEFT JOIN Users u ON b.user_id = u.id
    LEFT JOIN Categories c ON b.category_id = c.id
    ORDER BY b.created_at DESC
  `);
  return result.recordset;
};

// Get blog by ID
export const getBlogById = async (id) => {
  const pool = await poolPromise;
  const result = await pool.request()
    .input('id', sql.Int, id)
    .query('SELECT * FROM Blogs WHERE id = @id');
  return result.recordset[0];
};

// Get blogs by category
export const getBlogsByCategory = async (categoryId) => {
  const pool = await poolPromise;
  const result = await pool.request()
    .input('category_id', sql.Int, categoryId)
    .query('SELECT * FROM Blogs WHERE category_id = @category_id');
  return result.recordset;
};

// Get blogs by user
export const getBlogsByUser = async (userId) => {
  const pool = await poolPromise;
  const result = await pool.request()
    .input('user_id', sql.Int, userId)
    .query('SELECT * FROM Blogs WHERE user_id = @user_id');
  return result.recordset;
};

// Get recent blogs
export const getRecentBlogs = async () => {
  const pool = await poolPromise;
  const result = await pool.request()
    .query('SELECT TOP 5 * FROM Blogs ORDER BY created_at DESC');
  return result.recordset;
};

// Create blog
export const createBlog = async ({ title, content, image_url, user_id, category_id }) => {
  const pool = await poolPromise;
  await pool.request()
    .input('title', sql.NVarChar, title)
    .input('content', sql.NVarChar(sql.MAX), content)
    .input('image_url', sql.NVarChar, image_url)
    .input('user_id', sql.Int, user_id)
    .input('category_id', sql.Int, category_id)
    .query(`
      INSERT INTO Blogs (title, content, image_url, user_id, category_id, created_at)
      VALUES (@title, @content, @image_url, @user_id, @category_id, GETDATE())
    `);
};

// Update blog
export const updateBlog = async (id, { title, content, image_url, category_id }) => {
  const pool = await poolPromise;
  await pool.request()
    .input('id', sql.Int, id)
    .input('title', sql.NVarChar, title)
    .input('content', sql.NVarChar(sql.MAX), content)
    .input('image_url', sql.NVarChar, image_url)
    .input('category_id', sql.Int, category_id)
    .query(`
      UPDATE Blogs
      SET title = @title,
          content = @content,
          image_url = @image_url,
          category_id = @category_id
      WHERE id = @id
    `);
};

// Delete blog
export const deleteBlog = async (id) => {
  const pool = await poolPromise;
  await pool.request()
    .input('id', sql.Int, id)
    .query('DELETE FROM Blogs WHERE id = @id');
};

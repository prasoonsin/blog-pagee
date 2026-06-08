import { poolPromise } from '../config/db.js';

// Create a new blog
export const createBlog = async (req, res) => {
  try {
    const { title, content, image_url, user_id, category_id } = req.body;

    const pool = await poolPromise;
    await pool.request()
      .input('title', title)
      .input('content', content)
      .input('image_url', image_url)
      .input('user_id', user_id)
      .input('category_id', category_id)
      .query(`
        INSERT INTO Blogs (title, content, image_url, user_id, category_id, created_at)
        VALUES (@title, @content, @image_url, @user_id, @category_id, GETDATE())
      `);

    res.status(201).json({ message: 'Blog created successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error creating blog', error: error.message });
  }
};

// Get all blogs
export const getAllBlogs = async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request().query(`
      SELECT 
        b.*, 
        u.name AS username, 
        c.name AS category_name
      FROM Blogs b
      JOIN Users u ON b.user_id = u.id
      JOIN Categories c ON b.category_id = c.id
      ORDER BY b.created_at DESC
    `);

    res.json(result.recordset);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching blogs', error: error.message });
  }
};

// Get blog by ID
export const getBlogById = async (req, res) => {
  try {
    const { id } = req.params;

    const pool = await poolPromise;
    const result = await pool.request()
      .input('id', id)
      .query(`
        SELECT 
          b.*, 
          u.name AS username, 
          c.name AS category_name
        FROM Blogs b
        JOIN Users u ON b.user_id = u.id
        JOIN Categories c ON b.category_id = c.id
        WHERE b.id = @id
      `);

    if (result.recordset.length === 0) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    res.json(result.recordset[0]);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching blog', error: error.message });
  }
};

// Delete blog
export const deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;

    const pool = await poolPromise;
    const result = await pool.request()
      .input('id', id)
      .query('DELETE FROM Blogs WHERE id = @id');

    if (result.rowsAffected[0] === 0) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    res.json({ message: 'Blog deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting blog', error: error.message });
  }
};

// Update blog
export const updateBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content, image_url, category_id } = req.body;

    const pool = await poolPromise;
    const result = await pool.request()
      .input('id', id)
      .input('title', title)
      .input('content', content)
      .input('image_url', image_url)
      .input('category_id', category_id)
      .query(`
        UPDATE Blogs 
        SET title = @title, 
            content = @content, 
            image_url = @image_url, 
            category_id = @category_id
        WHERE id = @id
      `);

    if (result.rowsAffected[0] === 0) {
      return res.status(404).json({ message: 'Blog not found or no changes made' });
    }

    res.json({ message: 'Blog updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error updating blog', error: error.message });
  }
};

// ✅ Get blogs by category
export const getBlogsByCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;

    const pool = await poolPromise;
    const result = await pool.request()
      .input('categoryId', categoryId)
      .query(`
        SELECT 
          b.*, 
          u.name AS username, 
          c.name AS category_name
        FROM Blogs b
        JOIN Users u ON b.user_id = u.id
        JOIN Categories c ON b.category_id = c.id
        WHERE b.category_id = @categoryId
        ORDER BY b.created_at DESC
      `);

    res.json(result.recordset);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching blogs by category', error: error.message });
  }
};

// ✅ Get blogs by user
export const getBlogsByUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const pool = await poolPromise;
    const result = await pool.request()
      .input('userId', userId)
      .query(`
        SELECT 
          b.*, 
          u.name AS username, 
          c.name AS category_name
        FROM Blogs b
        JOIN Users u ON b.user_id = u.id
        JOIN Categories c ON b.category_id = c.id
        WHERE b.user_id = @userId
        ORDER BY b.created_at DESC
      `);

    res.json(result.recordset);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching blogs by user', error: error.message });
  }
}; 
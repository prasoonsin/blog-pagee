import sql from 'mssql';
import { poolPromise } from '../config/db.js';

// Get all categories
export const getAllCategories = async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request().query('SELECT * FROM Categories ORDER BY name ASC');
    res.status(200).json(result.recordset);
  } catch (err) {
    console.error('❌ Error fetching categories:', err.message);
    res.status(500).json({ error: 'Failed to fetch categories', details: err.message });
  }
};

// Create a new category
export const createCategory = async (req, res) => {
  const { name } = req.body;

  if (!name || name.trim() === '') {
    return res.status(400).json({ error: 'Category name is required' });
  }

  try {
    const pool = await poolPromise;

    // Check if category already exists
    const checkResult = await pool.request()
      .input('name', sql.NVarChar, name.trim())
      .query('SELECT COUNT(*) AS count FROM Categories WHERE name = @name');

    if (checkResult.recordset[0].count > 0) {
      return res.status(409).json({ error: 'Category already exists' });
    }

    await pool.request()
      .input('name', sql.NVarChar, name.trim())
      .query('INSERT INTO Categories (name) VALUES (@name)');

    res.status(201).json({ message: '✅ Category created successfully' });
  } catch (err) {
    console.error('❌ Error creating category:', err.message);
    res.status(500).json({ error: 'Failed to create category', details: err.message });
  }
};

// Update a category
export const updateCategory = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  if (!name || name.trim() === '') {
    return res.status(400).json({ error: 'Category name is required' });
  }

  try {
    const pool = await poolPromise;

    // Check if category exists
    const check = await pool.request()
      .input('id', sql.Int, id)
      .query('SELECT * FROM Categories WHERE id = @id');

    if (check.recordset.length === 0) {
      return res.status(404).json({ error: 'Category not found' });
    }

    // Update
    await pool.request()
      .input('id', sql.Int, id)
      .input('name', sql.NVarChar, name.trim())
      .query('UPDATE Categories SET name = @name WHERE id = @id');

    res.status(200).json({ message: '✅ Category updated successfully' });
  } catch (err) {
    console.error('❌ Error updating category:', err.message);
    res.status(500).json({ error: 'Failed to update category', details: err.message });
  }
};

// Delete a category
export const deleteCategory = async (req, res) => {
  const { id } = req.params;

  try {
    const pool = await poolPromise;

    // Check if category exists
    const check = await pool.request()
      .input('id', sql.Int, id)
      .query('SELECT * FROM Categories WHERE id = @id');

    if (check.recordset.length === 0) {
      return res.status(404).json({ error: 'Category not found' });
    }

    // Delete
    await pool.request()
      .input('id', sql.Int, id)
      .query('DELETE FROM Categories WHERE id = @id');

    res.status(200).json({ message: '🗑️ Category deleted successfully' });
  } catch (err) {
    console.error('❌ Error deleting category:', err.message);
    res.status(500).json({ error: 'Failed to delete category', details: err.message });
  }
};

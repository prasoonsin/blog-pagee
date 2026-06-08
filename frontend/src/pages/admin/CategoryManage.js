import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const CategoryManage = () => {
  const [categories, setCategories] = useState([]);
  const [nameInput, setNameInput] = useState('');
  const [editId, setEditId] = useState(null);
  const [openMaster, setOpenMaster] = useState(false);

  // Fetch categories from backend
  const loadCategories = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/categories');
      setCategories(res.data);
    } catch (err) {
      console.error('⚠️ Could not fetch categories:', err);
    }
  };

  // Add or update category
  const saveCategory = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('You must be logged in as admin to continue.');
      return;
    }

    if (!nameInput.trim()) {
      alert('Category name cannot be empty.');
      return;
    }

    try {
      if (editId) {
        await axios.put(
          `http://localhost:5000/api/categories/${editId}`,
          { name: nameInput },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } else {
        await axios.post(
          'http://localhost:5000/api/categories',
          { name: nameInput },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      }

      setNameInput('');
      setEditId(null);
      loadCategories();
    } catch (err) {
      console.error('🚫 Error saving category:', err);
      alert('Oops! Couldn’t save category.');
    }
  };

  // Edit category
  const startEdit = (category) => {
    setNameInput(category.name);
    setEditId(category.id);
  };

  // Delete category
  const removeCategory = async (id) => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('You must be logged in as admin to continue.');
      return;
    }

    if (!window.confirm('Are you sure you want to delete this category?')) return;

    try {
      await axios.delete(`http://localhost:5000/api/categories/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      loadCategories();
    } catch (err) {
      console.error('🚫 Error deleting category:', err);
      alert('Failed to delete category.');
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r shadow fixed left-0 top-0 h-full z-10">
        <div className="px-6 py-4 border-b">
          <img src="/your-logo.png" alt="Logo" className="w-36" />
          <p className="text-sm text-gray-500">Blog Page</p>
        </div>

        <nav className="mt-4 px-4">
          <div
            onMouseEnter={() => setOpenMaster(true)}
            onMouseLeave={() => setOpenMaster(false)}
            className="relative cursor-pointer"
          >
            <p className="py-2 font-medium text-gray-800 hover:text-blue-600 flex justify-between items-center">
              Master <span>›</span>
            </p>
            {openMaster && (
              <div className="ml-4 space-y-2">
                <Link
                  to="/admin/category-manage"
                  className="block text-sm text-gray-600 hover:text-blue-600"
                >
                  ➤ Edit Category
                </Link>
                <Link
                  to="/admin/blog-manage"
                  className="block text-sm text-gray-600 hover:text-blue-600"
                >
                  ➤ Edit Blog
                </Link>
              </div>
            )}
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <div className="ml-64 flex-1 p-6">
        <h2 className="text-xl font-bold mb-4">Manage Categories</h2>

        <div className="mb-4 flex space-x-4">
          <input
            type="text"
            placeholder="Enter category name"
            value={nameInput}
            onChange={(e) => setNameInput(e.target.value)}
            className="border px-3 py-2 rounded w-64"
          />
          <button
            onClick={saveCategory}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            {editId ? 'Update Category' : 'Add Category'}
          </button>
        </div>

        <table className="w-full border mt-4">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-4 py-2">ID</th>
              <th className="border px-4 py-2">Name</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((cat) => (
              <tr key={cat.id}>
                <td className="border px-4 py-2">{cat.id}</td>
                <td className="border px-4 py-2">{cat.name}</td>
                <td className="border px-4 py-2 space-x-2">
                  <button
                    onClick={() => startEdit(cat)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => removeCategory(cat.id)}
                    className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CategoryManage;

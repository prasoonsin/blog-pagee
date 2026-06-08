// src/pages/admin/BlogEdit.js
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const BlogEdit = () => {
  const [openMaster, setOpenMaster] = useState(false);
  const [blogs, setBlogs] = useState([]);
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    image_url: "",
    category_id: "",
    user_id: 1 // Replace with actual logged-in user's ID
  });
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token"); // Retrieve JWT token

  // Fetch blogs
  const fetchBlogs = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/blogs");
      setBlogs(res.data);
    } catch (err) {
      console.error("Error fetching blogs:", err);
    }
  };

  // Fetch categories
  const fetchCategories = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/categories");
      setCategories(res.data);
    } catch (err) {
      console.error("Error fetching categories:", err);
    }
  };

  useEffect(() => {
    fetchBlogs();
    fetchCategories();
  }, []);

  // Handle form change
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // Submit form (Create or Update)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (editId) {
        await axios.put(
          `http://localhost:5000/api/blogs/${editId}`,
          formData,
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } else {
        await axios.post(
          "http://localhost:5000/api/blogs",
          formData,
          { headers: { Authorization: `Bearer ${token}` } }
        );
      }

      // Reset form
      setFormData({
        title: "",
        content: "",
        image_url: "",
        category_id: "",
        user_id: 1
      });
      setEditId(null);
      fetchBlogs();
    } catch (err) {
      console.error("Error saving blog:", err);
    } finally {
      setLoading(false);
    }
  };

  // Edit blog
  const handleEdit = (blog) => {
    setFormData({
      title: blog.title,
      content: blog.content,
      image_url: blog.image_url || "",
      category_id: blog.category_id,
      user_id: blog.user_id
    });
    setEditId(blog.id);
  };

  // Delete blog
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this blog?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/blogs/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchBlogs();
    } catch (err) {
      console.error("Error deleting blog:", err);
    }
  };

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
        {/* Form */}
        <h2 className="text-2xl font-bold mb-4">
          {editId ? "Edit Blog" : "Create New Blog"}
        </h2>
        <form
          onSubmit={handleSubmit}
          className="bg-white p-4 rounded shadow mb-6 space-y-4"
        >
          <input
            type="text"
            name="title"
            placeholder="Blog Title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded"
          />
          <textarea
            name="content"
            placeholder="Blog Content"
            value={formData.content}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded"
            rows="4"
          ></textarea>
          <input
            type="text"
            name="image_url"
            placeholder="Image URL"
            value={formData.image_url}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />
          <select
            name="category_id"
            value={formData.category_id}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded"
          >
            <option value="">-- Select Category --</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              {loading ? "Saving..." : editId ? "Update Blog" : "Create Blog"}
            </button>
            {editId && (
              <button
                type="button"
                onClick={() => {
                  setFormData({
                    title: "",
                    content: "",
                    image_url: "",
                    category_id: "",
                    user_id: 1
                  });
                  setEditId(null);
                }}
                className="ml-2 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
              >
                Cancel
              </button>
            )}
          </div>
        </form>

        {/* Table */}
        <h2 className="text-2xl font-bold mb-4">All Blogs</h2>
        <div className="bg-white rounded shadow overflow-x-auto">
          <table className="min-w-full border">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 border">Title</th>
                <th className="px-4 py-2 border">Author</th>
                <th className="px-4 py-2 border">Category</th>
                <th className="px-4 py-2 border">Image</th>
                <th className="px-4 py-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {blogs.length > 0 ? (
                blogs.map((blog) => (
                  <tr key={blog.id}>
                    <td className="px-4 py-2 border">{blog.title}</td>
                    <td className="px-4 py-2 border">{blog.username}</td>
                    <td className="px-4 py-2 border">{blog.category_name}</td>
                    <td className="px-4 py-2 border">
                      {blog.image_url && (
                        <img
                          src={blog.image_url}
                          alt={blog.title}
                          className="w-20 h-12 object-cover"
                        />
                      )}
                    </td>
                    <td className="px-4 py-2 border space-x-2">
                      <button
                        onClick={() => handleEdit(blog)}
                        className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(blog.id)}
                        className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center py-4">
                    No blogs found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default BlogEdit;

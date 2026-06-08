import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateBlogPage = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

  useEffect(() => {
    axios.get(`${API_BASE_URL}/categories`)
      .then(res => setCategories(res.data))
      .catch(err => console.error('Error fetching categories:', err));
  }, [API_BASE_URL]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId'); // ✅ Get userId

    if (!token || !userId) {
      alert('You must be logged in as admin to create a blog.');
      return;
    }

    try {
      await axios.post(`${API_BASE_URL}/blogs`, {
        title,
        content,
        image_url: imageUrl || 'https://via.placeholder.com/600x400.png?text=Blog+Image',
        category_id: categoryId,
        user_id: userId, // ✅ Add this line
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      navigate('/');
    } catch (error) {
      console.error('❌ Error creating blog:', error.response?.data || error.message);
      alert(error.response?.data?.error || 'Something went wrong while creating the blog.');
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow mt-6">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Create New Blog</h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        <input
          type="text"
          placeholder="Blog Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded"
          required
        />
        <textarea
          placeholder="Blog Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded h-40 resize-none"
          required
        />
        <input
          type="text"
          placeholder="Image URL (optional)"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded"
        />
        <select
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded"
          required
        >
          <option value="">Select Category</option>
          {categories.map(cat => (
            <option key={cat.id} value={cat.id}>{cat.name}</option>
          ))}
        </select>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700 transition duration-200"
        >
          Post Blog
        </button>
      </form>
    </div>
  );
};

export default CreateBlogPage;

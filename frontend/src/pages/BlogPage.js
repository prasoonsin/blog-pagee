// BlogPage.js

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const BlogPage = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/blogs/${id}`)
      .then(res => {
        setBlog(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch blog details:', err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div className="text-center text-gray-600 p-6">Loading...</div>;
  if (!blog) return <div className="text-center text-red-500 p-6">Blog not found.</div>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">{blog.title}</h1>

      <p className="text-sm text-gray-500 mb-4">
        Category: <span className="text-indigo-600 font-medium">{blog.category_name}</span> • 
        Posted on {new Date(blog.created_at).toLocaleDateString()}
      </p>

      <img
        src={blog.image_url || 'https://via.placeholder.com/600x300?text=Blog+Image'}
        alt={blog.title}
        className="w-full h-64 object-cover rounded mb-6"
      />

      <p className="text-lg text-gray-800 leading-relaxed whitespace-pre-line">
        {blog.content}
      </p>
    </div>
  );
};

export default BlogPage;

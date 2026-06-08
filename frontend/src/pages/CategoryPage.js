import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import BlogCard from '../components/BlogCard';

const CategoryPage = () => {
  const { id } = useParams();
  const [blogs, setBlogs] = useState([]);
  const [categoryName, setCategoryName] = useState('');

  const API_BASE = process.env.REACT_APP_API_BASE_URL;

  useEffect(() => {
    axios.get(`${API_BASE}/blogs/category/${id}`)
      .then(res => {
        setBlogs(res.data.blogs || res.data);
        setCategoryName(res.data.categoryName || '');
      })
      .catch(err => {
        console.error('Error fetching blogs by category:', err);
      });
  }, [id, API_BASE]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <h2 className="text-3xl font-bold mb-6 text-center">
        {categoryName ? `Blogs in "${categoryName}"` : 'Category Blogs'}
      </h2>
      {blogs.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {blogs.map(blog => (
            <BlogCard key={blog.id} blog={blog} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No blogs found in this category.</p>
      )}
    </div>
  );
};

export default CategoryPage; 
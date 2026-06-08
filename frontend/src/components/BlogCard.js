import React from 'react';
import { useNavigate } from 'react-router-dom';

const BlogCard = ({ blog }) => {
  const navigate = useNavigate();

  // ✅ Return null if blog is not defined or not an object
  if (!blog || typeof blog !== 'object') return null;

  // ✅ Optional chaining to safely access properties
  const imageUrl = blog?.image_url || 'https://via.placeholder.com/600x300?text=Blog+Image';
  const title = blog?.title || 'Untitled Blog';
  const category = blog?.category_name || 'General';
  const date = blog?.created_at
    ? new Date(blog.created_at).toLocaleDateString()
    : 'Unknown Date';

  const shortContent =
    typeof blog.content === 'string' && blog.content.length > 120
      ? blog.content.substring(0, 120) + '...'
      : blog.content || 'No content available.';

  return (
    <div
      onClick={() => navigate(`/blog/${blog.id}`)}
      className="bg-white rounded-lg shadow hover:shadow-md transition cursor-pointer overflow-hidden"
    >
      {/* Blog Image */}
      <img
        src={imageUrl}
        alt={title}
        className="w-full h-48 object-cover"
      />

      {/* Blog Info */}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-blue-800 mb-2">{title}</h3>
        <p className="text-sm text-gray-600 mb-1">{category} • {date}</p>
        <p className="text-gray-700 text-sm">{shortContent}</p>
      </div>
    </div>
  );
};

export default BlogCard;

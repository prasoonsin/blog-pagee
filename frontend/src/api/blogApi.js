import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api";

export const fetchBlogs = async () => {
  const res = await axios.get(`${API_BASE_URL}/blogs`);
  return res.data;
};

export const fetchBlogById = async (id) => {
  const res = await axios.get(`${API_BASE_URL}/blogs/${id}`);
  return res.data;
};

export const createBlog = async (data) => {
  const res = await axios.post(`${API_BASE_URL}/blogs`, data);
  return res.data;
};

export const fetchBlogsByCategory = async (category) => {
  const res = await axios.get(`${API_BASE_URL}/blogs/category/${category}`);
  return res.data;
};

import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'; // Named import, as your version requires

// Components
import Header from './components/Header';
import Footer from './components/Footer';

// Pages
import HomePage from './pages/HomePage';
import CategoryPage from './pages/CategoryPage';
import BlogPage from './pages/BlogPage';
import CreateBlog from './pages/CreateBlogPage';
import LoginPage from './pages/loginpage';
import AdminDashboard from './pages/admin/AdminDashboard';
import CategoryManage from './pages/admin/CategoryManage';
import BlogManagement from './pages/admin/BlogEdit';

function App() {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      setIsAdmin(false);
      return;
    }

    try {
      const decoded = jwtDecode(token);
      const currentTime = Date.now() / 1000;

      if (decoded.exp < currentTime || decoded.role !== 'admin') {
        localStorage.clear();
        setIsAdmin(false);
      } else {
        setIsAdmin(true);
      }
    } catch (error) {
      localStorage.clear();
      setIsAdmin(false);
    }
  }, []);

  return (
    <Router>
      <Header />
      <main className="min-h-screen px-4 py-8 bg-gray-100">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/category/:id" element={<CategoryPage />} />
          <Route path="/blog/:id" element={<BlogPage />} />
          <Route path="/create" element={isAdmin ? <CreateBlog /> : <Navigate to="/" />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/auth/login" element={<LoginPage />} />

          {/* Admin Routes */}
          <Route
            path="/admin-dashboard"
            element={isAdmin ? <AdminDashboard /> : <Navigate to="/login" />}
          />
          <Route
            path="/admin/category-manage"
            element={isAdmin ? <CategoryManage /> : <Navigate to="/login" />}
          />
          <Route
            path="/admin/blog-manage"
            element={isAdmin ? <BlogManagement /> : <Navigate to="/login" />}
          />

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;

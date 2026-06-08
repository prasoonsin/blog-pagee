import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-blue-800 text-white py-6 mt-10">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 items-center text-center md:text-left">

        {/* Left Section - Logo & Copyright */}
        <div>
          <h1 className="text-2xl font-bold tracking-wide">MyBlog</h1>
          <p className="text-sm mt-1">&copy; {currentYear} All rights reserved.</p>
        </div>

        {/* Center Section - Quick Links */}
        <div>
          <h2 className="font-semibold mb-2">Quick Links</h2>
          <ul className="space-y-1">
            <li>
              <Link to="/" className="hover:underline hover:text-yellow-300 transition-colors duration-200">Home</Link>
            </li>
            <li>
              <Link to="/create" className="hover:underline hover:text-yellow-300 transition-colors duration-200">Create Blog</Link>
            </li>
            <li>
              <Link to="/category/1" className="hover:underline hover:text-yellow-300 transition-colors duration-200">Categories</Link>
            </li>
          </ul>
        </div>

        {/* Right Section - Social Links */}
        <div>
          <h2 className="font-semibold mb-2">Follow Us</h2>
          <div className="flex justify-center md:justify-start gap-4 text-xl">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="hover:text-yellow-300 transition-colors duration-200">
              <FaFacebookF />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="hover:text-yellow-300 transition-colors duration-200">
              <FaTwitter />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:text-yellow-300 transition-colors duration-200">
              <FaInstagram />
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;

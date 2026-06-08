import React, { useState, useEffect } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const toggleMenu = () => setIsOpen(!isOpen);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const role = localStorage.getItem("role");
    if (role && role.toLowerCase() === "admin") {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("role");
    setIsAdmin(false);
    navigate("/");
  };

  // Show Logout only if user is admin AND on /admin-dashboard page
  const showLogout = isAdmin && location.pathname === "/admin-dashboard";

  return (
    <header className="bg-blue-700 text-white shadow-md">
      <div className="max-w-7xl mx-auto p-4 flex justify-between items-center">
        <NavLink to="/" className="text-2xl font-bold">
          MyBlog
        </NavLink>

        {/* Desktop Menu */}
        <nav className="hidden md:flex space-x-6 items-center">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "underline text-yellow-300" : "hover:underline"
            }
          >
            Home
          </NavLink>

          {showLogout && (
            <button
              onClick={handleLogout}
              className="hover:underline text-red-300"
            >
              Logout
            </button>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMenu}
          className="md:hidden text-2xl focus:outline-none"
          aria-label="Toggle Menu"
        >
          {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden px-4 pb-4 space-y-2">
          <NavLink
            to="/"
            onClick={toggleMenu}
            className={({ isActive }) =>
              isActive
                ? "block underline text-yellow-300"
                : "block hover:underline"
            }
          >
            Home
          </NavLink>

          {showLogout && (
            <button
              onClick={() => {
                handleLogout();
                toggleMenu();
              }}
              className="block text-red-300 hover:underline"
            >
              Logout
            </button>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;

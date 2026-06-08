import React, { useState } from "react";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  const [openMaster, setOpenMaster] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r shadow fixed left-0 top-0 h-full z-10">
        <div className="px-6 py-4 border-b">
          <img
            src="/your-logo.png"
            alt="Logo"
            className="w-36"
          />
          <p className="text-sm text-gray-500">
            Blog Page
          </p>
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

          {/* Other Sidebar Items */}
          <p className="py-2 font-medium text-gray-800 hover:text-blue-600">
          
          </p>
          <p className="py-2 font-medium text-gray-800 hover:text-blue-600">
           
          </p>
          <p className="py-2 font-medium text-gray-800 hover:text-blue-600">
          
          </p>
        </nav>
      </div>

      {/* Main Content */}
      <div className="ml-64 flex-1 flex items-center justify-center min-h-screen">
        {/* Centered Welcome Box */}
        <div className="bg-gradient-to-r from-purple-600 to-blue-500 text-white text-2xl font-bold px-10 py-12 rounded-lg shadow-lg w-max h-48 flex items-center justify-center">
          Welcome to Admin Dashboard
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

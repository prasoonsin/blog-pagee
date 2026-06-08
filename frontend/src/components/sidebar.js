import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="w-64 h-screen bg-gray-800 text-white fixed top-0 left-0 flex flex-col shadow-lg">
      <div className="text-xl font-bold p-6 border-b border-gray-700">
        Admin Panel
      </div>
      <div className="flex-1 p-4">
        <h2 className="text-sm text-gray-400 mb-2">Master</h2>
        <ul className="space-y-2">
          <li>
            <Link
              to="/admin/category-manage"
              className="block px-4 py-2 rounded hover:bg-gray-700"
            >
              Edit Category
            </Link>
          </li>
          <li>
            <Link
              to="/admin/blogs"
              className="block px-4 py-2 rounded hover:bg-gray-700"
            >
              Blog Manage
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;

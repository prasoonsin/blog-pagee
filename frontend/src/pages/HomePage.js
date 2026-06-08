// src/pages/HomePage.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import BlogCard from "../components/BlogCard";

const HomePage = () => {
  const [blogs, setBlogs] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const blogsRes = await axios.get("http://localhost:5000/api/blogs");
        const categoriesRes = await axios.get(
          "http://localhost:5000/api/categories"
        );
        setBlogs(blogsRes.data);
        setCategories(categoriesRes.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  // ✅ handle search input
  const handleSearch = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  // ✅ filter blogs by category
  const filteredBlogs =
    selectedCategory === "all"
      ? blogs
      : blogs.filter((blog) => blog.category_id === selectedCategory);

  // ✅ filter by search
  const searchedBlogs = filteredBlogs.filter((blog) =>
    blog.title.toLowerCase().includes(searchTerm)
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* MAIN CONTENT + SIDEBAR */}
      <section className="py-12 px-6 md:px-16 grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* LEFT: BLOGS */}
        <div className="md:col-span-2">
          {/* Blogs */}
          <div className="grid sm:grid-cols-2 gap-8">
            {searchedBlogs.length > 0 ? (
              searchedBlogs.map((blog) => (
                <BlogCard key={blog.id} blog={blog} />
              ))
            ) : (
              <p className="text-center text-gray-500 col-span-2">
                No blogs found.
              </p>
            )}
          </div>
        </div>

        {/* RIGHT: SIDEBAR */}
        <aside className="space-y-8">
          {/* Search Bar */}
          <div className="border rounded-lg p-4 shadow-sm">
            <input
              type="text"
              placeholder="Enter your keywords..."
              value={searchTerm}
              onChange={handleSearch}
              className="w-full p-2 border rounded focus:outline-none"
            />
          </div>

          {/* About Me */}
          <div className="bg-white p-6 rounded-xl shadow text-center">
            <img
              src="https://via.placeholder.com/150"
              alt="Author"
              className="w-24 h-24 mx-auto rounded-full mb-4"
            />
            <h3 className="text-xl font-bold mb-2">About Me</h3>
            <p className="text-gray-600 text-sm mb-4">
              Hi, I’m the author of EduBlog. I write about design, coding, and
              education.
            </p>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
              About Author
            </button>
          </div>

          {/* ✅ Categories Section */}
          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="text-lg font-bold mb-4 border-b pb-2">Categories</h3>
            <ul className="space-y-2 text-sm">
              <li
                className={`flex justify-between cursor-pointer ${
                  selectedCategory === "all" ? "text-blue-600 font-semibold" : ""
                }`}
                onClick={() => setSelectedCategory("all")}
              >
                <span>All</span>
                <span>{blogs.length}</span>
              </li>
              {categories.map((cat) => (
                <li
                  key={cat.id}
                  className={`flex justify-between cursor-pointer ${
                    selectedCategory === cat.id
                      ? "text-blue-600 font-semibold"
                      : ""
                  }`}
                  onClick={() => setSelectedCategory(cat.id)}
                >
                  <span>{cat.name}</span>
                  <span>
                    {blogs.filter((b) => b.category_id === cat.id).length}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Quote + Portfolio */}
          <div className="bg-pink-600 text-white p-6 rounded-xl shadow text-center">
            <p className="italic mb-4">
              “The future belongs to those who believe in the beauty of their
              dreams.”
            </p>
            <button className="bg-white text-pink-600 px-4 py-2 rounded-lg font-semibold">
              Explore Portfolio
            </button>
          </div>

          {/* Popular Posts */}
          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="text-lg font-bold mb-4 border-b pb-2">
              Popular Posts
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                Traveling abroad will change you forever <br />
                <span className="text-gray-500">April 30, 2016</span>
              </li>
              <li>
                Having a new perspective on New York City <br />
                <span className="text-gray-500">March 10, 2016</span>
              </li>
              <li>
                The incredible talents of street performers <br />
                <span className="text-gray-500">March 05, 2016</span>
              </li>
            </ul>
          </div>

          {/* Tags Cloud */}
          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="text-lg font-bold mb-4 border-b pb-2">Tags Cloud</h3>
            <div className="flex flex-wrap gap-2">
              {[
                "Advertisement",
                "Artistry",
                "Blog",
                "Conceptual",
                "Design",
                "Fashion",
                "Inspiration",
                "Smart",
                "Quotes",
                "Unique",
                "Concepts",
              ].map((tag, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 bg-gray-200 text-sm rounded-lg hover:bg-blue-600 hover:text-white cursor-pointer"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Archive */}
          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="text-lg font-bold mb-4 border-b pb-2">Archive</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex justify-between">
                <span>July 2017</span> <span>12</span>
              </li>
              <li className="flex justify-between">
                <span>June 2017</span> <span>05</span>
              </li>
              <li className="flex justify-between">
                <span>May 2017</span> <span>08</span>
              </li>
              <li className="flex justify-between">
                <span>April 2017</span> <span>10</span>
              </li>
              <li className="flex justify-between">
                <span>March 2017</span> <span>21</span>
              </li>
              <li className="flex justify-between">
                <span>February 2017</span> <span>09</span>
              </li>
              <li className="flex justify-between">
                <span>January 2017</span> <span>10</span>
              </li>
            </ul>
          </div>
        </aside>
      </section>
    </div>
  );
};

export default HomePage;

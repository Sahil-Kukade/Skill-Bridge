import React, { useEffect, useState } from "react";
import { apiConnector } from "../services/apiconnector";
import { categories } from "../services/apis";
import { Link } from "react-router-dom";
import { Book } from "lucide-react";
import HighlightText from "../components/core/HomePage/HighlightText"


const ShowAllCategories = () => {
  const [categoryList, setCategoryList] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await apiConnector("GET", categories.CATEGORIES_API);
        setCategoryList(res.data.data);
      } catch (error) {
        console.error("Failed to fetch categories", error);
      }
    };
    fetchCategories();
  }, []);

  return (
    <div className="text-white px-6 md:px-16 py-10 min-h-screen bg-richblack-900">
      <h1 className="text-4xl font-extrabold text-center text-yellow-25 mb-12">
        Explore All Categories
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {categoryList.map((category, index) => (
          <Link
            to={`/catalog/${category.name.split(" ").join("-").toLowerCase()}`}
            key={index}
            className="flex flex-col items-start gap-3 p-6 bg-richblack-800 rounded-xl transition-transform duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/50"
          >
            <div className="flex items-center gap-3">
              <Book className="text-blue-100 w-6 h-6" />
              <h2 className="text-2xl font-semibold text-blue-100">
                 <HighlightText text={category.name} />
              </h2>
            </div>
            <p className="text-richblack-300">{category.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ShowAllCategories;

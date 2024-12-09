/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import axios from "axios";
import { FaMicrochip } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import API_URL from "../api";
import { useTranslation } from "react-i18next";

export default function Products() {
  const [activeTab, setActiveTab] = useState("");
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language;

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/categories`);
      // console.log("Fetched categories:", response.data);

      const categoryNames = response.data.map((category) => ({
        id: category._id,
        name: currentLanguage === "fr" ? category.name.fr : category.name.en,
      }));
      setCategories(categoryNames);
      setActiveTab(categoryNames[0]?.name || "");
    } catch (err) {
      console.error("Error fetching categories:", err);
      setError("Failed to load categories.");
    }
  };

  const fetchCategoryWithProducts = async (categoryId) => {
    try {
      const response = await axios.get(
        `${API_URL}/api/categories/${categoryId}`
      );
      // console.log("Fetched category products:", response.data);

      const categoryData = response.data;

      if (categoryData.isTrending) {
        const trendingProduct = {
          id: categoryData.isTrending._id,
          title:
            currentLanguage === "fr"
              ? categoryData.isTrending.title.fr
              : categoryData.isTrending.title.en,
          description:
            currentLanguage === "fr"
              ? categoryData.isTrending.description.fr
              : categoryData.isTrending.description.en,
          features:
            currentLanguage === "fr"
              ? categoryData.isTrending.features.fr
              : categoryData.isTrending.features.en,
          images: categoryData.isTrending.images,
        };
        setProducts([trendingProduct]);
      } else {
        setProducts([]);
      }
    } catch (err) {
      console.error("Error fetching category with products:", err);
      setError("Failed to load category products. Please try again later.");
    }
  };

  useEffect(() => {
    fetchCategories();
  }, [currentLanguage]);

  useEffect(() => {
    if (categories.length > 0 && activeTab) {
      const category = categories.find(
        (cat) => (currentLanguage === "fr" ? cat.name : cat.name) === activeTab
      );

      if (category) {
        fetchCategoryWithProducts(category.id);
      }
    }
  }, [activeTab, categories, currentLanguage]);

  const handleExplore = () => {
    const category = categories.find((cat) => cat.name === activeTab);
    if (category) {
      navigate(`/products?category=${category.id}`);
    }
  };

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  const currentProduct = products.length > 0 ? products[0] : null;

  return (
    <div className="max-w-5xl px-4 mx-auto mt-2 -mb-[500px] md:-mb-[400px] sm:mt-16">
      <h1 className="mb-6 text-lg font-bold text-center text-gray-600 sm:text-3xl lg:text-4xl">
        {t("our-products")}
      </h1>

      <div className="flex flex-col justify-center mb-8 space-y-4 sm:flex-row sm:space-y-0 sm:space-x-12 lg:space-x-24">
        {categories.slice(0, 5).map((category, index) => (
          <button
            key={index}
            className={`px-4 py-2 font-semibold transition duration-300 text-sm md:text-lg ${
              activeTab === category?.name
                ? "text-red-600 border-b-2 border-red-600"
                : "text-gray-600 hover:text-red-600"
            }`}
            onClick={() => setActiveTab(category?.name)}
          >
            {category?.name}
          </button>
        ))}
      </div>

      <div>
        {currentProduct && currentProduct.title ? (
          <div className="flex flex-col items-center gap-8 mt-8 lg:gap-12 lg:flex-row sm:mt-24 md:mt-24 lg:mt-24">
            <div className="relative flex items-center justify-center w-full max-w-md border-4 border-red-500 rounded-full aspect-square mb-[300px]">
              {currentProduct.images.length > 0 ? (
                <img
                  src={`${API_URL}${currentProduct.images[0]}`}
                  alt={currentProduct.title}
                  className="absolute object-contain w-full h-full p-2 rounded-full"
                  loading="eager"
                />
              ) : (
                <div className="flex items-center justify-center w-full h-full bg-gray-200 rounded-full">
                  <span className="text-gray-500">No Image Available</span>
                </div>
              )}
            </div>

            <div className="w-full lg:w-1/2 -mt-72 lg:mt-0 pb-[400px] px-8">
              <div className="flex items-center pb-24 space-x-4">
                <div className="flex-shrink p-3 bg-red-100 border border-red-600 rounded-full">
                  <FaMicrochip className="text-red-500 md:h-7 md:w-7" />
                </div>
                <span className="font-semibold text-red-600">01</span>
                <div className="w-48 h-[0.5px] bg-red-600 "></div>
                <span
                  className="ml-2 text-gray-600"
                  dangerouslySetInnerHTML={{
                    __html: currentProduct.title || "Lorem ipsum dolor",
                  }}
                />
              </div>
              <h2 className="mb-6 -mt-12 text-lg font-bold sm:text-3xl lg:text-4xl">
                {currentProduct.title}
              </h2>

              <p
                className="mb-6 text-sm text-gray-600 sm:text-base lg:text-lg"
                dangerouslySetInnerHTML={{
                  __html:
                    currentProduct.description.length > 130
                      ? `${currentProduct.description.slice(0, 130)}...`
                      : currentProduct.description,
                }}
              />
              <ul className="space-y-4">
                {currentProduct.features ? (
                  <li className="flex items-start">
                    <span
                      className="text-sm sm:text-base lg:text-lg"
                      dangerouslySetInnerHTML={{
                        __html: currentProduct.features,
                      }}
                    />
                  </li>
                ) : (
                  <li className="flex items-start">
                    <span className="text-sm sm:text-base lg:text-lg">
                      No features available for this product.
                    </span>
                  </li>
                )}
              </ul>

              <div className="flex justify-center mt-4">
                <Link to={`/products/${currentProduct.id}`}>
                  <button className="px-6 py-2 text-sm font-semibold text-white bg-red-500 rounded-lg md:text-base md:px-8 md:py-3">
                    {t("See-more")}
                  </button>
                </Link>
              </div>

              <div className="flex items-center justify-center px-4 mt-4 md:mt-48 md:items-start md:justify-start ">
                <button
                  onClick={handleExplore}
                  className="px-4 py-1 font-semibold text-white bg-blue-500 rounded-lg md:px-4 md:py-2 -mx-44 hover:bg-blue-600"
                >
                  {t("Explore-related-products")}
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center mt-8">
            <div className="relative flex items-center justify-center w-full max-w-md border-4 border-white rounded-full aspect-square mb-[300px]">
              <div className="absolute flex items-center justify-center w-full h-full">
                <p className="text-gray-600">
                  No products available for this category.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

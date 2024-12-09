/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import API_URL from "../api";
import { FaSearch } from "react-icons/fa";
import { useTranslation } from "react-i18next";

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [isLoadingSuggestions, setIsLoadingSuggestions] = useState(false);
  const location = useLocation();
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language;

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/categories`);
      const categoryData = response.data.map((category) => ({
        id: category._id,
        name: currentLanguage === "fr" ? category.name.fr : category.name.en,
      }));
      const allOptions = { id: "all", name: t("allproducts") };
      setCategories([allOptions, ...categoryData]);
    } catch (err) {
      console.error("Error fetching categories:", err);
    }
  };

  const fetchActiveProducts = async (categoryId = "all") => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${API_URL}/api/products/get/active/product`
      );

      const productData = response.data.map((product) => ({
        id: product._id,
        title: currentLanguage === "fr" ? product.title.fr : product.title.en,
        images: product.images,
        description:
          currentLanguage === "fr"
            ? product.description.fr
            : product.description.en,
        category: product.category._id,
      }));

      const filteredProducts =
        categoryId !== "all"
          ? productData.filter((product) => product.category === categoryId)
          : productData;

      setProducts(filteredProducts);
    } catch (err) {
      console.error("Error fetching active products:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (searchTerm.length >= 2) {
        setIsLoadingSuggestions(true);
        try {
          const response = await axios.get(
            `${API_URL}/api/products/suggest/search-product`,
            {
              params: { query: searchTerm, language: currentLanguage },
            }
          );

          setSuggestions(response.data);
        } catch (error) {
          console.error("Error fetching search suggestions:", error);
          setSuggestions([]);
        } finally {
          setIsLoadingSuggestions(false);
        }
      } else {
        setSuggestions([]);
      }
    };

    const handler = setTimeout(() => {
      fetchSuggestions();
    }, 300);

    return () => clearTimeout(handler);
  }, [searchTerm, currentLanguage]);

  const handleSuggestionSelect = async (product) => {
    setSearchTerm(product.title);
    setSuggestions([]);

    try {
      const response = await axios.get(
        `${API_URL}/api/products/${product._id}`
      );
      const selectedProduct = response.data;

      setProducts([
        {
          id: selectedProduct._id,
          title:
            currentLanguage === "fr"
              ? selectedProduct.title.fr
              : selectedProduct.title.en,
        },
      ]);
    } catch (error) {
      console.error("Error fetching selected product details:", error);
      setProducts([]);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      if (searchTerm.length >= 3) {
        const filteredProducts = products.filter((product) =>
          product.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setProducts(filteredProducts.length > 0 ? filteredProducts : []);
      } else {
        fetchActiveProducts(selectedCategory);
      }
      setSuggestions([]);
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchActiveProducts(selectedCategory);
  }, [currentLanguage]);

  useEffect(() => {
    if (searchTerm.length === 0) {
      fetchActiveProducts(selectedCategory);
    }
  }, [searchTerm, selectedCategory]);

  const handleCategoryChange = (e) => {
    const categoryId = e.target.value;
    setSelectedCategory(categoryId);
    setSearchTerm("");
    fetchActiveProducts(categoryId);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center space-x-2">
        Loading....
      </div>
    );
  }

  return (
    <div className="min-h-screen mb-12 bg-gray-50">
      <div className="relative h-64 bg-gray-900 sm:h-80 md:h-[30rem]">
        <img
          src="https://cdn.pixabay.com/photo/2019/09/29/22/06/light-bulb-4514505_1280.jpg"
          alt="Circuit Board"
          className="object-cover w-full h-full rounded-lg"
          loading="eager"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <h1 className="text-2xl font-bold text-white sm:text-3xl md:text-4xl lg:text-5xl">
            {t("our-products")}
          </h1>
        </div>
      </div>

      <div className="container flex flex-col p-4 mx-auto mt-8 space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4 max-w-7xl">
        <div className="flex-none w-full sm:w-36">
          <select
            value={selectedCategory}
            onChange={handleCategoryChange}
            className="w-full py-3 text-gray-700 bg-white border border-gray-300 shadow-sm rounded-3xl focus:outline-none focus:ring focus:border-blue-300"
          >
            {categories.map((category) => (
              <option
                className="text-center"
                key={category.id}
                value={category.id}
              >
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex-grow">
          <div className="relative w-full sm:w-[400px]">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Search for products..."
              className="w-full px-4 py-3 border border-gray-300 rounded-3xl"
            />
            <FaSearch className="absolute text-gray-500 right-3 top-4" />
            {suggestions.length > 0 && (
              <ul className="absolute z-10 w-full overflow-y-auto bg-white border border-gray-300 rounded-lg shadow-lg max-h-60">
                {suggestions.map((product) => (
                  <li
                    key={product.id}
                    className="p-2 cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSuggestionSelect(product)}
                  >
                    {product.title}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>

      <div className="container p-4 mx-auto mt-8">
        {products.length === 0 && selectedCategory !== "all" && (
          <p className="text-red-500">
            No active products found in this category.
          </p>
        )}
        <div className="grid grid-cols-2 gap-1 px-0 md:gap-6 md:px-12 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 ">
          {products.map((product) => (
            <div
              key={product.id}
              className="flex flex-col justify-between p-4 transition-transform duration-300 ease-in-out bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg hover:scale-105"
            >
              <Link
                to={`/products/${product.id}`}
                className="flex flex-col h-full"
              >
                <div className="flex-grow">
                  {Array.isArray(product.images) &&
                  product.images.length > 0 ? (
                    <img
                      src={`${API_URL}${product.images[0]}`}
                      alt={product.title}
                      className="object-contain h-24 mb-2 transition-transform duration-300 ease-in-out rounded-lg md:h-48 md:w-full hover:scale-105"
                      loading="eager"
                    />
                  ) : (
                    <div className="flex items-center justify-center w-full h-48 text-gray-500 bg-gray-200 rounded-lg">
                      No Image Available
                    </div>
                  )}
                  <h2 className="mt-2 font-bold text-gray-800 md:text-xl">
                    {product.title}
                  </h2>
                  <p
                    className="mb-2 text-sm text-gray-600"
                    dangerouslySetInnerHTML={{
                      __html:
                        product.description && product.description.length > 120
                          ? `${product.description.slice(0, 120)}...`
                          : product.description,
                    }}
                  />
                </div>
              </Link>
              <Link
                to={`/products/${product.id}`}
                className="inline-block mt-2 text-sm font-semibold text-left text-blue-500 md:text-lg hover:underline"
              >
                Read more
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;

/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import axios from "axios";
import {
  FaEdit,
  FaTrashAlt,
  FaArrowLeft,
  FaArrowRight,
  FaEye,
  FaCheck,
} from "react-icons/fa";
import API_URL from "../../../api";

const Category = () => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [nameEn, setNameEn] = useState("");
  const [nameFr, setNameFr] = useState("");
  const [image, setImage] = useState(null);
  const [editingCategory, setEditingCategory] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [categoriesPerPage] = useState(8);
  const [modalOpen, setModalOpen] = useState(false);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState("");
  const [categoryProducts, setCategoryProducts] = useState({});

  useEffect(() => {
    fetchCategories();
  }, []);

  // useEffect(() => {
  //   console.log(selectedProducts);
  // }, [selectedProducts]);

  useEffect(() => {
    if (selectedCategory) {
      setSelectedProduct(selectedCategory.isTrending || "");
      fetchProductsByCategory(selectedCategory._id);
    }
  }, [selectedCategory]);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_URL}/api/categories`);
      if (Array.isArray(res.data)) {
        setCategories(res.data);
      } else {
        console.error("Unexpected response:", res.data);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchProductsByCategory = async (categoryId) => {
    try {
      const res = await axios.get(
        `${API_URL}/api/products/category/${categoryId}`
      );
      if (Array.isArray(res.data)) {
        setSelectedProducts(res.data);
        // setSelectedProduct("");
      } else {
        console.error("Unexpected response:", res.data);
      }
    } catch (error) {
      console.error("Error fetching products:", error.response?.data);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", JSON.stringify({ en: nameEn, fr: nameFr }));
    if (image) formData.append("image", image);

    setLoading(true);

    try {
      if (editingCategory && editingCategory._id) {
        await axios.put(
          `${API_URL}/api/categories/${editingCategory._id}`,
          formData
        );
        console.log("Update Response:", formData);
        alert("Category updated successfully!");
      } else {
        await axios.post(`${API_URL}/api/categories`, formData);
      }

      resetForm();
      fetchCategories();
    } catch (error) {
      console.error(
        "Error submitting category:",
        error.response?.data || error.message
      );
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      setLoading(true);
      await axios.delete(`${API_URL}/api/categories/${id}`);
      fetchCategories();
    } catch (error) {
      console.error("Error deleting category:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (category) => {
    setNameEn(category.name?.en || "");
    setNameFr(category.name?.fr || "");
    setEditingCategory(category);
    if (category.image) {
      setImagePreview(`${API_URL}/uploads/categories/${category.image}`);
    }

    setModalOpen(true);
  };

  const handleView = (category) => {
    setSelectedCategory(category);
    fetchProductsByCategory(category._id);
    setViewModalOpen(true);
  };
  const handleSelectProduct = (newProductId) => {
    setSelectedProduct(newProductId);
  };

  const handleSaveProduct = async () => {
    if (!selectedProduct) {
      alert("Please select a product to set as trending.");
      return;
    }
    try {
      setLoading(true);
      await axios.put(
        `${API_URL}/api/categories/${selectedCategory._id}/products`,
        {
          productId: selectedProduct,
        }
      );
      alert("Trending product set successfully!");
      setViewModalOpen(false);
      fetchCategories();
    } catch (error) {
      console.error("Error setting trending product:", error);
      alert("Failed to set trending product.");
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const resetForm = () => {
    setNameEn("");
    setNameFr("");
    setImage(null);
    setImagePreview(null);
    setEditingCategory(null);
    setModalOpen(false);
  };

  const indexOfLastCategory = currentPage * categoriesPerPage;
  const indexOfFirstCategory = indexOfLastCategory - categoriesPerPage;
  const currentCategories = categories.slice(
    indexOfFirstCategory,
    indexOfLastCategory
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container p-4 mx-auto">
      <h1 className="mb-6 text-3xl font-bold">Category Management</h1>

      <button
        onClick={() => setModalOpen(true)}
        className="px-4 py-2 mb-4 text-white bg-blue-500 rounded hover:bg-blue-700"
      >
        Add Category
      </button>

      {modalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="w-full max-w-lg p-6 bg-white rounded-lg shadow-lg">
            <h2 className="mb-4 text-2xl font-semibold">
              {editingCategory ? "Update Category" : "Add Category"}
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label>Category Name (English):</label>
                <input
                  type="text"
                  value={nameEn}
                  onChange={(e) => setNameEn(e.target.value)}
                  required
                  className="w-full p-2 border"
                />
              </div>
              <div className="mb-4">
                <label>Category Name (French):</label>
                <input
                  type="text"
                  value={nameFr}
                  onChange={(e) => setNameFr(e.target.value)}
                  required
                  className="w-full p-2 border"
                />
              </div>

              <div className="mb-4">
                <label className="block mb-2 text-lg font-medium">
                  Upload Image:
                </label>
                <input
                  type="file"
                  onChange={handleFileChange}
                  className="w-full p-2 border border-gray-300 rounded"
                />
                {imagePreview && (
                  <div className="mt-2">
                    <img
                      src={imagePreview}
                      alt="Image preview"
                      className="object-cover w-24 h-24 rounded"
                    />
                  </div>
                )}
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-700"
                >
                  {editingCategory ? "Update Category" : "Add Category"}
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-4 py-2 ml-4 text-white bg-red-500 rounded hover:bg-red-700"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {viewModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="w-full max-w-lg p-6 bg-white rounded-lg shadow-lg">
            <h2 className="mb-4 text-2xl font-semibold">
              Related Products for {selectedCategory?.name?.en}
            </h2>

            <div className="mb-4">
              <label className="block mb-2 text-lg font-medium">
                Select Product:
              </label>
              <select
                value={selectedProduct}
                onChange={(e) => setSelectedProduct(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
              >
                <option value="">Choose a product</option>
                {selectedProducts.map((product) => (
                  <option key={product._id} value={product._id}>
                    {product.title.en}
                  </option>
                ))}
              </select>
            </div>

            {selectedCategory?.isTrending && (
              <div className="flex items-center mt-2">
                <FaCheck className="mr-2 text-green-500" />
                <span>
                  {" "}
                  {selectedProducts.find(
                    (product) => product._id === selectedCategory.isTrending
                  )?.title.en || "Not Available"}
                </span>
              </div>
            )}

            <div className="flex justify-end">
              <button
                onClick={handleSaveProduct}
                className="px-4 py-2 mr-2 text-white bg-blue-500 rounded hover:bg-blue-700"
              >
                Save Product
              </button>
              <button
                onClick={() => setViewModalOpen(false)}
                className="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-700"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {loading ? (
        <p>Loading categories...</p>
      ) : currentCategories.length > 0 ? (
        <div className="overflow-auto">
          <table className="w-full border">
            <thead>
              <tr>
                <th className="px-4 py-2 border">No</th>
                <th className="px-4 py-2 border">Category Name</th>
                <th className="px-4 py-2 border">Image</th>
                <th className="px-4 py-2 border">Actions</th>
                <th className="px-4 py-2 border">View Products</th>
              </tr>
            </thead>
            <tbody>
              {currentCategories.map((category, index) => (
                <tr key={category._id}>
                  <td className="px-4 py-2 text-center border">
                    {indexOfFirstCategory + index + 1}
                  </td>
                  <td className="px-4 py-2 border">{category.name.en}</td>
                  <td className="px-4 py-2 text-center border">
                    {category.image && (
                      <img
                        src={`${API_URL}/uploads/categories/${category.image}`}
                        alt={category.name.en}
                        className="object-cover w-16 h-16 rounded"
                        loading="eager"
                      />
                    )}
                  </td>
                  <td className="px-4 py-2 text-center border">
                    <button
                      onClick={() => handleEdit(category)}
                      className="mr-2 text-blue-500 hover:text-blue-700"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(category._id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <FaTrashAlt />
                    </button>
                  </td>
                  <td className="px-4 py-2 text-center border">
                    <button
                      onClick={() => handleView(category)}
                      className="text-green-500 hover:text-green-700"
                    >
                      <FaEye />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>No categories available</p>
      )}

      <div className="flex justify-center mt-4">
        <button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 mr-2 text-white bg-gray-500 rounded hover:bg-gray-700"
        >
          <FaArrowLeft />
        </button>
        <button
          onClick={() => paginate(currentPage + 1)}
          disabled={
            currentPage === Math.ceil(categories.length / categoriesPerPage)
          }
          className="px-4 py-2 text-white bg-gray-500 rounded hover:bg-gray-700"
        >
          <FaArrowRight />
        </button>
      </div>
    </div>
  );
};

export default Category;

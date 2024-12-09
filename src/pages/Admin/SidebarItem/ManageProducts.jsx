import { useState, useEffect, useRef } from "react";
import axios from "axios";
import {
  FaEdit,
  FaTrashAlt,
  FaEye,
  FaArrowLeft,
  FaArrowRight,
} from "react-icons/fa";

import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import API_URL from "../../../api";

const ManageProducts = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editProductId, setEditProductId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    titleEn: "",
    titleFr: "",
    descriptionEn: "",
    descriptionFr: "",
    technicalDetailsEn: "",
    technicalDetailsFr: "",
    featuresEn: "",
    featuresFr: "",
    specificationsEn: "",
    specificationsFr: "",
    images: [],
    category: "",
    active: true,
  });

  // useEffect(() => {
  //   console.log(formData.description);
  // }, [formData]);
  const [lang, setLang] = useState("en");
  // useEffect(() => {
  //   console.log("language changed: ", lang);
  //   console.log("Curr form: ", formData);
  // }, [lang]);
  const editorRefEn = useRef();
  const editorRefFr = useRef();
  const handleLangToggle = (language) => {
    setLang(language);
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [viewProduct, setViewProduct] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [imagesToRemove, setImagesToRemove] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [imageError, setImageError] = useState("");

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const maxSize = 2 * 1024 * 1024; // 2MB limit
    let validFiles = [];
    let error = "";

    files.forEach((file) => {
      if (file.size > maxSize) {
        error = "Image size limit is 2MB only.";
      } else {
        validFiles.push(file);
      }
    });

    if (error) {
      setImageError(error);
    } else {
      setImageError("");
      setFormData((prev) => ({
        ...prev,
        images: [...prev.images, ...validFiles],
      }));
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/products`);
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/categories`);
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  // const handleImageChange = (e) => {
  //   const files = Array.from(e.target.files);

  //   setFormData((prev) => ({
  //     ...prev,
  //     images: [...prev.images, ...files],
  //   }));
  // };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleEditorChange = (field, editor) => {
    const value = editor.getData() || "";

    setFormData((prevData) => ({
      ...prevData,

      [`${field}${lang === "en" ? "En" : "Fr"}`]: value,
    }));
  };

  useEffect(() => {
    if (lang === "en" && editorRefEn.current) {
      editorRefEn.current.setData(formData[`descriptionEn`] || "");
      editorRefEn.current.setData(formData[`technicalDetailsEn`] || "");
      editorRefEn.current.setData(formData[`featuresEn`] || "");
      editorRefEn.current.setData(formData[`specificationsEn`] || "");
    }
    if (lang === "fr" && editorRefFr.current) {
      editorRefFr.current.setData(formData[`descriptionFr`] || "");
      editorRefFr.current.setData(formData[`technicalDetailsFr`] || "");
      editorRefFr.current.setData(formData[`featuresFr`] || "");
      editorRefFr.current.setData(formData[`specificationsFr`] || "");
    }
  }, [lang, formData]);

  const handleAddProduct = async (e) => {
    e.preventDefault();
    if (
      !formData.titleEn ||
      !formData.titleFr ||
      !formData.category ||
      formData.category === ""
    ) {
      alert("Please fill in all required fields.");
      return;
    }

    console.log("FormData:", formData);

    const data = new FormData();

    Object.keys(formData).forEach((key) => {
      if (key === "images") {
        formData.images.forEach((image) => {
          data.append("images", image);
        });
      } else {
        data.append(key, formData[key]);
      }
    });

    console.log("Form Data:", data);

    imagesToRemove.forEach((image) => {
      data.append("imagesToRemove", image);
    });

    try {
      if (isEditing) {
        await axios.put(`${API_URL}/api/products/${editProductId}`, data, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        setIsEditing(false);
        setEditProductId(null);
      } else {
        await axios.post(`${API_URL}/api/products`, data, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      }
      resetForm();
      fetchProducts();
      alert(
        isEditing
          ? "Product updated successfully"
          : "Product added successfully"
      );
    } catch (error) {
      console.error("Error adding/updating product:", error.response.data);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );
    if (confirmDelete) {
      try {
        await axios.delete(`${API_URL}/api/products/${id}`);
        setProducts(products.filter((product) => product._id !== id));
        alert("Product deleted successfully.");
      } catch (error) {
        console.error("Error deleting product:", error);
      }
    }
  };

  const handleEdit = (product) => {
    setFormData({
      titleEn: product.title?.en || "",
      titleFr: product.title?.fr || "",
      descriptionEn: product.description?.en || "",
      descriptionFr: product.description?.fr || "",
      technicalDetailsEn: product.technicalDetails?.en || "",
      technicalDetailsFr: product.technicalDetails?.fr || "",
      featuresEn: product.features?.en || "",
      featuresFr: product.features?.fr || "",
      specificationsEn: product.specifications?.en || "",
      specificationsFr: product.specifications?.fr || "",
      images: product.images || [],
      category: product.category?._id || "",
      active: product.active || false,
    });
    setImagesToRemove([]);
    setIsEditing(true);
    setEditProductId(product._id);
    setIsModalOpen(true);
  };

  const handleRemoveImage = (imagePath) => {
    setImagesToRemove((prev) => [...prev, imagePath]);
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((img) => img !== imagePath),
    }));
  };

  const handleView = (product) => {
    setViewProduct(product);
    setIsViewModalOpen(true);
  };

  const handleToggleActive = async (id, currentStatus) => {
    setLoading(true);
    const confirmToggle = window.confirm(
      `Are you sure you want to mark this product as ${
        currentStatus ? "inactive" : "active"
      }?`
    );

    if (confirmToggle) {
      try {
        const response = await axios.put(
          `${API_URL}/api/products/${id}/product-active-status`,
          {
            active: !currentStatus,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );

        if (response.status === 200) {
          fetchProducts();
          alert(`Product marked as ${currentStatus ? "inactive" : "active"}`);
        } else {
          console.error("Unexpected response status:", response.status);
          alert("Failed to toggle the product status. Please try again.");
        }
      } catch (error) {
        console.error("Error updating product status:", error);
        alert("An error occurred. Please try again.");
      } finally {
        setLoading(false);
      }
    }
  };

  const resetForm = () => {
    setFormData({
      title: { en: "", fr: "" },
      description: { en: "", fr: "" },
      // price: "",
      technicalDetails: { en: "", fr: "" },
      features: { en: "", fr: "" },
      specifications: { en: "", fr: "" },
      images: [],
      category: "",
      active: true,
    });
    setImagesToRemove([]);
    setIsModalOpen(false);
    setIsEditing(false);
  };

  const handleOutsideClick = (e) => {
    if (e.target.classList.contains("modal-overlay")) {
      resetForm();
    }
  };

  const indexOfLastProduct = currentPage * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;

  const filteredProducts = selectedCategory
    ? products.filter((product) => product.category?._id === selectedCategory)
    : products;

  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  return (
    <div className="container p-4 mx-auto">
      <h1 className="mb-4 text-2xl font-bold text-center sm:text-left">
        Manage Products
      </h1>

      <button
        onClick={() => {
          // resetForm();
          setIsEditing(false);
          setIsModalOpen(true);
        }}
        className="px-4 py-2 mb-4 text-white transition duration-200 ease-in-out bg-blue-500 rounded hover:bg-blue-700"
      >
        Add Product
      </button>

      <select
        name="categoryFilter"
        className="block w-48 p-2 px-6 mb-4 border rounded-lg shadow-md"
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
      >
        <option value="">All Categories</option>
        {categories.map((category) => (
          <option key={category._id} value={category._id}>
            {category?.name?.en}
          </option>
        ))}
      </select>

      {isModalOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 modal-overlay"
          onClick={handleOutsideClick}
        >
          <div className="w-full max-w-2xl p-6 bg-white rounded shadow-lg overflow-auto max-h-[80vh]">
            <h2 className="mb-4 text-xl font-bold">
              {isEditing ? "Edit Product" : "Add Product"}
            </h2>
            {/* Language Toggle */}
            <div className="flex justify-center mb-4">
              <button
                onClick={() => handleLangToggle("en")}
                aria-pressed={lang === "en"}
                className={`mr-2 px-4 py-2 rounded-full font-medium transition-colors duration-300
      ${lang === "en" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-800"}
      hover:bg-blue-500 hover:text-white focus:outline-none`}
              >
                English
              </button>
              <button
                onClick={() => handleLangToggle("fr")}
                aria-pressed={lang === "fr"}
                className={`px-4 py-2 rounded-full font-medium transition-colors duration-300
      ${lang === "fr" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-800"}
      hover:bg-blue-500 hover:text-white focus:outline-none`}
              >
                French
              </button>
            </div>

            <form onSubmit={handleAddProduct}>
              <input
                className="block w-full p-2 mb-4 border shadow-md"
                type="text"
                name={`title${lang === "en" ? "En" : "Fr"}`}
                placeholder={`Title (${lang === "en" ? "EN" : "FR"})`}
                value={formData[`title${lang === "en" ? "En" : "Fr"}`]}
                onChange={handleInputChange}
                required
              />
              {/* //description */}
              <div className="mb-4">
                <label className="block mb-2 text-lg font-medium">
                  Description ({lang === "en" ? "English" : "French"})
                </label>

                {/* English  */}
                {lang === "en" && (
                  <CKEditor
                    editor={ClassicEditor}
                    data={formData.descriptionEn}
                    onInit={(editor) => {
                      editorRefEn.current = editor;
                    }}
                    onChange={(event, editor) =>
                      handleEditorChange("description", editor)
                    }
                  />
                )}

                {/* French  */}
                {lang === "fr" && (
                  <CKEditor
                    editor={ClassicEditor}
                    data={formData.descriptionFr}
                    onInit={(editor) => {
                      editorRefFr.current = editor;
                    }}
                    onChange={(event, editor) =>
                      handleEditorChange("description", editor)
                    }
                  />
                )}
              </div>

              {/* Features Input */}
              <div className="mb-4">
                <label className="block mb-2 text-lg font-medium">
                  Features ({lang === "en" ? "English" : "French"})
                </label>

                {/* English  */}
                {lang === "en" && (
                  <CKEditor
                    editor={ClassicEditor}
                    data={formData.featuresEn}
                    onInit={(editor) => {
                      editorRefEn.current = editor;
                    }}
                    onChange={(event, editor) =>
                      handleEditorChange("features", editor)
                    }
                  />
                )}

                {/* French  */}
                {lang === "fr" && (
                  <CKEditor
                    editor={ClassicEditor}
                    data={formData.featuresFr}
                    onInit={(editor) => {
                      editorRefFr.current = editor;
                    }}
                    onChange={(event, editor) =>
                      handleEditorChange("features", editor)
                    }
                  />
                )}
              </div>
              {/* Specifications Input */}
              <div className="mb-4">
                <label className="block mb-2 text-lg font-medium">
                  Specifications ({lang === "en" ? "English" : "French"})
                </label>

                {/* English */}
                {lang === "en" && (
                  <CKEditor
                    editor={ClassicEditor}
                    data={formData.specificationsEn}
                    onInit={(editor) => {
                      editorRefEn.current = editor;
                    }}
                    onChange={(event, editor) =>
                      handleEditorChange("specifications", editor)
                    }
                  />
                )}

                {/* French */}
                {lang === "fr" && (
                  <CKEditor
                    editor={ClassicEditor}
                    data={formData.specificationsFr}
                    onInit={(editor) => {
                      editorRefFr.current = editor;
                    }}
                    onChange={(event, editor) =>
                      handleEditorChange("specifications", editor)
                    }
                  />
                )}
              </div>
              {/* Technical Details Input */}
              <div className="mb-4">
                <label className="block mb-2 text-lg font-medium">
                  Technical Details ({lang === "en" ? "English" : "French"})
                </label>

                {/* English  */}
                {lang === "en" && (
                  <CKEditor
                    editor={ClassicEditor}
                    data={formData.technicalDetailsEn}
                    onInit={(editor) => {
                      editorRefEn.current = editor;
                    }}
                    onChange={(event, editor) =>
                      handleEditorChange("technicalDetails", editor)
                    }
                  />
                )}

                {/* French */}
                {lang === "fr" && (
                  <CKEditor
                    editor={ClassicEditor}
                    data={formData.technicalDetailsFr}
                    onInit={(editor) => {
                      editorRefFr.current = editor;
                    }}
                    onChange={(event, editor) =>
                      handleEditorChange("technicalDetails", editor)
                    }
                  />
                )}
              </div>

              <select
                name="category"
                className="block w-full p-2 mb-4 border rounded-lg shadow-md"
                value={formData.category}
                onChange={handleInputChange}
                required
              >
                <option value="">Select Category</option>
                {categories.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category?.name?.en}
                  </option>
                ))}
              </select>
              <input
                type="file"
                multiple
                className="block w-full p-2 mb-4 border rounded-lg shadow-md"
                onChange={handleImageChange}
              />
              {imageError && (
                <span className="text-sm text-red-500">{imageError}</span>
              )}
              <div className="mb-4">
                <h3 className="mb-2 text-lg font-medium">Current Images:</h3>
                <div className="flex flex-wrap">
                  {formData.images.map((image, index) => (
                    <div key={index} className="relative mb-2 mr-2">
                      <img
                        src={
                          typeof image === "string"
                            ? `${API_URL}${image}`
                            : URL.createObjectURL(image)
                        }
                        alt={`img-${index}`}
                        className="object-cover w-20 h-20 rounded"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveImage(image)}
                        className="absolute top-0 right-0 text-red-500 bg-white rounded-full hover:bg-gray-200"
                      >
                        &times;
                      </button>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex justify-end">
                {" "}
                <button
                  type="submit"
                  className="px-4 py-2 ml-4 text-white bg-blue-500 rounded hover:bg-blue-700"
                >
                  {isEditing ? "Update Product" : "Add Product"}
                </button>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 ml-4 text-white bg-red-500 rounded hover:bg-red-700"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <table className="min-w-full bg-white border border-gray-300">
        <thead className="text-sm leading-normal text-gray-600 uppercase bg-gray-200">
          <tr>
            <th className="px-6 py-3 text-left">S/N</th>
            <th className="px-4 py-2 text-left">Title</th>
            {/* <th className="px-4 py-2 text-left">Price</th> */}
            <th className="px-4 py-2 text-left">Category</th>
            <th className="px-4 py-2 text-left">Image</th>
            <th className="px-4 py-2 text-left">Status</th>
            <th className="px-4 py-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody className="text-sm font-normal text-black">
          {currentProducts.map((product, index) => (
            <tr
              key={product._id}
              className="border-b border-gray-300 hover:bg-gray-100"
            >
              <td className="px-4 py-2 border">
                {(currentPage - 1) * itemsPerPage + index + 1}
              </td>
              <td className="px-4 py-2 border">{product.title.en}</td>
              {/* <td className="px-4 py-2 border">${product.price}</td> */}
              <td className="px-4 py-2 border">
                {product?.category?.name?.en || "Uncategorized"}
              </td>

              <td className="px-4 py-2 border">
                {product.images.length > 0 && (
                  <img
                    src={`${API_URL}${product.images[0]}`}
                    alt={product.title.en}
                    className="object-cover w-20 h-20"
                    loading="eager"
                  />
                )}
              </td>
              <td className="p-2 text-center border">
                <button
                  className={`px-2 py-1 text-white rounded ${
                    product.active ? "bg-green-500" : "bg-red-500"
                  } ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
                  onClick={() =>
                    !loading && handleToggleActive(product._id, product.active)
                  }
                  disabled={loading}
                >
                  {loading ? (
                    <span
                      className="spinner-border spinner-border-sm"
                      role="status"
                      aria-hidden="true"
                    ></span>
                  ) : product.active ? (
                    "Active"
                  ) : (
                    "Inactive"
                  )}
                </button>
              </td>

              <td className="flex justify-around px-4 py-8 border">
                <button
                  onClick={() => handleView(product)}
                  className="p-2 text-blue-600 transition duration-200 ease-in-out hover:text-blue-800"
                >
                  <FaEye />
                </button>
                <button
                  onClick={() => handleEdit(product)}
                  className="p-2 text-green-600 transition duration-200 ease-in-out hover:text-green-800"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => handleDelete(product._id)}
                  className="p-2 text-red-600 transition duration-200 ease-in-out hover:text-red-800"
                >
                  <FaTrashAlt />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-between w-full mt-4">
        <button
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 text-white transition duration-200 ease-in-out bg-blue-500 rounded hover:bg-blue-700"
        >
          <FaArrowLeft />
        </button>
        <span className="mx-4">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 text-white transition duration-200 ease-in-out bg-blue-500 rounded hover:bg-blue-700"
        >
          <FaArrowRight />
        </button>
      </div>

      {isViewModalOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 modal-overlay"
          onClick={() => setIsViewModalOpen(false)}
        >
          <div className="w-full max-w-4xl p-6 bg-white rounded shadow-lg overflow-auto max-h-[80vh]">
            <h2 className="mb-4 text-xl font-bold">{viewProduct?.title.en}</h2>
            {/* <p className="mb-4">
              <strong>Price:</strong> ${viewProduct?.price}
            </p> */}
            <p className="mb-4">
              <strong>Category:</strong>{" "}
              {viewProduct?.category?.name.en || "Uncategorized"}
            </p>
            <div className="mb-4">
              <strong>Description:</strong>
              <div
                dangerouslySetInnerHTML={{
                  __html: viewProduct?.description.en,
                }}
              />
            </div>
            <div className="mb-4">
              <strong>Technical Details:</strong>
              <div
                dangerouslySetInnerHTML={{
                  __html: viewProduct?.technicalDetails.en,
                }}
              />
            </div>
            <div className="mb-4">
              <strong>Features:</strong>
              <div
                dangerouslySetInnerHTML={{ __html: viewProduct?.features.en }}
              />
            </div>
            <div className="mb-4">
              <strong>Specifications:</strong>
              <div
                dangerouslySetInnerHTML={{
                  __html: viewProduct?.specifications.en,
                }}
              />
            </div>

            <div className="flex flex-wrap">
              {viewProduct?.images.map((image, idx) => (
                <img
                  key={idx}
                  src={`http://localhost:3001${image}`}
                  alt={viewProduct?.title.en}
                  className="object-cover w-40 h-40 m-2"
                  loading="eager"
                />
              ))}
            </div>

            <button
              onClick={() => setIsViewModalOpen(false)}
              className="px-4 py-2 mt-4 text-white transition duration-200 ease-in-out bg-blue-500 rounded hover:bg-blue-700"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageProducts;

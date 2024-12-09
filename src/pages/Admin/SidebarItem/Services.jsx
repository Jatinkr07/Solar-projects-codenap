/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import axios from "axios";
import {
  FaEye,
  FaEdit,
  FaTrash,
  FaTimes,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import API_URL from "../../../api";

export default function Service() {
  const [services, setServices] = useState([]);
  const [headingEn, setHeadingEn] = useState("");
  const [headingFr, setHeadingFr] = useState("");
  const [descriptionEn, setDescriptionEn] = useState("");
  const [descriptionFr, setDescriptionFr] = useState("");
  const [titleEn, setTitleEn] = useState("");
  const [titleFr, setTitleFr] = useState("");
  const [subDescriptionEn, setSubDescriptionEn] = useState("");
  const [subDescriptionFr, setSubDescriptionFr] = useState("");

  const [banner, setBanner] = useState(null);
  const [mainImg, setMainImg] = useState(null);
  const [existingBanner, setExistingBanner] = useState("");
  const [existingMainImg, setExistingMainImg] = useState("");
  const [removeBanner, setRemoveBanner] = useState(false);
  const [removeMainImg, setRemoveMainImg] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [serviceToEdit, setServiceToEdit] = useState(null);
  const [formVisible, setFormVisible] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const [serviceLang, setServiceLang] = useState("en");
  const handleLanguageToggle = (lang) => {
    setServiceLang(lang);
  };

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/services`);
        setServices(response.data || []);
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };
    fetchServices();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("headingEn", headingEn);
    formData.append("headingFr", headingFr);
    formData.append("titleEn", titleEn);
    formData.append("titleFr", titleFr);
    formData.append("descriptionEn", descriptionEn);
    formData.append("descriptionFr", descriptionFr);
    formData.append("subDescriptionEn", subDescriptionEn);
    formData.append("subDescriptionFr", subDescriptionFr);

    console.log("from: ", formData);

    if (banner) formData.append("banner", banner);
    if (mainImg) formData.append("mainImg", mainImg);
    if (removeBanner) formData.append("removeBanner", removeBanner);
    if (removeMainImg) formData.append("removeMainImg", removeMainImg);

    try {
      let response;
      if (editMode && serviceToEdit) {
        response = await axios.put(
          `${API_URL}/api/services/${serviceToEdit._id}`,
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );

        setServices(
          services.map((service) =>
            service._id === response.data.service._id
              ? response.data.service
              : service
          )
        );
        alert("Service updated successfully!");
      } else {
        response = await axios.post(`${API_URL}/api/services`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        setServices([response.data.service, ...services]);
        alert("Service added successfully!");
      }
    } catch (err) {
      setError("Failed to save service");
      console.error(err);
    } finally {
      setLoading(false);
      resetForm();
      setFormVisible(false);
    }
  };

  const resetForm = () => {
    setHeadingEn("");
    setDescriptionEn("");
    setTitleEn("");
    setSubDescriptionEn("");
    setHeadingFr("");
    setDescriptionFr("");
    setTitleFr("");
    setSubDescriptionFr("");
    setBanner(null);
    setMainImg(null);
    setExistingBanner("");
    setExistingMainImg("");
    setRemoveBanner(false);
    setRemoveMainImg(false);
    setEditMode(false);
    setServiceToEdit(null);
  };

  const handleEdit = (service) => {
    setServiceToEdit(service);
    setEditMode(true);
    setHeadingEn(service.heading.en);
    setHeadingFr(service.heading.fr);
    setDescriptionEn(service.description.en);
    setDescriptionFr(service.description.fr);
    setTitleEn(service.title.en);
    setTitleFr(service.title.fr);
    setSubDescriptionEn(service.subDescription.en);
    setSubDescriptionFr(service.subDescription.fr);
    setExistingBanner(service.banner);
    setExistingMainImg(service.mainImg);
    setFormVisible(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/api/services/${id}`);
      setServices(services.filter((service) => service._id !== id));
      alert("Service deleted successfully!");
    } catch (error) {
      console.error("Error deleting service:", error);
      alert("Failed to delete service.");
    }
  };

  const handleCloseForm = () => {
    resetForm();
    setFormVisible(false);
  };

  const handleBannerRemove = () => {
    setRemoveBanner(true);
    setExistingBanner("");
  };

  const handleMainImgRemove = () => {
    setRemoveMainImg(true);
    setExistingMainImg("");
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = services.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(services.length / itemsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  return (
    <div className="container p-4 mx-auto">
      <h1 className="mb-4 text-2xl font-bold">Services</h1>

      <div className="flex justify-end mb-4">
        <button
          onClick={() => setFormVisible(true)}
          className="px-4 py-2 text-white bg-green-500 rounded-md"
        >
          Add Service
        </button>
      </div>

      {formVisible && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="relative w-full max-w-lg p-8 transition-transform duration-300 transform bg-white rounded-lg shadow-lg hover:shadow-xl">
            <h2 className="mb-4 text-xl">
              {editMode ? "Edit Service" : "Add New Service"}
            </h2>

            {error && <div className="mb-2 text-red-500">{error}</div>}

            <button
              className="absolute text-red-500 top-3 right-3 hover:text-red-700"
              // onClick={() => setFormVisible(false)}
              onClick={handleCloseForm}
            >
              <FaTimes />
            </button>

            <form
              onSubmit={handleSubmit}
              className="overflow-y-scroll space-y-4 h-[500px]"
            >
              {/* Language Toggle */}
              <div className="flex justify-between mb-4">
                <div>
                  <button
                    type="button"
                    onClick={() => handleLanguageToggle("en")}
                    className={`px-4 py-2 rounded-md ${
                      setServiceLang === "en"
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200 text-gray-700"
                    }`}
                  >
                    English
                  </button>
                  <button
                    type="button"
                    onClick={() => handleLanguageToggle("fr")}
                    className={`ml-2 px-4 py-2 rounded-md ${
                      setServiceLang === "fr"
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200 text-gray-700"
                    }`}
                  >
                    French
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {/* English Form Inputs */}
                {serviceLang === "en" && (
                  <div>
                    <div>
                      <label className="block">Heading (EN):</label>
                      <input
                        type="text"
                        value={headingEn}
                        onChange={(e) => setHeadingEn(e.target.value)}
                        className="block w-full p-2 mt-1 border rounded"
                      />
                    </div>
                    <div>
                      <label className="block">Title (EN):</label>
                      <input
                        type="text"
                        value={titleEn}
                        onChange={(e) => setTitleEn(e.target.value)}
                        className="block w-full p-2 mt-1 border rounded"
                      />
                    </div>
                    <div>
                      <label className="block">Description (EN):</label>
                      <textarea
                        value={descriptionEn}
                        onChange={(e) => setDescriptionEn(e.target.value)}
                        className="block w-full p-2 mt-1 border rounded"
                      />
                    </div>
                    <div>
                      <label className="block">Sub Description (EN):</label>
                      <textarea
                        value={subDescriptionEn}
                        onChange={(e) => setSubDescriptionEn(e.target.value)}
                        className="block w-full p-2 mt-1 border rounded"
                      />
                    </div>
                  </div>
                )}

                {/* French Form Inputs */}
                {serviceLang === "fr" && (
                  <div>
                    <div>
                      <label className="block">Heading (FR):</label>
                      <input
                        type="text"
                        value={headingFr}
                        onChange={(e) => setHeadingFr(e.target.value)}
                        className="block w-full p-2 mt-1 border rounded"
                      />
                    </div>
                    <div>
                      <label className="block">Title (FR):</label>
                      <input
                        type="text"
                        value={titleFr}
                        onChange={(e) => setTitleFr(e.target.value)}
                        className="block w-full p-2 mt-1 border rounded"
                      />
                    </div>
                    <div>
                      <label className="block">Description (FR):</label>
                      <textarea
                        value={descriptionFr}
                        onChange={(e) => setDescriptionFr(e.target.value)}
                        className="block w-full p-2 mt-1 border rounded"
                      />
                    </div>
                    <div>
                      <label className="block">Sub Description (FR):</label>
                      <textarea
                        value={subDescriptionFr}
                        onChange={(e) => setSubDescriptionFr(e.target.value)}
                        className="block w-full p-2 mt-1 border rounded"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* File Uploads */}
              <div>
                <label
                  htmlFor="banner"
                  className="block text-sm font-medium text-gray-700"
                >
                  Banner Image:
                </label>
                <input
                  type="file"
                  id="banner"
                  className="block w-full p-2 mt-1 border border-gray-300 rounded-md"
                  onChange={(e) => setBanner(e.target.files[0])}
                />
                {existingBanner && (
                  <div className="relative mt-2">
                    <img
                      src={`${API_URL}${existingBanner}`}
                      alt="Banner"
                      className="object-cover w-24 h-24 mb-2"
                    />
                    <button
                      type="button"
                      className="absolute p-1 text-red-500 bg-white rounded-full top-1 left-16 hover:bg-gray-100"
                      onClick={handleBannerRemove}
                    >
                      <FaTrash />
                    </button>
                  </div>
                )}
              </div>

              <div>
                <label
                  htmlFor="mainImg"
                  className="block text-sm font-medium text-gray-700"
                >
                  Main Image:
                </label>
                <input
                  type="file"
                  id="mainImg"
                  className="block w-full p-2 mt-1 border border-gray-300 rounded-md"
                  onChange={(e) => setMainImg(e.target.files[0])}
                />
                {existingMainImg && (
                  <div className="relative mt-2">
                    <img
                      src={`${API_URL}${existingMainImg}`}
                      alt="Main"
                      className="object-cover w-24 h-24 mb-2"
                    />
                    <button
                      type="button"
                      className="absolute p-1 text-red-500 bg-white rounded-full top-1 left-16 hover:bg-gray-100"
                      onClick={handleMainImgRemove}
                    >
                      <FaTrash />
                    </button>
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <div className="flex justify-end">
                <button
                  type="submit"
                  className={`px-4 py-2 text-white bg-blue-500 rounded-md ${
                    loading ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  disabled={loading}
                >
                  {loading ? "Saving..." : "Save"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="overflow-x-auto bg-white border border-gray-300 rounded-lg shadow-sm">
        <table className="min-w-full">
          <thead>
            <tr>
              <th className="p-4 text-xs font-medium text-left text-gray-500 uppercase">
                S.No
              </th>
              <th className="p-4 text-xs font-medium text-left text-gray-500 uppercase">
                Heading
              </th>
              <th className="p-4 text-xs font-medium text-left text-gray-500 uppercase">
                Image
              </th>
              <th className="p-4 text-xs font-medium text-left text-gray-500 uppercase">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((service, index) => (
              <tr key={service._id} className="odd:bg-white even:bg-gray-50">
                <td className="p-4 text-sm text-gray-500">
                  {index + indexOfFirstItem + 1}
                </td>
                <td className="p-4 text-sm text-gray-500">
                  {service.heading.en}
                </td>
                <td className="p-4 text-sm">
                  {service.mainImg && (
                    <img
                      src={`${API_URL}${service.mainImg}`}
                      alt={service.heading}
                      className="object-cover w-12 h-12"
                    />
                  )}
                </td>
                <td className="p-4">
                  <button
                    onClick={() => handleEdit(service)}
                    className="p-2 text-green-500 hover:text-green-700"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(service._id)}
                    className="p-2 text-red-500 hover:text-red-700"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between mt-4">
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className={`px-4 py-2 text-white ${
            currentPage === 1
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600"
          } rounded-md flex items-center`}
        >
          <FaChevronLeft className="mr-2" />
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 text-white ${
            currentPage === totalPages
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600"
          } rounded-md flex items-center`}
        >
          Next
          <FaChevronRight className="ml-2" />
        </button>
      </div>
    </div>
  );
}

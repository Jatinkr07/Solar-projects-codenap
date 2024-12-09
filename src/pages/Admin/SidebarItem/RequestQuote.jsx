/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import axios from "axios";
import { HiChevronLeft, HiChevronRight, HiRefresh } from "react-icons/hi";
import { FaTrash } from "react-icons/fa";
import API_URL from "../../../api";

const RequestQuote = () => {
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const fetchQuotes = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.get(`${API_URL}/api/quotes`);
      setQuotes(response.data.quotes);
    } catch (err) {
      setError("Failed to load quotes");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuotes();
  }, []);

  const paginateQuotes = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return quotes.slice(startIndex, endIndex);
  };

  const totalPages = Math.ceil(quotes.length / itemsPerPage);

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/api/quotes/${id}`);
      setQuotes((prevQuotes) => prevQuotes.filter((quote) => quote._id !== id));
    } catch (err) {
      setError("Failed to delete quote");
    }
  };

  const handleRefresh = () => {
    fetchQuotes();
  };

  return (
    <div className="container p-4 mx-auto">
      <div className="flex items-center justify-between mb-4">
        <h2 className="flex items-center text-3xl font-bold">Quote Requests</h2>
        <button
          onClick={handleRefresh}
          className="flex items-center justify-center w-8 h-8 text-white bg-gray-600 rounded-full hover:bg-gray-700"
        >
          <HiRefresh className="w-5 h-5" />
        </button>
      </div>

      {loading && <p className="text-center">Loading...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md table-auto">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-3 text-sm font-semibold text-left text-gray-600">
                Product Name
              </th>
              <th className="p-3 text-sm font-semibold text-left text-gray-600">
                Name
              </th>
              <th className="p-3 text-sm font-semibold text-left text-gray-600">
                Email
              </th>
              <th className="p-3 text-sm font-semibold text-left text-gray-600">
                Quantity
              </th>
              <th className="p-3 text-sm font-semibold text-left text-gray-600">
                Requirements
              </th>
              <th className="p-3 text-sm font-semibold text-left text-gray-600">
                Date
              </th>
              <th className="p-3 text-sm font-semibold text-center text-gray-600">
                Delete
              </th>
            </tr>
          </thead>
          <tbody>
            {quotes.length > 0 ? (
              paginateQuotes().map((quote) => (
                <tr key={quote._id} className="border-t border-gray-200">
                  <td className="max-w-xs p-3 text-sm text-gray-700 truncate">
                    {quote.productId?.title.en}
                  </td>
                  <td className="max-w-xs p-3 text-sm text-gray-700 truncate">
                    {quote.name.en}
                  </td>
                  <td className="max-w-xs p-3 text-sm text-gray-700 truncate">
                    {quote.email.en}
                  </td>
                  <td className="p-3 text-sm text-gray-700">
                    {quote.quantity.en}
                  </td>
                  <td className="max-w-xs p-3 text-sm text-gray-700 truncate">
                    {quote.requirements.en}
                  </td>
                  <td className="p-3 text-sm text-gray-700">
                    {new Date(quote.createdAt).toLocaleDateString()}
                  </td>
                  <td className="p-3 text-sm text-center">
                    <button
                      onClick={() => handleDelete(quote._id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="p-4 text-center text-gray-500">
                  No quotes available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between mt-4">
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          className="flex items-center px-4 py-2 space-x-2 text-white transition duration-200 bg-blue-600 rounded-md hover:bg-blue-700 disabled:opacity-50"
        >
          <HiChevronLeft />
          <span>Previous</span>
        </button>

        <span className="text-gray-700">
          Page {currentPage} of {totalPages}
        </span>

        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className="flex items-center px-4 py-2 space-x-2 text-white transition duration-200 bg-blue-600 rounded-md hover:bg-blue-700 disabled:opacity-50"
        >
          <span>Next</span>
          <HiChevronRight />
        </button>
      </div>
    </div>
  );
};

export default RequestQuote;

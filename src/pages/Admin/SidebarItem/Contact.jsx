/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import Axios from "axios";
import { FaEye, FaTrash, FaSync } from "react-icons/fa";
import API_URL from "../../../api";

export default function Contact() {
  const [contacts, setContacts] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await Axios.get(`${API_URL}/api/submit-form`);
        setContacts(response.data);
        setTotalPages(Math.ceil(response.data.length / itemsPerPage));
      } catch (error) {
        console.error("Error fetching contacts:", error);
      }
    };

    fetchContacts();
  }, []);

  const handleViewContact = (contact) => {
    setSelectedContact(contact);
    setIsViewModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsViewModalOpen(false);
    setSelectedContact(null);
  };

  const handleDeleteContact = async (contactId) => {
    try {
      await Axios.delete(`${API_URL}/api/submit-form/${contactId}`);
      setContacts(contacts.filter((contact) => contact._id !== contactId));
    } catch (error) {
      console.error("Error deleting contact:", error);
    }
  };

  const handleRefresh = async () => {
    const response = await Axios.get(`${API_URL}/api/submit-form`);
    setContacts(response.data);
    setTotalPages(Math.ceil(response.data.length / itemsPerPage));
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = contacts.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="container px-4 py-8 mx-auto">
      <h2 className="mb-4 text-2xl font-bold text-center">
        Client Contact Submissions
      </h2>
      <div className="flex justify-end mb-4">
        <button
          onClick={handleRefresh}
          className="flex items-center w-10 h-10 text-white bg-gray-600 rounded-full hover:bg-gray-700"
        >
          <FaSync className="w-5 h-5 ml-2.5" />
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-sm font-medium text-left text-gray-700">
                First Name
              </th>
              <th className="px-4 py-2 text-sm font-medium text-left text-gray-700">
                Last Name
              </th>
              <th className="px-4 py-2 text-sm font-medium text-left text-gray-700">
                Email
              </th>
              <th className="px-4 py-2 text-sm font-medium text-left text-gray-700">
                Phone
              </th>
              <th className="px-4 py-2 text-sm font-medium text-left text-gray-700">
                Message
              </th>
              <th className="px-4 py-2 text-sm font-medium text-left text-gray-700">
                Reason
              </th>
              <th className="px-4 py-2 text-sm font-medium text-left text-gray-700">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((contact) => (
              <tr key={contact._id} className="border-t hover:bg-gray-50">
                <td className="px-4 py-2 text-sm text-gray-700">
                  {contact.firstName}
                </td>
                <td className="px-4 py-2 text-sm text-gray-700">
                  {contact.lastName}
                </td>
                <td className="px-4 py-2 text-sm text-gray-700">
                  {contact.email}
                </td>
                <td className="px-4 py-2 text-sm text-gray-700">
                  {contact.phone}
                </td>
                <td className="max-w-xs px-4 py-2 text-sm text-gray-700 truncate">
                  {contact.message}
                </td>
                <td className="px-4 py-2 text-sm text-gray-700">
                  {contact.reason.join(", ")}
                </td>
                <td className="flex px-4 py-2 space-x-2">
                  <button
                    className="text-blue-600 transition-colors hover:text-blue-800"
                    onClick={() => handleViewContact(contact)}
                    aria-label="View Contact"
                  >
                    <FaEye />
                  </button>
                  <button
                    className="text-red-600 transition-colors hover:text-red-800"
                    onClick={() => handleDeleteContact(contact._id)}
                    aria-label="Delete Contact"
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
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className={`px-4 py-2 text-white ${
            currentPage === 1
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600"
          } rounded-md`}
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
          className={`px-4 py-2 text-white ${
            currentPage === totalPages
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600"
          } rounded-md`}
        >
          Next
        </button>
      </div>

      {isViewModalOpen && selectedContact && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-full max-w-md p-8 transition-transform duration-200 transform bg-white rounded-lg shadow-lg">
            <h2 className="mb-4 text-xl font-bold text-center">
              Contact Details
            </h2>
            <p className="mb-2">
              <strong>First Name:</strong> {selectedContact.firstName}
            </p>
            <p className="mb-2">
              <strong>Last Name:</strong> {selectedContact.lastName}
            </p>
            <p className="mb-2">
              <strong>Email:</strong> {selectedContact.email}
            </p>
            <p className="mb-2">
              <strong>Phone:</strong> {selectedContact.phone}
            </p>
            <p className="mb-2">
              <strong>Message:</strong> {selectedContact.message}
            </p>
            <p className="mb-4">
              <strong>Reason:</strong> {selectedContact.reason.join(", ")}
            </p>
            <div className="text-center">
              <button
                className="px-4 py-2 text-white transition-colors bg-indigo-600 rounded hover:bg-indigo-700"
                onClick={handleCloseModal}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* eslint-disable react/prop-types */
import { useState } from "react";
import axios from "axios";
import API_URL from "../api";

const RequestQuotePage = ({ productId, onClose }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [requirements, setRequirements] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await axios.post(`${API_URL}/api/quotes`, {
        productId,
        name,
        email,
        quantity,
        requirements,
      });
      console.log("Response :", response.data);
      alert("Quote request submitted successfully!");
      onClose();
    } catch (error) {
      console.error("Error submitting request:", error);
      setError("Failed to send quote request. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 min-w-lg">
      <h2 className="mb-4 text-2xl font-bold">Request a Quote</h2>
      {error && <p className="mb-4 text-red-500">{error}</p>}

      <div className="mb-4">
        <label className="block mb-2">Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block mb-2">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block mb-2">Quantity</label>
        <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block mb-2">Special Requirements</label>
        <textarea
          value={requirements}
          onChange={(e) => setRequirements(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
          placeholder="Add any special requirements for the quote."
        />
      </div>

      <div className="flex justify-end gap-4">
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 text-white bg-blue-600 rounded"
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
      </div>
    </form>
  );
};

export default RequestQuotePage;

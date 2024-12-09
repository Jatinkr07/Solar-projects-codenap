import { useEffect, useState } from "react";
import axios from "axios";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from "chart.js";
import { FaUser, FaBox, FaTag } from "react-icons/fa";
import API_URL from "../../../api";

ChartJS.register(Title, Tooltip, Legend, ArcElement);

const AdminDashboard = () => {
  const [contactStats, setContactStats] = useState({ totalContacts: 0 });
  const [productStats, setProductStats] = useState({ totalProducts: 0 });
  const [categoryStats, setCategoryStats] = useState({ totalCategory: 0 });

  const fetchStats = async () => {
    try {
      const contactResponse = await axios.get(
        `${API_URL}/api/submit-form/contact-stats`
      );
      const productResponse = await axios.get(
        `${API_URL}/api/products/product/count`
      );
      const categoryResponse = await axios.get(
        `${API_URL}/api/categories/count`
      );
      setContactStats(contactResponse.data);
      setProductStats(productResponse.data);
      setCategoryStats(categoryResponse.data);
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
  };

  useEffect(() => {
    fetchStats();

    const interval = setInterval(() => {
      fetchStats();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const contactChartData = {
    labels: ["Contact Submissions", "Remaining"],
    datasets: [
      {
        data: [contactStats.totalContacts, 100 - contactStats.totalContacts],
        backgroundColor: ["#36A2EB", "#FFCE56"],
        hoverBackgroundColor: ["#36A2EB", "#FFCE56"],
      },
    ],
  };

  const productChartData = {
    labels: ["Products", "Remaining"],
    datasets: [
      {
        data: [productStats.totalProducts, 100 - productStats.totalProducts],
        backgroundColor: ["#FF6384", "#36A2EB"],
        hoverBackgroundColor: ["#FF6384", "#36A2EB"],
      },
    ],
  };

  const categoryChartData = {
    labels: ["Categories", "Remaining"],
    datasets: [
      {
        data: [categoryStats.totalCategory, 100 - categoryStats.totalCategory],
        backgroundColor: ["#FF9F40", "#FFCE56"],
        hoverBackgroundColor: ["#FF9F40", "#FFCE56"],
      },
    ],
  };

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <h2 className="mb-6 text-3xl font-semibold text-center text-gray-800">
        Admin Dashboard
      </h2>

      <div className="grid grid-cols-1 gap-6 mb-6 sm:grid-cols-2 lg:grid-cols-3">
        <div className="flex items-center justify-between p-6 transition-transform transform bg-white rounded-lg shadow-lg hover:scale-105">
          <div className="flex items-center">
            <FaUser className="mr-4 text-4xl text-blue-500" />
            <div>
              <h3 className="text-lg font-semibold text-gray-700">
                Contact Submissions
              </h3>
              <p className="text-2xl font-bold text-gray-900">
                {contactStats.totalContacts}
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between p-6 transition-transform transform bg-white rounded-lg shadow-lg hover:scale-105">
          <div className="flex items-center">
            <FaBox className="mr-4 text-4xl text-red-500" />
            <div>
              <h3 className="text-lg font-semibold text-gray-700">
                Total Products
              </h3>
              <p className="text-2xl font-bold text-gray-900">
                {productStats.totalProducts}
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between p-6 transition-transform transform bg-white rounded-lg shadow-lg hover:scale-105">
          <div className="flex items-center">
            <FaTag className="mr-4 text-4xl text-yellow-500" />
            <div>
              <h3 className="text-lg font-semibold text-gray-700">
                Total Categories
              </h3>
              <p className="text-2xl font-bold text-gray-900">
                {categoryStats.totalCategory}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="p-6 bg-white rounded-lg shadow-lg">
          <h3 className="mb-4 text-xl font-medium text-center text-gray-700">
            Contact Form Submissions
          </h3>
          <div className="flex justify-center">
            <Pie data={contactChartData} options={{ responsive: true }} />
          </div>
        </div>

        <div className="p-6 bg-white rounded-lg shadow-lg">
          <h3 className="mb-4 text-xl font-medium text-center text-gray-700">
            Product Count
          </h3>
          <div className="flex justify-center">
            <Pie data={productChartData} options={{ responsive: true }} />
          </div>
        </div>

        <div className="p-6 bg-white rounded-lg shadow-lg">
          <h3 className="mb-4 text-xl font-medium text-center text-gray-700">
            Category Count
          </h3>
          <div className="flex justify-center">
            <Pie data={categoryChartData} options={{ responsive: true }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

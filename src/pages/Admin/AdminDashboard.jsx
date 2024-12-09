import { useState } from "react";
import { Link } from "react-router-dom";
import {
  AiOutlineBarChart,
  AiOutlineShopping,
  AiOutlineInbox,
  AiOutlineAppstore,
  AiOutlineQuestionCircle,
  AiOutlineMessage,
  AiOutlineLogout,
} from "react-icons/ai";

import Dashboard from "./SidebarItem/Dashboard";
import Products from "./SidebarItem/ManageProducts";
import Category from "./SidebarItem/Category";
import Services from "./SidebarItem/Services";
import RequestQuote from "./SidebarItem/RequestQuote";
import Contact from "./SidebarItem/Contact";
import Logout from "./SidebarItem/AdminLogout";

export default function AdminDashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeSection, setActiveSection] = useState("Dashboard");
  const [hoveredItem, setHoveredItem] = useState(null);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const sidebarItems = [
    { icon: AiOutlineBarChart, label: "Dashboard", section: "Dashboard" },
    { icon: AiOutlineInbox, label: "Category", section: "Category" },
    { icon: AiOutlineShopping, label: "Products", section: "Products" },
    { icon: AiOutlineAppstore, label: "Services", section: "Services" },
    {
      icon: AiOutlineQuestionCircle,
      label: "Quote Details",
      section: "Quote Details",
    },
    { icon: AiOutlineMessage, label: "Contact", section: "Contact" },
    { icon: AiOutlineLogout, label: "Logout", section: "Logout" },
  ];

  const renderContent = () => {
    switch (activeSection) {
      case "Dashboard":
        return <Dashboard />;
      case "Products":
        return <Products />;
      case "Category":
        return <Category />;
      case "Services":
        return <Services />;
      case "Quote Details":
        return <RequestQuote />;
      case "Contact":
        return <Contact />;
      case "Logout":
        return <Logout />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-gray-100 dark:bg-gray-800">
      <aside
        className={`${
          isSidebarOpen ? "w-64" : "w-20"
        } bg-gradient-to-b from-blue-950 to-emerald-900 dark:bg-gray-900 transition-all duration-300 ease-in-out relative `}
      >
        <div className="p-4 ">
          <button
            onClick={toggleSidebar}
            className="p-2 mb-4 text-white border border-transparent rounded-full hover:bg-blue-700"
          >
            <AiOutlineBarChart className="w-8 h-8" />
          </button>
          <nav className="mt-6 space-y-4">
            {sidebarItems.map((item, index) => (
              <div
                className="relative group"
                key={index}
                onMouseEnter={() => setHoveredItem(item.label)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <Link
                  to="#"
                  onClick={() => setActiveSection(item.section)}
                  className={`flex items-center p-2 space-x-2 text-xl font-semibold text-white rounded-lg hover:bg-black hover:bg-opacity-40 ${
                    item.label === "Logout"
                      ? "hover:bg-red-600 hover:bg-opacity-95"
                      : ""
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  {isSidebarOpen && <span>{item.label}</span>}
                </Link>
                {isSidebarOpen &&
                  hoveredItem === item.label &&
                  item.label !== "Logout" && (
                    <div className="absolute w-40 text-gray-800 transition-opacity duration-200 transform -translate-y-1/2 bg-white rounded-md shadow-md left-full top-1/2">
                      <p className="p-2">{item.label} section</p>
                    </div>
                  )}
              </div>
            ))}
          </nav>
        </div>
      </aside>

      <div className="flex-1 h-full p-6 overflow-auto bg-white shadow-md">
        {renderContent()}
      </div>
    </div>
  );
}

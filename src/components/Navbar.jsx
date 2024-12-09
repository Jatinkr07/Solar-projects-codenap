import { useState, useEffect } from "react";
import { RiArrowDropDownLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import axios from "axios";
import API_URL from "../api";
import { useTranslation } from "react-i18next";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [listDown, setListDown] = useState(false);
  const [serviceListDown, setServiceListDown] = useState(false);
  const [topProducts, setTopProducts] = useState([]);
  const [topServices, setTopServices] = useState([]);
  const { t, i18n } = useTranslation();
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
  const currentLanguage = i18n.language;

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const fetchTopProducts = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/api/products/get/top-list`
        );
        const productTop = response.data.map((product) => ({
          id: product._id,
          title:
            currentLanguage === "fr" ? product.title?.fr : product.title?.en,
        }));
        setTopProducts(productTop);
      } catch (error) {
        console.error("Error fetching top products:", error);
      }
    };

    fetchTopProducts();
  }, [currentLanguage]);

  useEffect(() => {
    const fetchTopServices = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/api/services/get/top-service-here`
        );

        const serviceTop = response.data.map((service) => ({
          id: service._id,
          heading:
            currentLanguage === "fr"
              ? service?.heading?.fr
              : service?.heading?.en,
        }));
        setTopServices(serviceTop);
      } catch (error) {
        console.error("Error fetching top services:", error);
      }
    };

    fetchTopServices();
  }, [currentLanguage]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const changeLanguage = (lang) => {
    console.log(`Changing language to: ${lang}`);
    i18n.changeLanguage(lang);
    setIsLangDropdownOpen(false);
  };

  return (
    <div className="bg-white">
      <header
        className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 py-4 backdrop-blur-md transition-all duration-300 ${
          isScrolled
            ? "bg-black text-white"
            : "bg-black bg-opacity-5 text-white"
        }`}
      >
        <div className="text-2xl font-bold">Logo</div>

        <div className="cursor-pointer lg:hidden" onClick={toggleMenu}>
          {isMenuOpen ? (
            <FiX className="w-8 h-8 text-white" />
          ) : (
            <FiMenu className="w-8 h-8" />
          )}
        </div>

        <nav
          className={`flex-col lg:flex-row items-center space-y-6 lg:space-y-0 lg:space-x-8 lg:flex transition-all duration-300 font-semibold text-lg mx-8  ${
            isMenuOpen ? "flex" : "hidden lg:flex"
          } ${
            isMenuOpen
              ? "absolute top-16 mx-auto w-full left-0  h-[66vh] right-0 bg-black text-white z-40  "
              : ""
          }`}
        >
          <Link
            to="/"
            className="py-2 text-base text-center md:text-xl hover:text-blue-600"
            onClick={closeMenu}
          >
            {t("Home")}
          </Link>
          <Link
            to="/about-us"
            className="py-2 text-base text-center hover:text-blue-600 md:text-xl"
            onClick={closeMenu}
          >
            {t("About us")}
          </Link>
          <Link
            to="/gallery"
            className="py-2 text-base text-center hover:text-blue-600 md:text-xl"
            onClick={closeMenu}
          >
            {t("Gallery")}
          </Link>

          <div
            className="relative py-2 text-base text-center md:text-xl"
            onMouseEnter={() => setListDown(true)}
            onMouseLeave={() => setListDown(false)}
          >
            <Link
              to="/products"
              className="hover:text-blue-600"
              onClick={closeMenu}
            >
              {t("Products")}
              <span className="inline-block w-3 h-4">
                <RiArrowDropDownLine className="w-6 h-6" />
              </span>
            </Link>

            {listDown && (
              <div className="absolute left-0 flex flex-col w-56 p-2 mt-2 -mx-12 text-gray-200 bg-white rounded shadow-lg">
                {topProducts.length > 0 ? (
                  topProducts.map((product) => (
                    <Link
                      to={`/products/${product.id}`}
                      key={product.id}
                      className="text-lg font-medium text-gray-500 hover:text-black"
                      onClick={closeMenu}
                    >
                      {product.title}
                    </Link>
                  ))
                ) : (
                  <span className="text-gray-500">No products available</span>
                )}
              </div>
            )}
          </div>

          <div
            className="relative py-2 text-base text-center md:text-xl"
            onMouseEnter={() => setServiceListDown(true)}
            onMouseLeave={() => setServiceListDown(false)}
          >
            <Link
              to="/services"
              className=" hover:text-blue-600"
              onClick={closeMenu}
            >
              {t("Services")}
              <span className="inline-block w-3 h-4 ml-1">
                <RiArrowDropDownLine className="w-6 h-6" />
              </span>
            </Link>

            {serviceListDown && (
              <div className="absolute left-0 flex flex-col w-56 p-2 mt-2 -mx-12 text-gray-200 bg-white rounded shadow-lg">
                {topServices.length > 0 ? (
                  topServices.map((service) => (
                    <Link
                      to={`/services/${service.id}`}
                      key={service.id}
                      className="text-lg font-medium text-gray-500 hover:text-black"
                      onClick={closeMenu}
                    >
                      {service.heading}
                    </Link>
                  ))
                ) : (
                  <span className="text-gray-500">No services available</span>
                )}
              </div>
            )}
          </div>

          <Link
            to="/contact-us"
            className="py-2 text-base text-center hover:text-blue-600 md:text-xl"
            onClick={closeMenu}
          >
            {t("Contact us")}
          </Link>
          <div className="relative px-2 py-1 text-black bg-gray-200 rounded-lg">
            <div
              className="flex items-center cursor-pointer"
              onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
            >
              <span className="text-black hover:underline">
                {i18n.language === "fr" ? "FR" : "EN"}
              </span>
              <RiArrowDropDownLine className="ml-1" />
            </div>
            {isLangDropdownOpen && (
              <div className="absolute right-0 w-32 mt-2 bg-white rounded shadow-lg">
                <button
                  onClick={() => changeLanguage("en")}
                  className={`block w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-200 ${
                    i18n.language === "en" ? "font-bold" : ""
                  }`}
                >
                  EN
                </button>
                <button
                  onClick={() => changeLanguage("fr")}
                  className={`block w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-200 ${
                    i18n.language === "fr" ? "font-bold" : ""
                  }`}
                >
                  FR
                </button>
              </div>
            )}
          </div>
        </nav>
      </header>
    </div>
  );
};

export default Navbar;

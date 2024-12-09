import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { FaArrowRightLong, FaArrowLeft } from "react-icons/fa6"; // Importing the left arrow icon
import { Link } from "react-router-dom";
import API_URL from "../api";
import { useTranslation } from "react-i18next";

export default function Choose() {
  const [services, setServices] = useState([]);
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language;

  const scrollRef = useRef(null); // Reference to the scrollable container

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/services`);
        const serviceNames = response.data.map((service) => ({
          id: service._id,
          name: currentLanguage === "fr" ? service.name?.fr : service.name?.en,
          mainImg: service.mainImg,
          description:
            currentLanguage === "fr"
              ? service.description?.fr
              : service.description?.en,
        }));

        setServices(serviceNames);
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };
    fetchServices();
  }, [currentLanguage]);

  const scrollLeft = () => {
    scrollRef.current.scrollBy({
      left: -300, // Scroll left by 300px
      behavior: "smooth",
    });
  };

  const scrollRight = () => {
    scrollRef.current.scrollBy({
      left: 300, // Scroll right by 300px
      behavior: "smooth",
    });
  };

  return (
    <section className="container px-4 py-12 mx-auto mt-24">
      <h2 className="mb-4 text-base font-semibold text-center text-red-600 md:text-xl">
        {t("choose-us")}
      </h2>
      <h1 className="mb-2 text-lg font-bold text-center md:text-4xl">
        {t("our-innovation")}
      </h1>
      <h3 className="mb-6 text-2xl font-semibold text-center md:text-3xl">
        {t("Leading")}
      </h3>
      <p className="max-w-3xl mx-auto mb-12 text-sm text-center text-gray-600 md:text-lg">
        {t("Company-services")}
      </p>

      {/* Mobile Horizontal Scrolling */}
      <div className="relative block md:hidden">
        <div
          className="flex overflow-x-auto snap-x snap-mandatory"
          ref={scrollRef}
        >
          {services.slice(0, 3).map((service) => (
            <Link
              to={`/services/${service.id}`}
              key={service.id}
              className="flex-none w-full mx-2 h-96 snap-start"
            >
              <div className="relative w-full h-full bg-gray-100 bg-opacity-50 rounded-lg shadow-md">
                <div className="relative h-full overflow-hidden rounded-lg">
                  <img
                    src={`${API_URL}${
                      service.mainImg || "/placeholder-image.jpg"
                    }`}
                    alt={service.name}
                    className="object-cover w-full h-full"
                  />
                  <div className="absolute inset-0 flex items-end justify-start transition-opacity duration-300 bg-black bg-opacity-50 opacity-0 hover:opacity-100">
                    <div className="p-4 text-white">
                      <h3 className="text-lg font-semibold">{service.name}</h3>
                      <p className="mt-2 text-sm">
                        {service.description.length > 100
                          ? `${service.description.slice(0, 100)}...`
                          : service.description}
                      </p>
                      <FaArrowRightLong className="w-5 h-5 mt-4 transition-transform duration-300 transform hover:translate-x-1" />
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Left and Right Arrow Buttons */}
        <button
          onClick={scrollLeft}
          className="absolute p-2 text-white transition bg-gray-600 rounded-full left-4 bottom-4 hover:bg-gray-700"
        >
          <FaArrowLeft className="w-6 h-6" />
        </button>

        <button
          onClick={scrollRight}
          className="absolute p-2 text-white transition bg-gray-600 rounded-full right-4 bottom-4 hover:bg-gray-700"
        >
          <FaArrowRightLong className="w-6 h-6" />
        </button>
      </div>

      {/* Desktop Grid Layout */}
      <div className="hidden grid-cols-1 gap-6 md:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {services.slice(0, 3).map((service) => (
          <Link to={`/services/${service.id}`} key={service.id}>
            <div className="relative w-full mx-0 md:mx-44 max-w-[360px] transition duration-300 bg-gray-100 bg-opacity-50 rounded-lg shadow-md group h-96 lg:h-[400px]">
              <div className="relative h-full overflow-hidden rounded-lg">
                <img
                  src={`${API_URL}${
                    service.mainImg || "/placeholder-image.jpg"
                  }`}
                  alt={service.name}
                  className="object-cover w-full h-full transition-transform duration-300 transform group-hover:scale-105"
                />
                <div className="absolute inset-0 flex items-end justify-start transition-opacity duration-300 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100">
                  <div className="p-4 text-white">
                    <h3 className="text-lg font-semibold">{service.name}</h3>
                    <p className="mt-2 text-sm">
                      {service.description.length > 100
                        ? `${service.description.slice(0, 100)}...`
                        : service.description}
                    </p>
                    <FaArrowRightLong className="w-5 h-5 mt-4 transition-transform duration-300 transform group-hover:translate-x-1" />
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

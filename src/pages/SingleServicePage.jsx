/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import Faqs from "./FaqsItem";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import API_URL from "../api";
import { useTranslation } from "react-i18next";

export default function SingleServicePage() {
  const { id: serviceId } = useParams();
  const [service, setService] = useState(null);
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language;

  useEffect(() => {
    const fetchServiceDetails = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/api/services/${serviceId}`
        );
        const serviceData = {
          id: response.data._id,
          title:
            currentLanguage === "fr"
              ? response.data.title.fr
              : response.data.title.en,
          heading:
            currentLanguage === "fr"
              ? response.data.heading.fr
              : response.data.heading.en,
          mainImg: response.data.mainImg,
          banner: response.data.banner,
          subDescription:
            currentLanguage === "fr"
              ? response.data.subDescription.fr
              : response.data.subDescription.en,
          description:
            currentLanguage === "fr"
              ? response.data.description.fr
              : response.data.description.en,
        };
        setService(serviceData);
      } catch (error) {
        console.error("Error fetching service details:", error);
      }
    };
    fetchServiceDetails();
  }, [serviceId, currentLanguage]);

  if (!service) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 ">
      <header className="text-white bg-gray-900 ">
        <div className="container flex flex-col items-center px-4 py-24 mx-auto md:py-16 md:h-[67vh] h-[70vh] md:flex-row max-w-7xl">
          <div className="w-full mb-8 md:w-1/2 md:mb-0">
            <h1 className="mb-4 text-lg font-bold md:text-5xl">
              {service.heading || "Service Title"}
            </h1>
            <p className="mb-4 text-sm md:text-lg">
              {service.description || "Service Description"}
            </p>
            <Link to="/contact-us">
              <button className="px-3 py-1 mt-4 text-white transition bg-red-500 rounded-lg md:px-4 md:py-2 hover:bg-red-600">
                Let's Talk
              </button>
            </Link>
          </div>
          <div className="flex justify-center w-full md:w-1/2">
            <img
              src={
                service.mainImg
                  ? `${API_URL}${service.mainImg}`
                  : "/placeholder-image.jpg"
              }
              alt={service.heading || "Service Image"}
              className="object-contain transition-transform transform rounded-md w-80 h-80 animate-spin-slow hover:scale-105"
            />
          </div>
        </div>
      </header>

      <div className="container px-4 py-8 mx-auto max-w-7xl ">
        <h1 className="mb-8 text-2xl font-bold text-center">
          {t("Use_service")}
        </h1>

        <div className="grid grid-cols-1 gap-4 mb-12 md:grid-cols-2 lg:grid-cols-4">
          {[1, 2, 3, 4].map((index) => (
            <div
              key={index}
              className={`p-4 bg-gray-100 rounded-lg shadow-md transition-transform transform hover:scale-105 hover:bg-red-100 hover:border-red-400 border ${
                index === 0 ? "border-2 border-red-500" : ""
              }`}
            >
              <div className="flex items-start mb-2">
                <svg
                  className="w-5 h-5 mr-2 text-red-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <p className="font-semibold">{t("topHead")}</p>
              </div>
              <p className="text-sm">{t("topDesc")}</p>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-8 mb-12 lg:flex-row">
          <div className="lg:w-[70%]" key={service._id}>
            <h2 className="mb-4 text-lg font-bold md:text-3xl">
              {service.title || "Service Title"}
            </h2>
            <p className="mb-4 text-base md:text-lg">
              {service.subDescription || "Service Description"}
            </p>
          </div>

          <div className="lg:w-1/2">
            {service.banner ? (
              <img
                src={`${API_URL}${service.banner}`}
                alt="Service Banner"
                className="object-contain w-64 h-48 transition-transform transform rounded-lg md:w-full md:h-80 hover:scale-105"
              />
            ) : (
              <img
                src="/placeholder-image.jpg"
                alt="Placeholder Image"
                className="w-full rounded-lg shadow-md h-80"
              />
            )}
          </div>
        </div>

        <h2 className="mb-8 text-2xl font-bold text-center">
          <span className="text-red-500">ABC PVT</span> {t("tag")}
        </h2>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {[
            {
              number: 1,
              title: t("title1"),
              description: t("Desc1"),
            },
            {
              number: 2,
              title: t("title2"),
              description: t("Desc2"),
            },
            {
              number: 3,
              title: t("title3"),
              description: t(
                "Our developers can evaluate digital circuits in any hardware using computer programming tools to determine a better and more functional design."
              ),
            },
            {
              number: 4,
              title: t("title4"),
              description: t(
                "Our developers can evaluate digital circuits in any hardware using computer programming tools to determine a better and more functional design."
              ),
            },
          ].map((item) => (
            <div key={item.number} className="flex flex-col items-start">
              <div className="flex items-center justify-center w-8 h-8 mb-2 font-bold text-white bg-red-500 rounded-full">
                {item.number}
              </div>
              <h3 className="mb-2 text-lg font-semibold">{item.title}</h3>
              <p className="text-sm">{item.description}</p>
            </div>
          ))}
        </div>
      </div>

      <Faqs />

      <div className="bg-[#1f2328] text-white p-8 relative overflow-hidden mb-12 rounded-lg mx-8 text-center">
        <div className="max-w-4xl mx-auto">
          <p className="mb-2 text-xs text-blue-300 uppercase">
            did you know...
          </p>
          <h2 className="mb-2 text-2xl font-bold md:text-3xl">
            Lorem ipsum de <span className="text-red-500 ">top 3:</span> Lorem
            ipsum lorem ipsum lorem ipsum
          </h2>
          <p className="mb-4 text-lg md:text-xl">
            Lorem ipsum lorem ipsum lorem
          </p>
          <p className="mb-4 text-sm text-center">
            Thinking of responsible partners?
          </p>
          <Link to="/contact-us">
            <button className="bg-[#3d4e81] text-white px-4 py-2 rounded-full hover:bg-[#4b5d90] transition-colors">
              Let's Talk
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

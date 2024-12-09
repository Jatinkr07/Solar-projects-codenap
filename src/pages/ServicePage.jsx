/* eslint-disable react/no-unescaped-entities */

import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  LuZap,
  LuFileText,
  LuBrain,
  LuDatabase,
  LuCpu,
  LuFlaskConical,
  LuShieldCheck,
  LuUsers,
  LuTrendingUp,
} from "react-icons/lu";
import axios from "axios";
import API_URL from "../api";
import { useTranslation } from "react-i18next";

export default function ServicePage() {
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language;
  const [services, setServices] = useState([]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/services`);
        const serviceName = response.data.map((service) => ({
          id: service._id,
          title: currentLanguage === "fr" ? service.title.fr : service.title.en,
          mainImg: service.mainImg,
          subDescription:
            currentLanguage === "fr"
              ? service.subDescription.fr
              : service.subDescription.en,
        }));
        setServices(serviceName);
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };
    fetchServices();
  }, [currentLanguage]);

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="text-white bg-gray-900 h-[480px] py-12 relative overflow-hidden">
        <div className="container flex flex-col items-center mx-auto md:px-24 md:flex-row">
          <div className="mt-0 lg:mb-20 md:w-1/2 md:mt-12">
            <h1 className="mt-4 mb-4 text-lg font-bold text-center md:text-4xl md:text-left">
              {t("Ourservices")}
            </h1>
            <p className="mb-4 text-[13px] text-center md:text-base md:text-left">
              {t("Servicedescription")}
            </p>
            <p className="text-sm text-center md:text-lg md:text-left ">
              With a commitment to sustainability, we offer a wide range of
              solar energy solutions tailored to meet the growing global demand
              for clean and reliable energy.
            </p>
          </div>

          <div className="flex justify-center w-full md:w-1/2 ">
            <div className="relative w-[200px] h-[120px] md:w-full sm:h-[300px] md:h-[300px]  mt-4 md:mt-10 rounded-lg">
              <img
                src="https://cdn.pixabay.com/photo/2019/09/29/22/06/light-bulb-4514505_1280.jpg"
                alt="Globe"
                className="object-cover w-full h-full transition-transform duration-300 transform hover:scale-105"
                loading="eager"
              />
            </div>
          </div>
        </div>
      </header>

      <section className="py-16">
        <div className="container px-4 mx-auto">
          <h2 className="mb-8 text-lg font-bold text-center md:text-3xl">
            {t("Ourservices")}
          </h2>
          <p className="max-w-4xl mx-auto mb-12 text-sm text-lg text-center">
            {t("shortDesc")}
          </p>
          <div className="grid grid-cols-2 gap-4 md:gap-0 sm:grid-cols-2 md:grid-cols-3 md:px-24">
            {services.map((service, index) => (
              <div
                key={service._id || index}
                className="flex flex-col w-[110%] h-64 overflow-hidden transition-shadow duration-300 bg-white rounded-lg shadow-md hover:shadow-lg sm:w-1/2 md:w-1/3 lg:w-[350px]"
              >
                <img
                  src={
                    service.mainImg
                      ? `${API_URL}${service.mainImg}`
                      : "/placeholder-image.jpg"
                  }
                  alt={service.title}
                  className="object-contain w-full h-48 transition-transform duration-300 transform hover:scale-105"
                  loading="eager"
                />
                <div className="flex flex-col justify-between h-full p-6 ">
                  <div className="flex-grow">
                    <h3 className="mb-2 font-semibold md:text-xl">
                      {service.title}
                    </h3>

                    <p className="mb-4 text-sm text-gray-600 md:text-lg">
                      {service.subDescription &&
                      typeof service.subDescription === "string" &&
                      service.subDescription.length > 80
                        ? `${service.subDescription.slice(0, 80)}...`
                        : service.subDescription || "No description available"}
                    </p>
                  </div>
                  <Link
                    to={`/services/${service.id}`}
                    className="mt-auto text-sm font-semibold text-red-600 transition-colors duration-300 md:text-lg hover:text-red-700"
                  >
                    Explore →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="container max-w-6xl px-4 py-8 mx-auto md:px-6 lg:px-8 lg:py-12">
        <h1 className="mb-6 text-lg font-bold text-center md:text-3xl md:mb-8">
          {t("whychoose")} <span className="text-red-600">{t("Ltd")}</span>
        </h1>

        <div className="grid grid-cols-1 gap-6 mb-10 md:grid-cols-3 md:gap-8 md:mb-12">
          {[
            {
              icon: LuFileText,
              title: t("banner1"),
              number: 1,
            },
            {
              icon: LuZap,
              title: t("banner2"),
              number: 2,
            },
            {
              icon: LuBrain,
              title: t("banner3"),
              number: 3,
            },
          ].map((item, index) => (
            <div
              key={index}
              className="flex flex-col items-start p-4 transition-shadow duration-300 border rounded-lg hover:shadow-lg"
            >
              <div className="flex items-center mb-2">
                <div className="flex items-center justify-center w-8 h-8 mr-2 text-white bg-red-600 rounded-full">
                  {item.number}
                </div>
                <h2 className="text-lg font-semibold md:text-xl">
                  {item.title}
                </h2>
              </div>
              <p className="text-sm text-gray-600 md:text-base">
                We stay at the forefront of hardware innovation, leveraging the
                latest technologies and best practices.
              </p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-6 mb-10 text-center border md:grid-cols-4 md:gap-8 md:mb-12">
          {[
            {
              value: "61$",
              description: "Lorem ipsum lorem ipsum.",
            },
            {
              value: "66,200+",
              description: "hardware developers in the world.",
            },
            {
              value: "+2%",
              description: "Lorem ipsum lorem ipsum.",
            },
            {
              value: "2,030",
              description: "Lorem ipsum lorem ipsum.",
            },
          ].map((stat, index) => (
            <div
              key={index}
              className="p-4 transition-shadow duration-300 border rounded-lg hover:shadow-lg"
            >
              <div className="mb-1 text-2xl font-bold text-red-600 md:text-3xl md:mb-2">
                {stat.value}
              </div>
              <p className="text-sm text-gray-600 md:text-base">
                {stat.description}
              </p>
            </div>
          ))}
        </div>

        <h2 className="mb-4 text-xl font-bold text-center md:text-2xl">
          {t("serviceExplore")}
        </h2>
        <p className="max-w-3xl mx-auto mb-8 text-sm text-center text-gray-600 md:text-base">
          {t("serviceDesc")}
        </p>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
          {[
            {
              icon: LuDatabase,
              title: t("head1"),
            },
            {
              icon: LuCpu,
              title: t("head2"),
            },
            {
              icon: LuFlaskConical,
              title: t("head3"),
            },
            {
              icon: LuShieldCheck,
              title: t("head4"),
            },
            {
              icon: LuUsers,
              title: t("head5"),
            },
            {
              icon: LuTrendingUp,
              title: t("head6"),
            },
          ].map((item, index) => (
            <div
              key={index}
              className="flex flex-col items-start p-4 transition-shadow duration-300 border rounded-lg hover:shadow-lg"
            >
              <item.icon className="w-6 h-6 mb-2 text-red-600" />
              <h3 className="mb-2 text-lg font-semibold md:text-xl">
                {item.title}
              </h3>
              <p className="text-sm text-gray-600 md:text-base">
                {t("headDesc")}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-[#1f2328] text-white p-8 relative overflow-hidden mb-12 rounded-lg mx-4 text-center">
        <div className="max-w-4xl mx-auto">
          <p className="mb-2 text-xs text-blue-300 uppercase">
            Did you know...
          </p>
          <h2 className="mb-2 text-2xl font-bold md:text-3xl">
            Lorem ipsum de <span className="text-red-500">top 3:</span> Lorem
            ipsum lorem ipsum.
          </h2>
          <p className="mb-4 text-lg md:text-xl">Lorem ipsum lorem ipsum.</p>
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

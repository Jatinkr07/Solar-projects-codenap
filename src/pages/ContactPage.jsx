import { useState } from "react";
import { useForm } from "react-hook-form";
import { IoIosMail, IoMdPhonePortrait, IoIosSend } from "react-icons/io";
import { LuMapPin } from "react-icons/lu";
import axios from "axios";
import API_URL from "../api";
import { useTranslation } from "react-i18next"; // Import the useTranslation hook

export default function ContactForm() {
  const { t } = useTranslation(); // Initialize translation hook
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      await axios.post(`${API_URL}/api/submit-form`, data);
      alert(t("contact.submitSuccess"));
    } catch (error) {
      console.error("Error submitting form:", error);
      alert(t("contact.submitError"));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <div className="relative py-24 text-white  bg-gray-900 h-[420px]">
        <div className="absolute inset-0 overflow-hidden">
          <img
            src="https://cdn.pixabay.com/photo/2019/09/29/22/06/light-bulb-4514505_1280.jpg"
            alt="Electronic components"
            className="object-cover w-full h-full opacity-50"
          />
        </div>
        <div className="container relative px-4 mx-auto">
          <h1 className="text-5xl font-bold text-center mt-28">
            {t("contact.title")}
          </h1>
        </div>
      </div>

      <main className="flex-grow py-12 bg-white ">
        <div className="container px-4 mx-auto max-w-7xl">
          <div className="flex flex-col md:flex-row md:gap-8">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="w-full p-6 mt-4 -mx-0.5 space-y-6 bg-white border border-gray-200 rounded-lg shadow-lg md:w-1/2"
            >
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="firstName"
                    className="block text-sm font-medium text-gray-700"
                  >
                    {t("contact.firstName")}
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    {...register("firstName", {
                      required: t("contact.firstNameRequired"),
                    })}
                    className="block w-full px-3 py-2 mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    placeholder={t("contact.enterFirstName")}
                  />
                  {errors.firstName && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.firstName.message}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="lastName"
                    className="block text-sm font-medium text-gray-700"
                  >
                    {t("contact.lastName")}
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    {...register("lastName", {
                      required: t("contact.lastNameRequired"),
                    })}
                    className="block w-full px-3 py-2 mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    placeholder={t("contact.enterLastName")}
                  />
                  {errors.lastName && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.lastName.message}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  {t("contact.email")}
                </label>
                <input
                  type="email"
                  id="email"
                  {...register("email", {
                    required: t("contact.emailRequired"),
                    pattern: {
                      value: /^\S+@\S+$/i,
                      message: t("contact.invalidEmail"),
                    },
                  })}
                  className="block w-full px-3 py-2 mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  placeholder={t("contact.enterValidEmail")}
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-700"
                >
                  {t("contact.phone")}
                </label>
                <input
                  type="tel"
                  id="phone"
                  {...register("phone", {
                    required: t("contact.phoneRequired"),
                  })}
                  className="block w-full px-3 py-2 mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  placeholder="0000 0000 00"
                />
                {errors.phone && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.phone.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700"
                >
                  {t("contact.message")}
                </label>
                <textarea
                  id="message"
                  {...register("message", {
                    required: t("contact.messageRequired"),
                  })}
                  rows={4}
                  className="block w-full px-3 py-2 mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  placeholder={t("contact.leaveMessage")}
                ></textarea>
                {errors.message && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.message.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  {t("contact.reason")}
                </label>
                <div className="grid grid-cols-1 gap-2 mt-2 sm:grid-cols-2">
                  {[
                    t("contact.solarPanels"),
                    t("contact.iotGateway"),
                    t("contact.aqiMonitoringDevice"),
                    t("contact.other"),
                  ].map((reason) => (
                    <div key={reason} className="flex items-center">
                      <input
                        id={reason}
                        type="checkbox"
                        {...register("reason")}
                        value={reason}
                        className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                      />
                      <label
                        htmlFor={reason}
                        className="block ml-2 text-sm text-gray-900"
                      >
                        {reason}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-white transition duration-200 bg-black border border-transparent rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500 disabled:opacity-50 hover:bg-gray-800"
              >
                {isSubmitting ? t("contact.sending") : t("contact.send")}
                <IoIosSend className="w-4 h-4 ml-2" />
              </button>
            </form>

            <div className="flex flex-col items-start justify-start w-full p-6 mt-4 space-y-8 bg-white border border-gray-200 rounded-lg shadow-lg md:w-1/2 -mx-0.5">
              <h1 className="mb-4 text-5xl font-semibold">
                {t("contact.contactDetails")}
              </h1>
              <div className="w-full">
                <h2 className="mb-2 text-xl font-bold md:text-2xl">
                  {t("contact.mailUs")}
                </h2>
                <p className="mb-2 text-gray-600">{t("contact.callHours")}</p>
                <div className="flex items-center text-indigo-600 transition duration-200 hover:text-indigo-400">
                  <IoIosMail className="w-5 h-5 mr-2" />
                  <p>info@example.com</p>
                </div>
              </div>

              <div className="w-full">
                <h2 className="mb-2 text-xl font-bold md:text-2xl">
                  {t("contact.callUs")}
                </h2>
                <p className="mb-2 text-gray-600">{t("contact.questions")}</p>
                <div className="flex items-center text-indigo-600 transition duration-200 hover:text-indigo-400">
                  <IoMdPhonePortrait className="w-5 h-5 mr-2" />
                  <p>+00 111 222 333</p>
                </div>
              </div>

              <div className="w-full">
                <h2 className="mb-2 text-xl font-bold md:text-2xl">
                  {t("contact.findUs")}
                </h2>
                <p className="mb-2 text-gray-600">{t("contact.comeMeetUs")}</p>
                <div className="flex items-center text-indigo-600 transition duration-200 hover:text-indigo-400">
                  <LuMapPin className="w-5 h-5 mr-2" />
                  <p>1234 Main St, City, Country</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

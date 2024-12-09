import { AiFillThunderbolt } from "react-icons/ai";
import { FaWifi } from "react-icons/fa6";
import { HiMiniShieldCheck } from "react-icons/hi2";
import { BsBatteryCharging } from "react-icons/bs";
import { useTranslation } from "react-i18next";

const About = () => {
  const { t } = useTranslation();

  return (
    <>
      <section className="relative max-w-6xl px-4 py-12 mx-auto overflow-hidden">
        <div className="flex flex-col mb-12 lg:flex-row lg:justify-between lg:items-center">
          <h2 className="mb-4 text-base font-bold md:text-xl lg:mb-32 lg:mr-8">
            {t("About")}
          </h2>
          <div className="flex flex-col lg:flex-1">
            <p className="mb-4 text-sm font-semibold text-gray-700 lg:text-3xl lg:leading-relaxed lg:mb-2">
              {t("AboutDescription")}
            </p>
            <a
              href="/about-us"
              className="self-start text-sm text-gray-600 underline transition duration-300 md:text-base hover:text-gray-800"
            >
              {t("ReadMore")}
            </a>
          </div>
        </div>

        <div className="grid gap-6 md:gap-24">
          <div className="flex flex-col lg:flex-row lg:justify-between lg:space-x-8">
            <div className="flex items-start space-x-4">
              <div className="bg-[#1a1a2e] p-3 rounded-lg flex-shrink-0 transition-transform transform hover:scale-105">
                <AiFillThunderbolt className="w-3 h-3 text-white md:w-6 md:h-6" />
              </div>
              <div>
                <h3 className="mb-2 text-sm font-semibold lg:text-xl">
                  {t("AdvancedBatteryTechnology")}
                </h3>
                <p className="text-sm text-gray-600 md:text-base">
                  {t("AdvancedBatteryDescription")}
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row-reverse lg:justify-between lg:space-x-8 lg:space-x-reverse">
            <div className="flex items-start space-x-4">
              <div className="bg-[#1a1a2e] p-3 rounded-lg flex-shrink-0 transition-transform transform hover:scale-105">
                <FaWifi className="w-3 h-3 text-white md:w-6 md:h-6" />
              </div>
              <div>
                <h3 className="mb-2 text-sm font-semibold lg:text-xl">
                  {t("IntelligenceChargingSolutions")}
                </h3>
                <p className="text-sm text-gray-600 md:text-base">
                  {t("IntelligenceChargingDescription")}
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row lg:justify-between lg:space-x-8">
            <div className="flex items-start space-x-4">
              <div className="bg-[#1a1a2e] p-3 rounded-lg flex-shrink-0 transition-transform transform hover:scale-105">
                <BsBatteryCharging className="w-3 h-3 text-white md:w-6 md:h-6" />
              </div>
              <div>
                <h3 className="mb-2 text-sm font-semibold lg:text-xl">
                  {t("EnergyEfficientCharging")}
                </h3>
                <p className="text-sm text-gray-600 md:text-base">
                  {t("EnergyEfficientDescription")}
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row-reverse lg:justify-between lg:space-x-8 lg:space-x-reverse">
            <div className="flex items-start space-x-4">
              <div className="bg-[#1a1a2e] p-3 rounded-lg flex-shrink-0 transition-transform transform hover:scale-105">
                <HiMiniShieldCheck className="w-3 h-3 text-white md:w-6 md:h-6" />
              </div>
              <div>
                <h3 className="mb-2 text-sm font-semibold lg:text-xl">
                  {t("SecureIoTDevices")}
                </h3>
                <p className="text-sm text-gray-600 md:text-base">
                  {t("SecureIoTDescription")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;

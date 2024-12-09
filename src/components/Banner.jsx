import { useState } from "react";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import { useTranslation } from "react-i18next";

const galleryImages = [
  "img.jpg",
  "img.jpg",
  "img.jpg",
  "img.jpg",
  "img.jpg",
  "img.jpg",
  "img.jpg",
  "Solar.png",
];

export default function Banner() {
  const { t } = useTranslation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);

  const nextImage = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex < galleryImages.length - 1 ? prevIndex + 1 : 0
    );
  };

  const prevImage = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : galleryImages.length - 1
    );
  };

  const progress = ((currentIndex + 1) / galleryImages.length) * 100;

  const handleSwipe = (touchEndX) => {
    const touchThreshold = 100;
    if (touchEndX - touchStart > touchThreshold) {
      prevImage();
    } else if (touchStart - touchEndX > touchThreshold) {
      nextImage();
    }
  };

  return (
    <div className="min-h-screen mt-24 bg-gray-100">
      <div className="px-4 py-8 mx-auto space-y-12 max-w-[1390px]">
        {/* Banner Section */}
        <section className="overflow-hidden text-white bg-gray-900 rounded-lg md:h-[70vh] h-[80vh]">
          <div className="grid grid-cols-1 gap-8 p-8 md:grid-cols-2">
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-center md:text-5xl md:px-12 md:text-left">
                {t("banner.title")}
              </h2>
              <div className="flex justify-center md:justify-start h-[40vh]">
                <img
                  src="Solar.png"
                  alt="Solar panel with lights"
                  width={200}
                  height={200}
                  className="object-contain rounded-lg md:ml-20 w-[80%] h-96 md:w-[60%] md:h-[400px] md:mt-0 -mt-24"
                />
              </div>
            </div>
            <div className="lg:space-y-6">
              <p className="-mt-48 text-center text-gray-300 md:text-left md:mt-0">
                {t("banner.description")}
              </p>
              <div className="flex justify-center md:justify-start">
                <a href="/services">
                  <button className="px-3 py-1 text-white transition duration-300 bg-red-500 rounded-sm md:px-8 md:py-2 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500">
                    {t("banner.explore")} {">"}
                  </button>
                </a>
              </div>
              <div className="flex justify-center h-[40vh] ">
                <img
                  src="Solar2.png"
                  alt="Solar panel with system"
                  className="object-contain rounded-lg w-[90%] md:w-[60%] md:h-[300px] h-[190px] "
                />
              </div>
            </div>
          </div>
        </section>

        {/* Gallery Section */}
        <section className="relative flex flex-col items-center">
          <div className="relative flex items-center justify-center">
            {/* Previous Button */}
            <button
              onClick={prevImage}
              className="absolute left-0 z-10 px-4 py-2 bg-gray-200 rounded-full hover:shadow-lg focus:outline-none"
            >
              <IoIosArrowBack className="w-6 h-6 text-gray-700" />
            </button>

            {/* Image Gallery */}
            <div className="flex items-center justify-center">
              <div className="flex gap-4 overflow-x-scroll transition-transform no-scrollbar md:w-full md:grid md:grid-cols-4 sm:w-full">
                {galleryImages
                  .slice(currentIndex, currentIndex + 4)
                  .map((src, index) => (
                    <div
                      key={index}
                      className={`overflow-hidden transition-transform transform rounded-lg hover:scale-105 ${
                        window.innerWidth <= 768
                          ? index === 1
                            ? "w-"
                            : "w-full"
                          : index === 4
                          ? "w-1/2"
                          : "w-full"
                      }`}
                    >
                      <img
                        src={src}
                        alt={`Gallery image ${currentIndex + index + 1}`}
                        className="object-cover w-full h-full"
                      />
                    </div>
                  ))}
              </div>
            </div>

            {/* Next Button */}
            <button
              onClick={nextImage}
              className="absolute right-0 z-10 px-4 py-2 bg-gray-200 rounded-full hover:shadow-lg focus:outline-none"
            >
              <IoIosArrowForward className="w-6 h-6 text-gray-700" />
            </button>
          </div>

          {/* Mobile Swipe Gesture (touch event) */}
          <div
            className="absolute inset-0"
            onTouchStart={(e) => setTouchStart(e.touches[0].clientX)}
            onTouchEnd={(e) => handleSwipe(e.changedTouches[0].clientX)}
          ></div>

          {/* Progress Bar */}
          <div className="absolute left-0 right-0 flex items-center justify-center -bottom-4">
            <div className="w-full h-1 bg-gray-200">
              <div
                className="h-full bg-gray-500"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        </section>

        {/* Commitment Section */}
        <section className="flex flex-col items-center overflow-hidden bg-white rounded-lg shadow-lg md:flex-row md:h-[65vh] h-[55vh]">
          <div className="flex flex-col justify-center p-8 space-y-4 md:w-1/2">
            <h3 className="text-base font-semibold text-red-600 md:text-lg">
              {t("banner.commitment")}
            </h3>
            <h2 className="text-lg font-bold md:text-5xl ">
              {t("banner.commitmentDescription")}
            </h2>
            <p className="text-sm text-gray-600 md:text-lg">
              {t("banner.description")}
            </p>
            <div className="flex justify-center md:justify-start">
              <button className="px-2 py-1 font-semibold text-white transition duration-300 bg-gray-800 rounded-lg md:text-lg md:px-6 md:py-3 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-800">
                <a href="/products">{t("banner.exploreProducts")}</a>
              </button>
            </div>
          </div>
          <div className="flex items-center justify-center p-8 md:w-1/2">
            <img
              src="products.png"
              alt="Products"
              className="object-contain w-[90%] md:w-[110%] rounded-lg md:mt-0 -mt-8"
            />
          </div>
        </section>
      </div>
    </div>
  );
}

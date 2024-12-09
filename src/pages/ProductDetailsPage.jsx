import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { GoArrowUpRight } from "react-icons/go";
import RequestQuotePage from "./RequestQuotePage";
import DOMPurify from "dompurify";
import API_URL from "../api";
import { useTranslation } from "react-i18next";

const ProductDetailPage = () => {
  const { id: productId } = useParams();
  const [product, setProduct] = useState(null);
  const [showQuoteModal, setShowQuoteModal] = useState(false);
  const [mainImage, setMainImage] = useState(null);
  const [subImages, setSubImages] = useState([]);
  const { i18n } = useTranslation();
  const currentLanguage = i18n.language;

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/api/products/${productId}`
        );
        const productData = {
          id: response.data._id,
          title:
            currentLanguage === "fr"
              ? response.data.title.fr
              : response.data.title.en,
          mainImage: response.data.images,
          subImages: response.data.images,
          description:
            currentLanguage === "fr"
              ? response.data.description.fr
              : response.data.description.en,
          features:
            currentLanguage === "fr"
              ? response.data.features.fr
              : response.data.features.en,
          technicalDetails:
            currentLanguage === "fr"
              ? response.data.technicalDetails.fr
              : response.data.technicalDetails.en,
          specifications:
            currentLanguage === "fr"
              ? response.data.specifications.fr
              : response.data.specifications.en,
        };
        setProduct(productData);
        setMainImage(response.data.images[0]);
        setSubImages(response.data.images.slice(1));
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };
    fetchProductDetails();
  }, [productId, currentLanguage]);

  if (!product) return <p>Loading...</p>;

  const handleImageSwap = (clickedImage, index) => {
    const newSubImages = [...subImages];
    newSubImages[index] = mainImage;
    setMainImage(clickedImage);
    setSubImages(newSubImages);
  };

  return (
    <div className="min-h-screen bg-gray-50 mb-14">
      {/* Hero Image Section */}
      <div className="relative h-64 sm:h-80 md:h-[30rem]">
        <img
          src="https://cdn.pixabay.com/photo/2019/09/29/22/06/light-bulb-4514505_1280.jpg"
          alt={product.title}
          className="object-cover w-full h-full"
          loading="eager"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40">
          <h1 className="text-3xl font-bold text-white sm:text-4xl lg:text-5xl xl:text-6xl">
            {product.title}
          </h1>
        </div>
      </div>

      {/* Product Details Section */}
      <div className="container px-4 py-8 mx-auto md:px-24 md:py-12">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Product Images Section */}
          <div className="relative">
            {mainImage && (
              <img
                src={`${API_URL}${mainImage}`}
                alt={product.title}
                className="object-cover w-full h-[200px] sm:h-[300px] lg:w-[90%] lg:h-[340px] transition-transform duration-300 ease-in-out transform hover:scale-105"
                loading="eager"
              />
            )}

            {/* Sub-Images */}
            <div className="flex mt-4 space-x-2 overflow-x-auto sm:space-x-6">
              {subImages.map((image, index) => (
                <img
                  key={index}
                  src={`${API_URL}${image}`}
                  alt={`Sub Image ${index}`}
                  className="object-cover w-16 h-16 transition-transform duration-300 ease-in-out transform rounded-lg sm:w-24 sm:h-24 md:w-32 md:h-32 hover:scale-110"
                  loading="eager"
                  onClick={() => handleImageSwap(image, index)}
                />
              ))}
            </div>
          </div>

          {/* Product Information Section */}
          <div className="flex flex-col">
            <h1 className="mb-4 text-lg font-bold sm:text-3xl lg:text-4xl xl:text-4xl">
              {product.title}
            </h1>
            <p
              className="mb-6 text-base text-gray-600 sm:text-lg lg:text-xl xl:text-2xl"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(product.description),
              }}
            />

            <button
              onClick={() => setShowQuoteModal(true)}
              className="self-start px-4 py-2 text-sm font-bold text-white transition duration-300 ease-in-out bg-red-600 shadow-lg md:px-6 md:py-3 rounded-3xl hover:bg-red-700 sm:text-lg"
            >
              Request Quote{" "}
              <GoArrowUpRight className="inline-block w-5 h-5 ml-2" />
            </button>
          </div>
        </div>

        {/* Features and Technical Details */}
        <div className="grid gap-0 mt-8 md:gap-8 md:grid-cols-2">
          <div className="p-4">
            <h3 className="mb-2 text-lg font-bold sm:text-3xl">Features</h3>
            <p
              className="text-base text-gray-700 sm:text-lg lg:text-xl xl:text-2xl"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(product.features),
              }}
            />
          </div>

          <div className="p-4">
            <h3 className="mb-2 text-lg font-bold sm:text-3xl">
              Technical Details
            </h3>
            <p
              className="text-base text-gray-700 sm:text-lg lg:text-xl xl:text-2xl"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(product.technicalDetails),
              }}
            />
          </div>
        </div>

        {/* Specifications Section */}
        <div className="p-4 md:mt-12">
          <h3 className="text-lg font-bold sm:text-3xl xl:text-4xl">
            Specifications
          </h3>
          <p
            className="mt-2 text-base text-gray-700 sm:text-lg lg:text-xl xl:text-2xl"
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(product.specifications),
            }}
          />
        </div>
      </div>

      {/* Quote Modal */}
      {showQuoteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="relative w-full max-w-lg p-8 bg-white shadow-lg rounded-xl">
            <button
              onClick={() => setShowQuoteModal(false)}
              className="absolute text-red-500 top-2 right-2 hover:text-red-700"
            >
              &#x2715;
            </button>

            <RequestQuotePage
              productId={productId}
              onClose={() => setShowQuoteModal(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetailPage;

import { useState } from "react";
import { TiPlus } from "react-icons/ti";
import { useTranslation } from "react-i18next";

const faqsItems = [
  {
    question: "faq_items.0.question",
    answer: "faq_items.0.answer",
  },
  {
    question: "faq_items.1.question",
    answer: "faq_items.1.answer",
  },
  {
    question: "faq_items.2.question",
    answer: "faq_items.2.answer",
  },
  {
    question: "faq_items.3.question",
    answer: "faq_items.3.answer",
  },
  {
    question: "faq_items.4.question",
    answer: "faq_items.4.answer",
  },
  {
    question: "faq_items.5.question",
    answer: "faq_items.5.answer",
  },
  {
    question: "faq_items.6.question",
    answer: "faq_items.6.answer",
  },
  {
    question: "faq_items.7.question",
    answer: "faq_items.7.answer",
  },
];

export default function Faqs() {
  const { t } = useTranslation();
  const [openIndex, setOpenIndex] = useState(null);

  const toggleAnswer = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="p-4 mx-4 mb-24 bg-gray-100 border rounded-lg md:mx-12 md:p-6 max-w-screen-2xl">
      <h2 className="mb-6 text-2xl font-bold text-center">{t("faq")}</h2>
      <div className="flex flex-col ">
        {faqsItems.map((item, index) => (
          <div key={index} className="mb-4">
            <div
              className="flex items-center justify-between w-full p-3 text-base font-semibold text-left rounded-lg shadow-sm cursor-pointer hover:bg-gray-200"
              onClick={() => toggleAnswer(index)}
            >
              {t(item.question)}
              <span className="px-3">
                <TiPlus
                  className={`flex-shrink-0 w-6 h-6 text-red-500 transform transition-transform duration-300 ${
                    openIndex === index ? "rotate-45" : ""
                  }`}
                />
              </span>
            </div>
            {openIndex === index && (
              <div className="p-4 mt-2 text-sm text-gray-700 bg-gray-200 rounded-lg">
                {t(item.answer)}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

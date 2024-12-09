import { useTranslation } from "react-i18next";

export default function Main() {
  const { t } = useTranslation();

  return (
    <div
      className="relative h-[400px] sm:h-[650px] md:h-[600px] lg:h-[530px] bg-cover bg-center overflow-hidden"
      style={{
        backgroundImage: `url(https://cdn.pixabay.com/photo/2019/09/29/22/06/light-bulb-4514505_1280.jpg)`,
      }}
    >
      <main className="flex flex-col items-center justify-center h-full px-4 text-center text-white">
        <h1 className="max-w-6xl mb-6 text-xl font-semibold sm:text-4xl md:text-5xl lg:text-6xl">
          {t("MainTitle")}
        </h1>

        <p className="max-w-4xl mb-8 text-sm sm:text-xl md:text-2xl lg:text-2xl">
          {t("MainDescription")}
        </p>

        <button className="px-3 py-1 text-sm font-semibold text-black transition duration-300 bg-white rounded-md md:text-base md:px-6 md:py-3 hover:bg-gray-200">
          <a href="/products">{t("ExploreProducts")}</a>
        </button>
      </main>
    </div>
  );
}

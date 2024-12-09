import { useTranslation } from "react-i18next";

const galleryImages = [
  "img.jpg",
  "img.jpg",
  "img.jpg",
  "img.jpg",
  "img.jpg",
  "img.jpg",
  "img.jpg",
  "img.jpg",
  "img.jpg",
];

export default function GalleryPage() {
  const { t } = useTranslation();
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="relative h-[270px] bg-gray-800">
        <img
          src=""
          alt="Banner background"
          className="object-contain w-[300px] h-[270px]  opacity-50"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-4xl font-bold text-white mt-28">
            {t("Gallery")}
          </h1>
        </div>
      </div>

      <main className="container px-4 py-8 mx-auto">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 md:grid-cols-4">
          {galleryImages.map((src, index) => (
            <div key={index}>
              <img
                src={src}
                alt={`Gallery image ${index + 1}`}
                className="rounded-lg"
              />
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

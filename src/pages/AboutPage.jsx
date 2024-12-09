import { useTranslation } from "react-i18next";

export default function AboutPage() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-white">
      <div className="relative bg-gray-900 h-72 sm:h-64 md:h-80 lg:h-96">
        <img
          src="/placeholder.svg?height=192&width=1920"
          alt="Circuit Board"
          className="object-cover w-full h-full"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <h1 className="mt-12 text-2xl font-bold text-white sm:text-3xl md:text-4xl lg:text-5xl">
            {t("about.title")}
          </h1>
        </div>
      </div>

      <main className="container px-4 py-8 mx-auto max-w-full md:max-w-[1320px]">
        <section className="mb-12">
          <h2 className="mb-4 text-2xl font-bold sm:text-3xl md:text-4xl">
            {t("about.sectionTitle")}
          </h2>
          <div className="flex flex-col gap-8 text-lg text-gray-600 md:flex-row">
            <div className="md:w-1/2">
              <p className="mb-4">{t("about.description")}</p>
              <p className="mb-4">{t("about.description")}</p>
              <p>{t("about.description")}</p>
            </div>
            <div className="relative rounded-lg md:w-1/2">
              <img
                src="https://img.freepik.com/premium-vector/usb-cable-charging-smartphone-isolated-white-background_1322553-30199.jpg?w=1380"
                alt="Orange Cables"
                className="object-cover h-[200px] w-full rounded-lg md:h-[350px]"
              />
              <div className="absolute hidden w-16 h-16 transform rotate-45 bg-black top-44 right-44 md:block"></div>
              <div className="absolute w-8 h-8 transform rotate-45 bg-red-600 top-56 left-[250px] hidden md:block"></div>
            </div>
          </div>
        </section>

        <section className="overflow-hidden text-white bg-white rounded-xl">
          <div className="relative flex flex-col bg-black md:flex-row">
            <div className="relative z-10 p-8 md:w-1/2">
              <h2 className="mb-4 text-2xl font-bold text-white sm:text-3xl md:text-4xl">
                {t("about.ourVision.title")}
              </h2>
              <p className="mb-4">{t("about.ourVision.description")}</p>
              <p>{t("about.ourVision.description")}</p>
            </div>

            <div className="relative md:w-1/2">
              <img
                src="https://media.istockphoto.com/id/1171902434/photo/smart-industry-control-concept.jpg?s=2048x2048&w=is&k=20&c=1xKarGfePVHAmR0YMFKMO4KPC10fr2WquCPo3tebRS4="
                alt="Circuit Board"
                className="object-cover w-full h-full"
              />
              <div className="absolute z-0 transform rotate-45 bg-black w-[240px] h-[220px] -left-36 md:top-[62px] md:h-[290px] md:w-[298px] top-[10px] md:bloack hidden"></div>
            </div>
          </div>
          <div className="relative flex flex-col mt-12 bg-black md:flex-row-reverse">
            <div className="relative z-10 p-8 md:w-1/2">
              <h2 className="mb-4 text-2xl font-bold sm:text-3xl md:text-4xl">
                {t("about.ourMission.title")}
              </h2>
              <p className="mb-4">{t("about.ourMission.description")}</p>
              <p>{t("about.ourMission.description")}</p>
            </div>

            <div className="relative md:w-1/2">
              <img
                src="https://media.istockphoto.com/id/1171902434/photo/smart-industry-control-concept.jpg?s=2048x2048&w=is&k=20&c=1xKarGfePVHAmR0YMFKMO4KPC10fr2WquCPo3tebRS4="
                alt="Circuit Board"
                className="object-cover w-full h-full"
              />
              <div className="absolute z-0 transform rotate-45 bg-black w-[240px] h-[220px] md:w-[298px] md:h-[296px] -right-36 top-[28px] md:top-[62px] md:block hidden"></div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

import { SkeletonServices } from "../loading/SkeletonHome";
import { useSelector } from "react-redux";

function Services() {
  const { services, error, loading } = useSelector((state) => state.settings);

  return (
    <>
      {loading ? (
        <SkeletonServices className="mt-2" />
      ) : services?.length > 0 ? (
        <div id="services" className="p-4 bg-background dark:bg-darkBackground">
          <h1 className="text-4xl font-bold mb-8 text-center text-text dark:text-darkText">
            Services
          </h1>
          <div className="flex h-full flex-wrap lg:flex-row items-center justify-center gap-8">
            {error && <p className="text-danger text-center">{error}</p>}
            {services.map((service, index) => (
              <div
                className={`w-full md:w-[calc(50%-2rem)] lg:w-[calc(33.33%-2rem)]
                min-h-[400px] bg-white dark:bg-darkSecondary p-8 shadow-lg rounded-lg
                flex flex-col items-center justify-around gap-4`}
                key={service.id || index}
                data-aos="zoom-in"
                data-aos-duration="1000"
              >
                <img className="h-20" src={service.image} alt="" />
                <h1 className="text-3xl font-bold text-center text-text dark:text-darkText">
                  {service.title}
                </h1>
                <p className="text-sm text-muted dark:text-darkText">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </>
  );
}

export default Services;

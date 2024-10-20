import { SkeletonHero } from "../loading/SkeletonHome";
import { useSelector } from "react-redux";

function Hero() {
  const { hero, loading, error } = useSelector((state) => state.settings);
  if (loading) {
    return (
      <section id="home" className="h-[650px] flex items-center justify-center">
        <div className="h-full w-full flex items-center justify-center">
          <SkeletonHero />
        </div>
      </section>
    );
  }
  if (error) {
    return <div className="text-red-500 text-center">{error}</div>;
  }
  return (
    <section className="h-[650px] flex items-center justify-center overflow-y-hidden">
      <div className="h-[752px] w-full fixed left-0 top-0 -z-10 flex flex-col-reverse md:flex-row items-center justify-between bg-gray-100">

        <div className="relative w-full h-full left-0 overflow-hidden">
        <div className="bg-gradient-to-t from-black to-transparent absolute top-0 left-0 z-30 w-full h-full"></div>
          {hero.heroImage && (
            <img
              className="absolute top-0 left-0 h-full md:w-full object-cover"
              src={hero.heroImage}
              alt="Hero"
            />
          )}
          {hero.heroVideo && (
            <video
              src={hero.heroVideo}
              autoPlay
              loop
              muted
              className="absolute top-0 left-0 h-full md:w-full object-cover overflow-hidden"
            />
          )}
        </div>
      </div>
      <div className=" w-full text-center z-30 p-8 flex flex-col items-center justify-center ">
        <h1 className="text-4xl md:text-5xl font-bold leading-tight text-white">
          {hero.heroTitle}
        </h1>
        <p className="mt-4 text-lg md:text-xl text-gray-300">
          {hero.heroDescription}
        </p>
      </div>
    </section>
  );
}

export default Hero;

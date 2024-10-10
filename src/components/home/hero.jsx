import useContentsHook from "../../hooks/settings/useFetchContent";

function Hero() {
  const {data,hero, loading, error} =
  useContentsHook();

  if (loading) {
    return <div className="text-center text-lg">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center">{error}</div>;
  }

  return (
    <section className="h-[650px] flex items-center justify-center">
      <div className="h-full w-full fixed left-0 top-0 -z-10 flex flex-col-reverse md:flex-row items-center justify-between bg-gray-100">
        <div className="bg-gradient-to-t from-black to-transparent absolute top-0 left-0 z-30 w-full h-full"></div>
        
        <div className="relative w-full h-full left-0 overflow-hidden">
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
              className="absolute top-0 left-0 h-full md:w-full object-cover"
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

import { useEffect, useState } from "react";
import useContentsHook from "../../hooks/settings/useFetchContents";
function About() {
  const [change, setChange] = useState(false);
  const { about, loading, error, viewAbout } = useContentsHook();
  useEffect(() => {
    viewAbout({ change, setChange });
  }, []);

  return (
    <div id="about" className="m-4 p-2">
      <h1 className="text-4xl font-bold mb-8 text-center text-text">About</h1>
      <div className="flex  flex-col md:flex-row items-center justify-center gap-8">
        {about.map((about, index) => (
          <div className="flex flex-col items-center bg-white p-8 w-full shadow-lg rounded-lg md:w-[calc(50%-2rem)]">
            <img className="h-20" src={about.image} alt="" />
            <h1 className="text-3xl font-bold mb-8 text-center text-text">
              {about.title}
            </h1>
            <p className="text-sm text-muted">
              {about.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default About;

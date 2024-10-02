import React, { useState, useEffect } from "react";
import axios from "axios";

function Hero() {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const [heroTitle, setHeroTitle] = useState("");
  const [heroSubtitle, setHeroSubtitle] = useState("");
  const [heroImage, setHeroImage] = useState("");
  const [heroVideo, setHeroVideo] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHero = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/contents`);
        console.log(response.data);
        setHeroTitle(response.data.data.heroTitle);
        setHeroSubtitle(response.data.data.heroDescription);
        setHeroImage(response.data.data.heroImage);
        setHeroVideo(response.data.data.heroVideo);
      } catch (error) {
        console.log(error);
        setError(error.response?.data?.message || "Failed to fetch hero data");
      } finally {
        setLoading(false);
      }
    };

    fetchHero();
  }, []);

  if (loading) {
    return <div className="text-center text-lg">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center">{error}</div>;
  }

  return (
    <section className="relative flex flex-col-reverse md:flex-row items-center justify-between bg-gray-100 h-[500px] overflow-hidden">
      <div className="absolute inset-0">
        <video
          src={heroVideo}
          autoPlay
          loop
          muted
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex-1 relative z-10 px-6 md:px-12 lg:px-20 text-center lg:text-left">
        <h1 className="text-4xl md:text-6xl font-bold leading-tight text-white">
          {heroTitle}
        </h1>
        <p className="mt-4 text-lg md:text-2xl text-white">{heroSubtitle}</p>
      </div>
    </section>
  );
}

export default Hero;

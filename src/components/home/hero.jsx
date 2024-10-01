import React, { useState, useEffect } from "react";
import axios from "axios";

function Hero() {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const [heroTitle, setHeroTitle] = useState("");
  const [heroSubtitle, setHeroSubtitle] = useState("");
  const [heroImage, setHeroImage] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHero = async () => {

      try {
        const response = await axios.get(`${BASE_URL}/contents`);
        console.log(response.data)
        setHeroTitle(response.data.data.heroTitle);
        setHeroSubtitle(response.data.data.heroDescription);
        setHeroImage(response.data.data.heroImage);
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
    <section className="flex flex-col-reverse md:flex-row items-center justify-between bg-gray-100">
      <div className="flex-1 px-6 md:px-12 lg:px-20 text-center lg:text-left">
        <h1 className="text-4xl md:text-6xl font-bold leading-tight text-gray-800">
          {heroTitle}
        </h1>
        <p className="mt-4 text-lg md:text-2xl text-gray-600">{heroSubtitle}</p>
      </div>
      <div className="flex-1 lg:flex justify-center">
        <img
          src={heroImage}
          alt="Hero"
          className="w-full h-auto max-w-md object-cover rounded-lg shadow-lg"
        />
      </div>
    </section>
  );
}

export default Hero;

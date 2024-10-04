import React from "react";
import NavBar from "../components/home/navBar";
import Hero from "../components/home/hero";
import Services from "../components/home/services";
import Trainers from "../components/home/trainers";
import About from "../components/home/about";
import Footer from "../components/home/footer";
function Home() {
  return (
    <div>
      <div className=" container mx-auto">
        <NavBar exception={true} />
        <Hero />
      </div>
      <div className="bg-gray-100 w-full h-full">
        <div className="container mx-auto">
          <Services />
          <Trainers />
          <About />
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default Home;

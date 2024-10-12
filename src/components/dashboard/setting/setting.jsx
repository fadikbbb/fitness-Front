import React, { useState } from "react";
import SocialMediaForm from "./socialMediaForm";
import HeroForm from "./heroForm";
import ServicesForm from "./services/servicesForm";
import AboutUsForm from "./aboutUs/aboutUsForm";
const Setting = () => {
  const [activeComponent, setActiveComponent] = useState("heroForm");

  return (
    <div className="w-full p-8">
      <h1 className="text-2xl font-bold mb-6">Page Settings</h1>
      <nav className="settingNav mb-6">
        <ul className="space-x-2 flex cursor-pointer">
          <li
            className={`${activeComponent === "heroForm" ? "font-bold" : ""}`}
            onClick={() => setActiveComponent("heroForm")}
          >
            Hero
          </li>
          <li
            className={`${
              activeComponent === "socialMediaForm" ? "font-bold" : ""
            }`}
            onClick={() => setActiveComponent("socialMediaForm")}
          >
            Social Media
          </li>
          <li
            className={`${
              activeComponent === "servicesForm" ? "font-bold" : ""
            }`}
            onClick={() => setActiveComponent("servicesForm")}
          >
            Services
          </li>
          <li
            className={`${
              activeComponent === "aboutUsForm" ? "font-bold" : ""
            }`}
            onClick={() => setActiveComponent("aboutUsForm")}
          >
            About Us
          </li>
        </ul>
      </nav>
      <main className="w-full p-4 flex flex-col justify-between">
        {activeComponent === "heroForm" && <HeroForm />}
        {activeComponent === "socialMediaForm" && <SocialMediaForm />}
        {activeComponent === "servicesForm" && <ServicesForm />}
        {activeComponent === "aboutUsForm" && <AboutUsForm />}
      </main>
    </div>
  );
};

export default Setting;

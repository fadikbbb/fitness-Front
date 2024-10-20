import React, { useState } from "react";
import { Cog, Share2, Layout, Info } from "lucide-react";
import SocialMediaForm from "./socialMedia/socialMediaForm";
import HeroForm from "./hero/hero";
import ServicesForm from "./services/servicesForm";
import AboutUsForm from "./aboutUs/aboutUsForm";
import { GiMuscularTorso } from "react-icons/gi";
import TrainerForm from "./trainer/trainerForm";
const NavItem = ({ icon, label, isActive, onClick }) => (
  <button
    className={`flex items-center justify-between w-full px-4 py-2 rounded-lg transition-all duration-200 ${
      isActive ? "bg-primary shadow-md" : "hover:bg-hover hover:text-white"
    }`}
    onClick={onClick}
  >
    <div className="flex items-center space-x-3">
      {icon}
      <span className="font-medium">{label}</span>
    </div>
  </button>
);

export default function SettingsPage() {
  const [activeComponent, setActiveComponent] = useState("heroForm");

  const navItems = [
    { id: "heroForm", label: "Hero", icon: <Layout size={16} /> },
    {
      id: "socialMediaForm",
      label: "Social Media",
      icon: <Share2 size={16} />,
    },
    { id: "servicesForm", label: "Services", icon: <Cog size={16} /> },
    { id: "aboutUsForm", label: "About Us", icon: <Info size={16} /> },
    { id: "trainerForm", label: "trainer", icon: <GiMuscularTorso size={16} /> },
  ];

  return (
    <div className="min-h-screen">
      <div className="mx-auto p-2">
        <div className="flex flex-wrap items-start mb-4 md:flex md:justify-between">
          <h1 className="text-2xl font-bold text-secondary underline-offset-4 underline mb-4">
            Settings
          </h1>
          <nav className="flex text-sm text-secondary flex-col space-y-2 md:flex-row md:space-x-2 w-full">
            {navItems.map((item) => (
              <NavItem
                key={item.id}
                icon={item.icon}
                label={item.label}
                isActive={activeComponent === item.id}
                onClick={() => setActiveComponent(item.id)}
              />
            ))}
          </nav>
        </div>
        <div className="bg-white shadow-xl rounded-2xl overflow-hidden">
          <div>
            <main className="p-6 md:p-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                {navItems.find((item) => item.id === activeComponent)?.label}
              </h2>
              <div>
                {activeComponent === "heroForm" && <HeroForm />}
                {activeComponent === "socialMediaForm" && <SocialMediaForm />}
                {activeComponent === "servicesForm" && <ServicesForm />}
                {activeComponent === "aboutUsForm" && <AboutUsForm />}
                {activeComponent === "trainerForm" && <TrainerForm />}
              </div>
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}

import React from "react";
import { Facebook, Instagram, Twitter, Linkedin } from "lucide-react";
import { Link } from "react-router-dom";
import { FaWhatsapp, FaDumbbell } from "react-icons/fa";
import { useSelector } from "react-redux";

export default function Footer() {
  const { socialMedia } = useSelector((state) => state.settings);
  const currentYear = new Date().getFullYear();

  const quickLinks = ["Classes", "Trainers", "Schedule", "Membership"];
  const legalLinks = ["Privacy Policy", "Terms of Service"];

  return (
    <footer className="w-full bg-secondaryBackground dark:bg-darkSecondary text-gray-100 dark:text-darkText">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <FaDumbbell className="h-8 w-8 text-primary dark:text-darkPrimary" />
              <span className="text-2xl font-bold">FitLife Gym</span>
            </div>
            <p className="text-sm text-muted dark:text-darkText">
              Empowering you to reach your fitness goals and live a healthier
              life.
            </p>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((item) => (
                <li key={item}>
                  <Link
                    to={`/${item.toLowerCase()}`}
                    className="text-sm hover:text-primary dark:hover:text-darkPrimary transition-colors duration-200"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact Us</h3>
            <ul className="space-y-2 text-sm">
              <li>123 Fitness Street, Gym City, 12345</li>
              <li>Phone: (555) 123-4567</li>
              <li>Email: info@fitlifegym.com</li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
          <div className="flex space-x-4 mb-4 md:mb-0">
            {[
              { icon: Facebook, href: socialMedia?.facebook },
              { icon: Instagram, href: socialMedia?.instagram },
              { icon: Twitter, href: socialMedia?.twitter },
              { icon: Linkedin, href: socialMedia?.linkedin },
              {
                icon: FaWhatsapp,
                href: `https://wa.me/${socialMedia?.whatsApp}`,
              },
            ].map((item, index) => (
              <a
                key={index}
                href={item.href}
                aria-label={item.icon.name}
                className="text-gray-400 hover:text-primary dark:hover:text-darkPrimary transition-colors duration-200"
              >
                <item.icon className="h-6 w-6" />
              </a>
            ))}
          </div>
          <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-4">
            {legalLinks.map((item) => (
              <Link
                key={item}
                to={`/${item.toLowerCase().replace(/\s+/g, "-")}`}
                className="text-sm text-gray-400 hover:text-primary dark:hover:text-darkPrimary transition-colors duration-200"
              >
                {item}
              </Link>
            ))}
          </div>
        </div>
        <div className="mt-4 text-center text-sm text-muted dark:text-darkText">
          <p>&copy; {currentYear} FitLife Gym. All rights reserved.</p>
          <p className="mt-2">Made with ❤️ by Fadi & Hadi Kabbani</p>
        </div>
      </div>
    </footer>
  );
}

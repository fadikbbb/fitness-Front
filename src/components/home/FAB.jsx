import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, Moon, Sun } from "lucide-react";
import Flag from "react-world-flags";

const Button = ({ children, variant = "default", size = "md", className = "", ...props }) => {
  const baseClasses = "rounded-full shadow-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2";
  const variantClasses = {
    default: "bg-primary text-primary-foreground hover:bg-primary/90 focus:ring-primary",
    secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/90 focus:ring-secondary",
  };
  const sizeClasses = {
    md: "p-3",
    icon: "p-2",
  };

  return (
    <button className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`} {...props}>
      {children}
    </button>
  );
};

const Tooltip = ({ children, content }) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="relative" onMouseEnter={() => setIsVisible(true)} onMouseLeave={() => setIsVisible(false)}>
      {children}
      {isVisible && (
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-full z-50 mb-2 px-2 py-1 bg-gray-800 text-white text-sm rounded-md whitespace-nowrap">
          {content}
        </div>
      )}
    </div>
  );
};

const FloatingCircleMenu = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);
  const [currentLang, setCurrentLang] = useState({ code: "en", name: "English", flag: "GB" });
  const languageOptions = [
    { code: "sv", name: "Svenska", flag: "SE" },
    { code: "ar", name: "العربية", flag: "SD" },
    { code: "en", name: "English", flag: "GB" },
  ];

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setIsDarkMode(savedTheme === "dark");
      document.documentElement.classList.toggle("dark", savedTheme === "dark");
    }

    const savedLang = localStorage.getItem("language");
    if (savedLang) {
      const lang = JSON.parse(savedLang);
      setCurrentLang(lang);
      const translateElement = document.querySelector(".goog-te-combo");
      if (translateElement) {
        translateElement.value = lang.code;
        translateElement.dispatchEvent(new Event("change"));
      }
    }
  }, []);

  const toggleDarkMode = () => {
    const newTheme = isDarkMode ? "light" : "dark";
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
    localStorage.setItem("theme", newTheme);
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
    setShowLanguageMenu(false);
  };

  const toggleLanguageMenu = () => {
    setShowLanguageMenu(!showLanguageMenu);
  };

  const changeLanguage = (lang) => {
    const translateElement = document.querySelector(".goog-te-combo");
    if (translateElement) {
      translateElement.value = lang.code;
      translateElement.dispatchEvent(new Event("change"));
    }
    setCurrentLang(lang);
    localStorage.setItem("language", JSON.stringify(lang));
    setShowLanguageMenu(false);
  };

  const menuItems = [
    {
      icon: <MessageCircle className="h-6 w-6" />,
      label: "Profile",
      action: () => (window.location.href = "/profile"),
    },
    {
      icon: isDarkMode ? <Moon className="h-6 w-6" /> : <Sun className="h-6 w-6" />,
      label: isDarkMode ? "Dark Mode" : "Light Mode",
      action: toggleDarkMode,
    },
    {
      icon: <Flag code={currentLang.flag} className="h-6 w-6" />,
      label: "Language",
      action: toggleLanguageMenu,
    },
  ];

  const renderMenuItems = (items, radius) =>
    items.map((item, index) => {
      const angle = index * (100 / items.length) + 80;
      const x = radius * Math.cos((angle * Math.PI) / 110);
      const y = radius * Math.sin((angle * Math.PI) / 110);

      return (
        <motion.div
          key={index}
          initial={{ scale: 0, x: 0, y: 0 }}
          animate={{ scale: 1, x, y }}
          exit={{ scale: 0, x: 0, y: 0 }}
          transition={{ duration: 0.4, delay: index * 0.1 }}
          className="absolute top-0 left-0"
        >
          <Tooltip content={item.label}>
            <Button variant="secondary" size="icon" className="rounded-full shadow-lg" onClick={item.action}>
              {item.icon}
              <span className="sr-only">{item.label}</span>
            </Button>
          </Tooltip>
        </motion.div>
      );
    });

  const renderLanguageOptions = () =>
    languageOptions.map((language, index) => {
      const angle = index * (-180 / languageOptions.length) - 50;
      const x = 60 * Math.cos((angle * Math.PI) / 180) - 30;
      const y = 60 * Math.sin((angle * Math.PI) / 180) - 60;

      return (
        <motion.div
          key={`lang-${index}`}
          initial={{ scale: 0, x: 0, y: 0 }}
          animate={{ scale: 1, x, y }}
          exit={{ scale: 0, x: 0, y: 0 }}
          transition={{ duration: 0.4, delay: index * 0.1 }}
          className="absolute top-0 left-0"
        >
          <Tooltip content={language.name}>
            <Button
              variant="secondary"
              size="icon"
              className="rounded-full shadow-lg"
              onClick={() => changeLanguage(language)}
            >
              <Flag code={language.flag} style={{ width: "24px", height: "24px" }} />
              <span className="sr-only">{language.name}</span>
            </Button>
          </Tooltip>
        </motion.div>
      );
    });

  return (
    <div className="fixed container left-1/2 -translate-x-1/2 bottom-16 z-50">
      <div className="fixed z-50 bottom-0 right-5 flex justify-end">
        <div className="relative">
          <AnimatePresence>{menuOpen && renderMenuItems(menuItems, 70)}</AnimatePresence>
          <AnimatePresence>{showLanguageMenu && renderLanguageOptions()}</AnimatePresence>
          <Button
            variant="default"
            size="icon"
            className={`h-[50px] w-[50px] transition-transform ${menuOpen ? "rotate-45" : ""}`}
            onClick={toggleMenu}
            aria-expanded={menuOpen}
            aria-haspopup="true"
          >
            <span className="text-xl font-bold">+</span>
            <span className="sr-only">{menuOpen ? "Close menu" : "Open menu"}</span>
          </Button>
        </div>
        <div id="google_translate_element" className="hidden"></div>
      </div>
    </div>
  );
};

export default FloatingCircleMenu;
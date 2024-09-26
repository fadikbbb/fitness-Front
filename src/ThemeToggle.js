import React, { useState, useEffect } from "react";
import { IoMoonOutline ,IoSunnyOutline
} from "react-icons/io5";
function ThemeToggle() {
    const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

    useEffect(() => {
        if (theme === "dark") {
            document.documentElement.classList.add("dark");
            localStorage.setItem("theme", "dark");
        } else {
            document.documentElement.classList.remove("dark");
            localStorage.setItem("theme", "light");
        }
    }, [theme]);

    const toggleTheme = () => {
        setTheme(theme === "light" ? "dark" : "light");
    };

    return (
        <button
            onClick={toggleTheme}
            className=" text-white"
        >
            {theme === "light" ? <IoMoonOutline />: <IoSunnyOutline />}
        </button>
    );
}

export default ThemeToggle;

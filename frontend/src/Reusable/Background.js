import React, { useEffect } from "react";
import "./Background.css";
import { useLocalStorage } from "@uidotdev/usehooks";

// Ielikt main containerā
function Background() {
    const [theme, setTheme] = useLocalStorage("theme" ? "dark" : "light");
    return (
        <div
            className={`background-container ${
                theme === "dark" ? "dark-bg" : ""
            }`}
        ></div>
    );
}

export default Background;

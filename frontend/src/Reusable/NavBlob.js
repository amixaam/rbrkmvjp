import React from "react";
import "./NavBlob.scss";
import { useLocalStorage } from "@uidotdev/usehooks";

import OffIcon from "../images/icons/power.svg";
import MoonIcon from "../images/icons/moon.svg";
import SunIcon from "../images/icons/sun.svg";

function NavBlob() {
    const [theme, setTheme] = useLocalStorage("theme" ? "dark" : "light");

    const handleDarkMode = () => {
        const newTheme = theme === "light" ? "dark" : "light";
        setTheme(newTheme);
    };

    const handleLogOut = () => {
        sessionStorage.clear();
        window.location.reload();
        window.location.href = "/";
    };

    return (
        <nav data-theme={theme}>
            <div className="flex-button" onClick={handleLogOut}>
                <img src={OffIcon} alt="log out button" />
            </div>
            <div className="flex-button" onClick={handleDarkMode}>
                <img src={theme === "light" ? MoonIcon : SunIcon} alt="" />
            </div>
        </nav>
    );
}

export default NavBlob;

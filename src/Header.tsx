import React from "react";
import AirCallLogo from "./AirCallLogo";
import { Link } from "react-router-dom";

const Header = () => {
    return (
        <header className="sticky w-full h-16 mx-auto px-8 py-4 text-center shadow-header flex items-center justify-between">
            <AirCallLogo />
        </header>
    );
};

export default Header;

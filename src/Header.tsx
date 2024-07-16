import React from "react";
import AirCallLogo from "./AirCallLogo";

const Header = () => {
    return (
        <header className="sticky w-full h-16 mx-auto px-8 py-4 text-center shadow-header">
            <AirCallLogo />
        </header>
    );
};

export default Header;

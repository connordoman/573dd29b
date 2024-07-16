import React from "react";
import AirCallLogo from "./AirCallLogo";
import { Link } from "react-router-dom";

const Header = () => {
    return (
        <header className="sticky w-full h-16 mx-auto px-8 py-4 text-center shadow-header flex">
            <AirCallLogo />
            <Link to="calls" className="">
                Calls
            </Link>
        </header>
    );
};

export default Header;

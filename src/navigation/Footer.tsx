import { MdArchive, MdSchedule } from "react-icons/md";
import NavigationTab from "./NavigationTab";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Footer() {
    const location = useLocation();

    const [currentHighlighted, setCurrentHighlighted] = useState(location.pathname.split("/")[1]);

    useEffect(() => {
        // when the location changes, update the highlighted tab member
        setCurrentHighlighted(location.pathname.split("/")[1]);
    }, [location]);

    return (
        <footer className="min-h-16 border-t border-zinc-300 text-zinc-500 px-2 py-1 flex items-center">
            <nav className="w-full">
                <ul className="flex justify-evenly items-center">
                    <li>
                        <NavigationTab
                            icon={<MdSchedule />}
                            label="Calls"
                            to="/calls"
                            highlighted={currentHighlighted == "calls"}
                        />
                    </li>
                    <li>
                        <NavigationTab
                            icon={<MdArchive />}
                            label="Archive"
                            to="/archive"
                            highlighted={currentHighlighted == "archive"}
                        />
                    </li>
                </ul>
            </nav>
        </footer>
    );
}

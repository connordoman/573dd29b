import { Link } from "react-router-dom";
import Caption from "../typography/Caption";
import { twMerge } from "tailwind-merge";
import { motion } from "framer-motion";

interface NavigationTabProps {
    icon?: React.ReactNode;
    label: string;
    to: string;
    highlighted?: boolean;
}

export default function NavigationTab({ icon, label, to, highlighted }: NavigationTabProps) {
    return (
        <Link to={to} aria-label={`Navigation target for "${label}" to ${to}`}>
            <motion.div
                animate={{ color: highlighted ? "#2ac420" : "rgb(161 161 170)" }}
                transition={{ duration: 0.33 }}
                className={"flex flex-col justify-center items-center w-max"}>
                <span className="text-3xl leading-none">{icon}</span>
                <Caption>{label}</Caption>
            </motion.div>
        </Link>
    );
}

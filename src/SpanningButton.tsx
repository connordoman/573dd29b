import { motion } from "framer-motion";
import { twMerge } from "tailwind-merge";

interface SpanningButtonProps {
    variant?: "default" | "warning" | "danger";
    children?: React.ReactNode | string;
}

export default function SpanningButton({ variant = "default", children }: SpanningButtonProps) {
    return (
        <motion.button
            whileHover={{ backgroundColor: "rgb(228 228 231 / 0.75)" }}
            whileTap={{ backgroundColor: "rgb(228 228 231)" }}
            className={twMerge(
                "bg-zinc-200/40 px-3 py-2 rounded-md",
                variant === "danger" ? "text-red-500" : variant === "warning" ? "text-yellow-500" : "text-blue-500"
            )}>
            {children}
        </motion.button>
    );
}

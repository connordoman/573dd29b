import { motion } from "framer-motion";
import { twMerge } from "tailwind-merge";

interface SpanningButtonProps {
    variant?: "default" | "warning" | "danger";
    children?: React.ReactNode | string;
    onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
}

export default function SpanningButton({ variant = "default", children, onClick }: SpanningButtonProps) {
    return (
        <motion.button
            whileHover={{ backgroundColor: "rgb(228 228 231 / 0.75)" }}
            whileTap={{ backgroundColor: "rgb(228 228 231)" }}
            className={twMerge(
                "bg-zinc-200/40 px-3 py-2 rounded-md relative min-h-10 top-0 left-0",
                variant === "danger" ? "text-red-500" : variant === "warning" ? "text-yellow-500" : "text-blue-500"
            )}
            onClick={onClick}>
            {children}
        </motion.button>
    );
}

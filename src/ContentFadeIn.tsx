import { motion } from "framer-motion";
import { MdArrowBackIos } from "react-icons/md";
import { twMerge } from "tailwind-merge";

interface ContentFadeInProps {
    children?: React.ReactNode;
    className?: string;
    backButtonText?: string;
}

export default function ContentFadeIn({ children, className, backButtonText }: ContentFadeInProps) {
    /**
     * Return to the previous screen (probably all calls)
     */
    const handleGoBack = () => {
        window.history.back();
    };

    return (
        <motion.div
            initial={{ x: 25, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ ease: "easeInOut", duration: 0.33 }}
            className={twMerge("p-4 flex flex-col gap-4", className)}>
            <button onClick={handleGoBack} className="text-lg flex items-center">
                <MdArrowBackIos /> {backButtonText ?? "Back"}
            </button>
            {children}
        </motion.div>
    );
}

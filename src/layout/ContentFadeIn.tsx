import { motion } from "framer-motion";
import { MdArrowBackIos } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { twMerge } from "tailwind-merge";

interface ContentFadeInProps {
    children?: React.ReactNode;
    className?: string;
    backButtonText?: React.ReactNode | string;
    backButtonPath?: string;
}

export default function ContentFadeIn({ children, className, backButtonText, backButtonPath }: ContentFadeInProps) {
    const navigate = useNavigate();
    /**
     * Return to the previous screen (probably all calls)
     */
    const handleGoBack = () => {
        if (backButtonPath) {
            return navigate(backButtonPath);
        }
        // go back, like `window.history.back()`
        navigate(-1);
    };

    return (
        <motion.div
            initial={{ x: 25, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ ease: "easeInOut", duration: 0.33 }}
            className={twMerge("p-4 flex flex-col gap-4 flex-grow", className)}>
            <button
                aria-label="Go back to previous page"
                onClick={handleGoBack}
                className="text-lg flex items-start w-min relative">
                <MdArrowBackIos /> {backButtonText ?? "Back"}
            </button>
            {children}
        </motion.div>
    );
}

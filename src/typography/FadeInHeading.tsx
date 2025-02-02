import { motion } from "framer-motion";

interface FadeInHeadingProps {
    children?: React.ReactNode | string;
}

export default function FadeInHeading({ children }: FadeInHeadingProps) {
    return (
        <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.33 }}
            className="text-3xl font-bold">
            {children}
        </motion.h1>
    );
}

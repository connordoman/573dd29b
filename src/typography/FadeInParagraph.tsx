import { motion } from "framer-motion";

interface FadeInParagraphProps {
    children?: React.ReactNode | string;
    className?: string;
}

export default function FadeInParagraph({ children, className }: FadeInParagraphProps) {
    return (
        <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.33 }}
            className={className}>
            {children}
        </motion.p>
    );
}

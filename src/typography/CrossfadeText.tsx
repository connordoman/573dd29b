import { AnimatePresence, motion } from "framer-motion";
import { twMerge } from "tailwind-merge";

// Animation rules for the text's transition
const textVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
};

interface CrossfadeTextProps {
    whenTrue: string;
    whenFalse: string;
    value: boolean;
    className?: string;
}

export default function CrossfadeText({ whenTrue, whenFalse, value, className }: CrossfadeTextProps) {
    return (
        <div className={twMerge("relative min-w-max", className)}>
            <AnimatePresence>
                {value ? (
                    <motion.span
                        key={whenTrue}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        variants={textVariants}
                        transition={{ duration: 0.5 }}
                        // className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-fit">
                        className="absolute w-fit leading-none">
                        {whenTrue}
                    </motion.span>
                ) : (
                    <motion.span
                        key={whenFalse}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        variants={textVariants}
                        transition={{ duration: 0.5 }}
                        className="absolute w-fit leading-none">
                        {whenFalse}
                    </motion.span>
                )}
            </AnimatePresence>
        </div>
    );
}

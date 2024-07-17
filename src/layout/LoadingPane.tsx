import { motion } from "framer-motion";
import { MdLoop } from "react-icons/md";

export default function LoadingPane() {
    return (
        <div className="fixed top-0 left-0 w-screen h-screen bg-zinc-800/75 z-[100] flex items-center justify-center">
            <motion.span
                initial={{ rotate: "0deg" }}
                animate={{ rotate: "-360deg" }}
                transition={{ repeat: Infinity, ease: "linear", duration: 1.5 }}>
                <MdLoop className="text-4xl text-white drop-shadow-lg" />
            </motion.span>
        </div>
    );
}

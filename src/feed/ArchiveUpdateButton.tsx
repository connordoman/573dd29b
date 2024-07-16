import { AnimatePresence, motion } from "framer-motion";
import SpanningButton from "../SpanningButton";
import { archiveCall, Call, unarchiveCall } from "../api";
import { useState, useEffect } from "react";

interface ArchiveUpdateButtonProps {
    call: Call;
    onChange?: (isArchived: boolean) => void;
}

export default function ArchiveUpdateButton({ call, onChange }: ArchiveUpdateButtonProps) {
    const [isArchived, setIsArchived] = useState(false);

    /**
     * If the call prop changes, that should override the state of the buttons.
     */
    useEffect(() => {
        if (call) setIsArchived(call.is_archived);
    }, [call]);

    useEffect(() => {
        if (onChange) {
            onChange(isArchived);
        }
    }, [isArchived]);

    /**
     * Click handler for setting the call to `archived`
     */
    const handleArchive = async () => {
        const result = await archiveCall(call.id);
        if (result) {
            setIsArchived(!isArchived);
        }
    };

    /**
     * Click handler for setting the call to `unarchived`
     */
    const handleUnarchive = async () => {
        const result = await unarchiveCall(call.id);
        if (result) {
            setIsArchived(!isArchived);
        }
    };

    // Animation rules for the text's transition
    const textVariants = {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
    };

    return (
        <SpanningButton
            key={isArchived ? "archived" : "not-archived"}
            onClick={isArchived ? handleUnarchive : handleArchive}>
            <AnimatePresence>
                {isArchived ? (
                    <motion.div
                        key="archived"
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        variants={textVariants}
                        transition={{ duration: 0.5 }}
                        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                        <span>Unarchive</span>
                    </motion.div>
                ) : (
                    <motion.div
                        key="unarchived"
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        variants={textVariants}
                        transition={{ duration: 0.5 }}
                        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                        <span>Archive</span>
                    </motion.div>
                )}
            </AnimatePresence>
        </SpanningButton>
    );
}

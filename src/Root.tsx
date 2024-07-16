import { motion } from "framer-motion";
import Header from "./Header";
import Container from "./Container";

export default function Root() {
    return (
        <Container>
            <Header />
            <motion.div
                className="container-view"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ ease: "easeOut", duration: 0.33 }}>
                Some activities should be here etcetera. Check one, two.
            </motion.div>
            <a href="/feed">Feed</a>
        </Container>
    );
}

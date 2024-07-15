import { motion } from "framer-motion";

import Header from "./Header";

const App = () => {
    return (
        <div className="container">
            <Header />
            <motion.div
                className="container-view"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ ease: "easeOut", duration: 0.33 }}>
                Some activities should be here etcetera. Check one, two.
            </motion.div>
        </div>
    );
};

export default App;

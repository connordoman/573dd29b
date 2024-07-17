import Header from "./navigation/Header";
import Container from "./layout/Container";
import { Outlet, useLocation } from "react-router-dom";
import Footer from "./navigation/Footer";
import WelcomeScreen from "./WelcomeScreen";

export default function Root() {
    const location = useLocation();
    return (
        <Container>
            <Header />
            {location.pathname === "/" ? <WelcomeScreen /> : <Outlet />}
            <Footer />
        </Container>
    );
}

import Header from "./Header";
import Container from "./Container";
import { Outlet } from "react-router-dom";
import Footer from "./navigation/Footer";

export default function Root() {
    return (
        <Container>
            <Header />
            <Outlet />
            <Footer />
        </Container>
    );
}

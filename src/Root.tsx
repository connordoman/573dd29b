import Header from "./navigation/Header";
import Container from "./layout/Container";
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

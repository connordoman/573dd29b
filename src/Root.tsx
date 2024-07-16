import Header from "./Header";
import Container from "./Container";
import { Outlet } from "react-router-dom";

export default function Root() {
    return (
        <Container>
            <Header />
            <Outlet />
        </Container>
    );
}

import Header from "./Header";
import Container from "./Container";
import { Outlet } from "react-router-dom";
import { getAllCalls } from "./api";

export default function Root() {
    return (
        <Container>
            <Header />
            <Outlet />
        </Container>
    );
}

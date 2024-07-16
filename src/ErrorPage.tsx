import { useRouteError } from "react-router-dom";
import Container from "./Container";

export default function ErrorPage() {
    const error: any = useRouteError();
    console.error(error);

    return (
        <Container>
            <h1>Sorry!</h1>
            <p>An unexpected error has occurred.</p>
            <p>{error.statusText ?? error.message}</p>
        </Container>
    );
}

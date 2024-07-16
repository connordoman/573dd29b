import { useRouteError } from "react-router-dom";
import ContentFadeIn from "./ContentFadeIn";
import Container from "./Container";

export default function ErrorPage() {
    const error: any = useRouteError();
    console.error(error);

    return (
        <Container>
            <ContentFadeIn>
                <h1 className="text-2xl font-bold">Sorry!</h1>
                <p>An unexpected error occurred:</p>
                <p className="italic">{error.statusText ?? error.message}</p>
            </ContentFadeIn>
        </Container>
    );
}

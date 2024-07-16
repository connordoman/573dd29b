import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
    const error: any = useRouteError();
    console.error(error);

    return (
        <div>
            <h1>Sorry!</h1>
            <p>An unexpected error has occurred.</p>
            <p>{error.statusText ?? error.message}</p>
        </div>
    );
}

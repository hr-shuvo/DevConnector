import {Link, useRouteError} from "react-router-dom";

const Error = () => {
    const error = useRouteError();
    console.log(error);

    return (
        <div>
            <h1>Error Page</h1>

            <p>Page not found</p>

            <Link to={'/'}>Home</Link>
        </div>
    );

}

export default Error;
import {Link, useRouteError} from "react-router-dom";
import Wrapper from "../assets/wrappers/ErrorPage";
import img from '../assets/images/not-found.svg';

const Error = () => {
    const error = useRouteError();

    if(error.status === 404) {
        return (
            <Wrapper>
                <div>
                    <img src={img} alt='not found'/>
                    <h1>Ohh! page not found</h1>

                    <p>we can't seem to find the page you are looking for</p>

                    <Link to={'/dashboard'}>back to home</Link>
                </div>


            </Wrapper>
        );
    }

    return (
        <div>
            <h1>Error Page</h1>

            <p>Page not found</p>

            <Link to={'/'}>Home</Link>
        </div>
    );

}

export default Error;
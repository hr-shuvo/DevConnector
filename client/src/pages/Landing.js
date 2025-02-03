import Wrapper from "../assets/wrappers/LandingPage";
import logo from "../assets/images/logo.svg";
import {Link} from "react-router-dom";


const Landing = () => {
    return (
        <Wrapper>
            <nav>
                <img src={logo} alt="logo" className={'logo'}/>
            </nav>

            <div className={'container page'}>
                <div className={'info'}>
                    <h1>job <span>tracking</span> app</h1>

                    <p>
                        Synth food truck hell of cold-pressed offal kale chips, everyday carry quinoa. Retro yes plz
                        jianbing, four dollar toast vape vibecession gorpcore. Adaptogen sustainable ennui flannel
                        direct trade lomo, +1 humblebrag marxism Brooklyn ethical. Tonx pickled thundercats, listicle
                        direct trade iPhone heirloom williamsburg messenger bag before they sold out tattooed. Yuccie
                        adaptogen man bun cupping, semiotics air plant activated charcoal chambray ethical. Palo santo
                        thundercats franzen neutral milk hotel.
                    </p>

                    <Link to={'/register'} className='btn register-link'>Register</Link>

                    <Link to={'/login'} className='btn register-link'>Login / Demo User</Link>
                </div>

            </div>
        </Wrapper>
    )


};


export default Landing;
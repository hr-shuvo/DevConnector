import {Link} from "react-router-dom";
import Wrapper from "../assets/wrappers/RegisterAndLoginPage";
import {FormRow, Logo} from "../components";

const Register = () => {
    return (
        <Wrapper>
            <form className='form'>
                <Logo />
                <h4>Sign Up</h4>

                <FormRow type='text' name='name' placeholder='first name' required={true}/>
                <FormRow type='text' name='last Name' placeholder='last name'/>
                <FormRow type='text' name='location' placeholder='earth'/>
                <FormRow type='text' name='email' placeholder='email@example.com'/>
                <FormRow type='password' name='password' placeholder='******'/>

                <button type='submit' className='btn btn-block'>submit</button>
                <p>Already have an account? <Link to='/login'>Login</Link></p>



            </form>
        </Wrapper>
    )

}

export default Register;
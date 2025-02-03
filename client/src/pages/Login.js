import Wrapper from "../assets/wrappers/RegisterAndLoginPage";
import {FormRow, Logo} from "../components";

const Login = () => {
    return (
        <Wrapper>
            <form className='form'>
                <Logo/>
                <h4>Sign In</h4>

                <FormRow type={'email'} name='email' placeholder='email@example.com'/>
                <FormRow type={'password'} name='password' placeholder='******'/>

                <button type='submit' className={'btn btn-block'}>Sign In</button>

                <p className='text-center'>Don't have an account? <a href='/register'>Sign Up</a></p>

            </form>
        </Wrapper>
    )

}

export default Login;
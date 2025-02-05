import Wrapper from "../assets/wrappers/RegisterAndLoginPage";
import {FormRow, Logo} from "../components";
import customFetch from "../utils/customFetch";
import {toast} from "react-toastify";
import {Form, redirect, useNavigation} from "react-router-dom";


export const action = async ({request}) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);

    try {
        const response =await customFetch.post('/auth/login', data);
        toast.success(response?.data?.msg)

        return redirect('/dashboard');
    } catch (err) {
        toast.error(err?.response?.data?.msg);
        return err;
    }
}

const Login = () => {
    const navigation = useNavigation();
    const isSubmitting = navigation.state === 'submitting';

    return (
        <Wrapper>
            <Form className='form' method='post'>
                <Logo/>
                <h4>Sign In</h4>

                <FormRow type={'email'} name='email' placeholder='email@example.com' defaultValue={'test@email.com'}/>
                <FormRow type={'password'} name='password' placeholder='******' defaultValue={'123456'}/>

                <button type='submit' className={'btn btn-block'}>
                    {isSubmitting ? 'Submitting...' : 'Sign In'}
                </button>

                <p className='text-center'>Don't have an account? <a href='/register'>Sign Up</a></p>

            </Form>
        </Wrapper>
    )

}

export default Login;
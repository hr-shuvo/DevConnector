import {Form, Link, redirect, useNavigation} from "react-router-dom";
import Wrapper from "../assets/wrappers/RegisterAndLoginPage";
import {FormRow, Logo} from "../components";
import customFetch from "../utils/customFetch";
import {toast} from "react-toastify";


export const action = async ({request}) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);

    try {
        await customFetch.post('/auth/register', data);
        toast.success('Account created successfully');

        return redirect('/login');
    } catch (err) {
        toast.error(err?.response?.data?.msg);
        console.log(err);
        return err;
    }
}

const Register = () => {
    const navigation = useNavigation();
    // console.log(navigation);

    const isSubmitting = navigation.state === 'submitting';

    return (
        <Wrapper>
            <Form className='form' method='post'>
                <Logo/>
                <h4>Sign Up</h4>

                <FormRow type='text' name='name' placeholder='first name' defaultValue='first name' required={true}/>
                <FormRow type='text' name='lastName' placeholder='last name' defaultValue='last name'/>
                <FormRow type='text' name='location' placeholder='earth' defaultValue='earth'/>
                <FormRow type='text' name='email' placeholder='email@example.com' defaultValue='email@example.com'/>
                <FormRow type='password' name='password' placeholder='******' defaultValue='123456'/>

                <button type='submit' className='btn btn-block' disabled={isSubmitting}>
                    {isSubmitting ? 'Submitting...' : 'Sign Up'}
                </button>
                <p>Already have an account? <Link to='/login'>Login</Link></p>


            </Form>
        </Wrapper>
    )

}

export default Register;
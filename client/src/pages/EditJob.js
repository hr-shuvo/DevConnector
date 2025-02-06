import {Form, redirect, useLoaderData, useNavigate, useNavigation, useParams} from "react-router-dom";
import customFetch from "../utils/customFetch";
import {toast} from "react-toastify";
import Wrapper from "../assets/wrappers/DashboardFormPage";
import {FormRow, FormRowSelect} from "../components";
import {JOB_STATUS, JOB_TYPE} from "../utils/constants";


export const loader = async ({params}) => {
    try {
        const {data} = await customFetch.get('/jobs/' + params.id);

        return data;
    } catch (err) {
        toast.error(err?.response?.data?.msg);
        return redirect('../all-jobs');
    }
}

export const action = async ({request, params}) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);

    console.log(data)


    try{
        const response = await customFetch.put(`/jobs/${params.id}`, data);

        toast.success(response.data.msg);
        return redirect('../all-jobs')
    }catch(err){
        toast.error(err?.response?.data?.msg);
        return err;
    }
}

const EditJob = () => {
    const {job} = useLoaderData();
    const navigation = useNavigation();
    const isSubmitting = navigation.state === 'submitting';

    return (
        <Wrapper>
            <Form method='post' className='form'>
                <h4 className='form-title'>edit job</h4>
                <div className='form-center'>
                    <FormRow type='text' name='position' defaultValue={job.position}/>
                    <FormRow type='text' name='company' defaultValue={job.company}/>
                    <FormRow type='text' name='jobLocation' labelText='job location' defaultValue={job.jobLocation}/>

                    <FormRowSelect name='jobStatus' labelText='job status' defaultValue={job.jobStatus}
                                   list={Object.values(JOB_STATUS)}/>
                    <FormRowSelect name='jobType' labelText='job type' defaultValue={job.jobType}
                                   list={Object.values(JOB_TYPE)}/>

                    <button type='submit'
                            className='btn btn-block form-btn'>{isSubmitting ? 'submitting' : 'submit'}</button>

                </div>
            </Form>


        </Wrapper>
    )


}

export default EditJob;
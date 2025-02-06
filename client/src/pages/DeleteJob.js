import {toast} from "react-toastify";
import customFetch from "../utils/customFetch";
import {redirect} from "react-router-dom";

export const action = async ({params}) =>{
    try{
        const response = await customFetch.delete(`jobs/${params.id}`);

        toast.warn(response.data.msg);
        return redirect('../all-jobs');
    }
    catch(err){
        toast.error(err.response.data.msg);
        return err;
    }

    return null;
}

const DeleteJob = () => {

    return <h1>Delete Job</h1>

}

export default DeleteJob;
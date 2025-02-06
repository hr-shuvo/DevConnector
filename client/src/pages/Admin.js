import customFetch from "../utils/customFetch";
import {toast} from "react-toastify";
import {redirect, useLoaderData} from "react-router-dom";
import Wrapper from "../assets/wrappers/StatsContainer";

export const loader = async () =>{
    try{
        const response = await customFetch.get('/users/admin/app-status');

        return response.data;
    }
    catch (err){
        toast.error(err?.response?.data.msg || 'Unauthorized');
        return redirect('/dashboard');
    }
}
const Admin = () => {
    const {users, jobs} = useLoaderData();
    return (
        <Wrapper>
            <h1>Admin Page</h1>
            <p>Total Users: {users}</p>

        </Wrapper>
    );
  
}

export default Admin;
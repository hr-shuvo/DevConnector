import customFetch from "../utils/customFetch";
import {toast} from "react-toastify";
import {useLoaderData} from "react-router-dom";
import {JobsContainer, SearchContainer} from "../components";
import {createContext, useContext} from "react";

export const loader = async () => {
    try {
        const {data} = await customFetch.get('/jobs');
        console.log(data)
        return {data};

    } catch (err) {
        toast.error(err?.response?.data?.msg);
        return err;
    }
};

const AllJobContext = createContext();

const AllJobs = () => {
    const {data} = useLoaderData();

    return (
        <AllJobContext.Provider value={{data}}>
            <SearchContainer/>
            <JobsContainer/>
        </AllJobContext.Provider>
    )
}

export const useAllJobsContext = () => useContext(AllJobContext);
export default AllJobs;
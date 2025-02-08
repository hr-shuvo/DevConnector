import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";
import { useLoaderData } from "react-router-dom";
import { JobsContainer, SearchContainer } from "../components";
import { createContext, useContext } from "react";

export const loader = async ({request}) => {
    console.log(request.url)

    const params = Object.fromEntries([
        ...new URL(request.url).searchParams.entries()

    ]);

    try {
        const {data} = await customFetch.get('/jobs', {
            params
        });
        return {data, searchValues: {...params}};

    } catch(err) {
        toast.error(err?.response?.data?.msg);
        return err;
    }
};

const AllJobContext = createContext();

const AllJobs = () => {
    const {data, searchValues} = useLoaderData();

    return (
        <AllJobContext.Provider value={{data, searchValues}}>
            <SearchContainer/>
            <JobsContainer/>
        </AllJobContext.Provider>
    )
}

export const useAllJobsContext = () => useContext(AllJobContext);
export default AllJobs;
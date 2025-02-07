import customFetch from "../utils/customFetch";
import { useLoaderData } from "react-router-dom";
import { ChartsContainer, StatsContainer } from "../components";

export const loader = async () => {

    try {
        const response = await customFetch.get('/jobs/stats');


        return response.data;
    } catch(err) {
        return err;
    }
}


const Stats = () => {
    const {defaultStats, monthlyApplications} = useLoaderData();

    console.log(monthlyApplications.length)

    return (
        <>
            <StatsContainer defaultStatus={defaultStats}/>

            {
                monthlyApplications?.length > 0 &&
                <ChartsContainer data={monthlyApplications}/>

            }
        </>
    );

}

export default Stats;
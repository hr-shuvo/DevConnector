import {Outlet, redirect, useLoaderData, useNavigate} from "react-router-dom";
import {BigSidebar, NavBar, SmallSidebar} from "../components";
import Wrapper from "../assets/wrappers/Dashboard";
import {createContext, useContext, useState} from "react";
import {checkDefaultTheme} from "../App";
import customFetch from "../utils/customFetch";
import {toast} from "react-toastify";

export const loader = async () => {
    try {
        const {data} = await customFetch.get('/users/current-user');
        if (!data) return redirect('/login');
        return data;
    } catch (error) {
        return redirect('/');
    }
}

const DashboardContext = createContext();

const DashboardLayout = () => {
    const user = useLoaderData();
    const navigate = useNavigate();

    const [showSidebar, setShowSidebar] = useState(false);
    const [isDarkTheme, setIsDarkTheme] = useState(checkDefaultTheme());

    const toggleDarkTheme = () => {
        const newDarkTheme = !isDarkTheme;
        setIsDarkTheme(newDarkTheme);
        document.body.classList.toggle('dark-theme', newDarkTheme);
        localStorage.setItem('dark-theme', JSON.stringify(newDarkTheme));
    }

    const toggleSidebar = () => {
        // console.log('toggle sidebar');
        setShowSidebar(!showSidebar);
    }

    const logoutUser = async () => {
        navigate('/');
        await customFetch.get('/auth/logout');
        toast.success('Logged out successfully');
    };

    return (
        <DashboardContext.Provider value={{user, showSidebar, isDarkTheme, toggleDarkTheme, toggleSidebar, logoutUser}}>
            <Wrapper>
                <main className='dashboard'>
                    <SmallSidebar/>
                    <BigSidebar/>

                    <div>
                        <NavBar/>
                        <div className='dashboard-page'>
                            <Outlet context={{user}}/>
                        </div>
                    </div>
                </main>


            </Wrapper>

        </DashboardContext.Provider>)
}

export const useDashboardContext = () => {
    return useContext(DashboardContext);
}
export default DashboardLayout;
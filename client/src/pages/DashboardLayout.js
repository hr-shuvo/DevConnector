import {Outlet} from "react-router-dom";
import {BigSidebar, NavBar, SmallSidebar} from "../components";
import Wrapper from "../assets/wrappers/Dashboard";
import {createContext, useContext, useState} from "react";

const DashboardContext = createContext();

const DashboardLayout = () => {
    // temp
    const user = {
        name: 'John Doe', role: 'Admin'
    };

    const [showSidebar, setShowSidebar] = useState(false);
    const [isDarkTheme, setIsDarkTheme] = useState(false);

    const toggleDarkTheme = () => {
        console.log('toggle dark theme');
        setIsDarkTheme(!isDarkTheme);
    }

    const toggleSidebar = () => {
        console.log('toggle sidebar');
        setShowSidebar(!showSidebar);
    }

    const logoutUser = async () => {
        console.log('logout user');
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
                            <Outlet/>
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
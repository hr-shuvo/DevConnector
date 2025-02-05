import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {
    HomeLayout,
    Landing,
    Register,
    Login,
    DashboardLayout,
    Error,
    AddJob,
    Stats,
    AllJobs,
    Profile,
    Admin
} from "./pages";

import {action as RegisterAction} from "./pages/Register";

export const checkDefaultTheme = () => {
    const isDarkTheme = JSON.parse(localStorage.getItem('dark-theme'));

    if (isDarkTheme) {
        document.body.classList.toggle('dark-theme', isDarkTheme);
    }

    return isDarkTheme;
};

checkDefaultTheme();


const router = createBrowserRouter([
    {
        path: '/',
        element: <HomeLayout/>,
        errorElement: <Error/>,
        children: [
            {
                index: true,
                element: <Landing/>
            },
            {
                path: 'register',
                element: <Register/>,
                action: RegisterAction
            },
            {
                path: 'login',
                element: <Login/>
            },
            {
                path: 'dashboard',
                element: <DashboardLayout/>,
                children: [
                    {
                        index: true,
                        element: <AddJob/>
                    },
                    {
                        path: 'stats',
                        element: <Stats/>
                    },
                    {
                        path: 'all-jobs',
                        element: <AllJobs/>
                    },
                    {
                        path: 'profile',
                        element: <Profile/>
                    },
                    {
                        path: 'admin',
                        element: <Admin/>
                    }
                ]
            }

        ]
    },
    {
        path: '/',
        element: <HomeLayout/>
    }
])

const App = () => {
    return <RouterProvider router={router}/>
}


export default App;
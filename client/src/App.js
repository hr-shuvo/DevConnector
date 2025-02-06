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
    Admin, EditJob, DeleteJob
} from "./pages";

import {action as RegisterAction} from "./pages/Register";
import {action as LoginAction} from "./pages/Login";
import {loader as dashboardLoader} from "./pages/DashboardLayout";
import {action as addJobAction} from "./pages/AddJob";
import {loader as allJobsLoader} from "./pages/AllJobs";
import {loader as editJobLoader} from "./pages/EditJob";
import {action as editJobAction} from "./pages/EditJob";
import {action as DeleteJobAction} from "./pages/DeleteJob";
import {loader as adminLoader} from "./pages/Admin";
import {action as ProfileAction} from "./pages/Profile";



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
                element: <Login/>,
                action: LoginAction
            },
            {
                path: 'dashboard',
                element: <DashboardLayout/>,
                loader: dashboardLoader,
                children: [
                    {
                        index: true,
                        element: <AddJob/>,
                        action: addJobAction
                    },
                    {
                        path: 'stats',
                        element: <Stats/>
                    },
                    {
                        path: 'all-jobs',
                        element: <AllJobs/>,
                        loader: allJobsLoader
                    },
                    {
                        path: 'edit-job/:id',
                        element: <EditJob/>,
                        loader: editJobLoader,
                        action: editJobAction
                    },
                    {
                        path: 'delete-job/:id',
                        action: DeleteJobAction
                    },
                    {
                        path: 'profile',
                        element: <Profile/>,
                        action: ProfileAction
                    },
                    {
                        path: 'admin',
                        element: <Admin/>,
                        loader: adminLoader
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
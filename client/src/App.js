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

const checkDefaultTheme = () => {
    const isDarkTheme = JSON.parse(localStorage.getItem('dark-theme'));
    
    if (isDarkTheme) {
        document.body.classList.toggle('dark-theme', isDarkTheme);
    }

    return isDarkTheme;
};

const isDarkTheme = checkDefaultTheme();


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
                element: <Register/>
            },
            {
                path: 'login',
                element: <Login/>
            },
            {
                path: 'dashboard',
                element: <DashboardLayout isDarkThemeEnabled={isDarkTheme}/>,
                children:[
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
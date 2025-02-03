import {createBrowserRouter, RouterProvider} from "react-router-dom";

const router = createBrowserRouter([
    {
        path: '/',
        element: <h1>Home</h1>
    },
    {
        path: '/about',
        element: <h1>About</h1>
    }
])

const App = () => {
    return     <RouterProvider router={router}/>
}


export default App;
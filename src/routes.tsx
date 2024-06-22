import {ReactElement} from "react";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import FileExplorer from "./pages/FileExplores/FileExplorer.tsx";

const Routes = (): ReactElement => {

    const router = createBrowserRouter([
        {
            path: '/',
            element:<FileExplorer/>
        }
    ])

    return(
        <RouterProvider router={router} />
    )
}

export default Routes;
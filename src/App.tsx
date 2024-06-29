import {FileExplorer} from "./pages/FileExplores/FileExplorer.tsx";
import {createBrowserRouter} from "react-router-dom";
import {NotFound} from "./pages/NotFound/NotFound.tsx";
import {NavigationProvider} from "@/providers/FileNavigationProvider.tsx";

const router = createBrowserRouter([
    {
        path: '/',
        element:
            <NavigationProvider>
                <FileExplorer/>
            </NavigationProvider>
    },
    {
        path: '*',
        element: <NotFound/>
    }
])

export {router}

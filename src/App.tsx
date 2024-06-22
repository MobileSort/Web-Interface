import { FileExplorer } from "./pages/FileExplores/FileExplorer.tsx";
import Routes from "./routes.tsx";
import { createBrowserRouter } from "react-router-dom";
import { NotFound } from "./pages/NotFound/index.tsx";

const router = createBrowserRouter([
  {
    path: '/',
    element: <FileExplorer/>
  },
  {
    path: '*',
    element: <NotFound/>
  }
])

export {router}

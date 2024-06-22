import { Link } from "react-router-dom";
import { Search } from "../../components/Search";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";


export function FileExplorer(){

    const queryClient = new QueryClient();

    return(
        <QueryClientProvider client={queryClient}>
            <Search/>
        </QueryClientProvider>     
    )
}
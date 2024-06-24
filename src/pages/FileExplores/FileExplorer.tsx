import { Search } from "../../components/Search";
import {useQuery} from "@tanstack/react-query";
import axios from "axios";
import {AndroidDirectoryModel} from "../../utils/models/AndroidDirectory.model.ts";
import DirectoryElement from "../../components/DirectoryElement/DirectoryElement.tsx";
import {useEffect} from "react";

export function FileExplorer(){

    const fetchDirectories = (): Promise<AndroidDirectoryModel> => {
        return axios
            .post('http://localhost:5033/api/Directory/ListDirectory',
                {"path": "/"}
            )
            .then((res) => res.data as AndroidDirectoryModel)
    }

    const { isLoading, error, data: androidDirectory, isFetching } = useQuery({
        queryKey: ['directories'],
        queryFn: () => fetchDirectories(),
    })


    return(
        <>
            <Search/>
            {isLoading ? "...Loading" :
                androidDirectory &&
                androidDirectory.directories.map((dir) => <DirectoryElement directory={dir}/>)
            }
        </>
    )
}

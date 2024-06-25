import {Dispatch, SetStateAction, useEffect} from "react";
import {DirectoryModel} from "@/utils/models/Directory.model.ts";
import axios from "axios";
import {useQuery} from "@tanstack/react-query";
import DirectoryElement from "@/components/DirectoryElement/DirectoryElement.tsx";
import {useNavigation} from "@/providers/FileNavigationProvider.tsx";
import { IoMdFolderOpen } from "react-icons/io";

interface Props {
    path: string,
    setPath: Dispatch<SetStateAction<string>>
    searchTerm: string,
}

const FilesListing = ({path, setPath, searchTerm}: Props) => {
    const {actions} = useNavigation();

    const fetchDirectories = (): Promise<DirectoryModel> => {
        return axios
            .post('http://localhost:5033/api/Directory/ListDirectory',
                {
                    "path": path,
                    "searchTerm": searchTerm
                }
            )
            .then((res) => res.data as DirectoryModel)
    }

    const {isLoading, data: androidDirectory, refetch} = useQuery({
        queryKey: ['directories', searchTerm],
        queryFn: () => fetchDirectories(),
    })

    useEffect(() => {
        refetch();
    }, [path, searchTerm]);

    return (
        <>
            {isLoading ? "...Loading" :
                androidDirectory &&
                androidDirectory.files?.map((dir) =>
                    <div className="text-white flex gap-3 justify-between items-center bg-slate-900 rounded-md px-3 py-4 cursor-pointer">
                        <IoMdFolderOpen size={30}/>
                    <DirectoryElement
                        directory={dir}
                        onClick={() => {
                            setPath(dir.path)
                            actions.add(dir.path);
                        }}
                    />
                    </div>
                )
            }  
        </>
        
    )
}

export default FilesListing;

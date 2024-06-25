import {Dispatch, SetStateAction, useEffect} from "react";
import {DirectoryModel} from "@/utils/models/Directory.model.ts";
import axios from "axios";
import {useQuery} from "@tanstack/react-query";
import DirectoryElement from "@/components/DirectoryElement/DirectoryElement.tsx";
import {useNavigation} from "@/providers/FileNavigationProvider.tsx";

interface Props {
    path: string,
    setPath: Dispatch<SetStateAction<string>>
}

const FilesListing = ({path, setPath}: Props) => {
    const {actions} = useNavigation();

    const fetchDirectories = (): Promise<DirectoryModel> => {
        return axios
            .post('http://localhost:5033/api/Directory/ListDirectory',
                {"path": path}
            )
            .then((res) => res.data as DirectoryModel)
    }

    const {isLoading, data: androidDirectory, refetch} = useQuery({
        queryKey: ['directories'],
        queryFn: () => fetchDirectories(),
    })

    useEffect(() => {
        refetch();
    }, [path]);

    return (
        <>
            {isLoading ? "...Loading" :
                androidDirectory &&
                androidDirectory.files?.map((dir) =>
                    <div className="text-white gap-4 flex flex-col justify-center items-center bg-slate-900 rounded-md px-4 py-4 cursor-pointer">
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

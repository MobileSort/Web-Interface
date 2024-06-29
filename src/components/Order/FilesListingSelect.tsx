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

const FilesListingSelect = ({path, setPath}: Props) => {
    const {selecting} = useNavigation();
    const {actionsSelecting} = selecting
    const fetchDirectories = (): Promise<DirectoryModel> => {
        return axios
            .post('http://localhost:5033/api/Directory/ListDirectory',
                {
                    "path": path
                }
            )
            .then((res) => res.data as DirectoryModel)
    }

    const {isLoading, data: androidDirectory, refetch} = useQuery({
        queryKey: ['selecting-directories'],
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
                    <DirectoryElement
                        onDelete={() => refetch()}
                        directory={dir}
                        onClick={() => {
                            setPath(dir.path)
                            actionsSelecting.add(dir.path);
                        }}
                    />
                )
            }
        </>

    )
}

export default FilesListingSelect;

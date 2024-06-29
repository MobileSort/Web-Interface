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
    const {listing} = useNavigation();
    const {actionsListing} = listing
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
        queryKey: ['listing-directories'],
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
                            actionsListing.add(dir.path);
                        }}
                    />
                )
            }
        </>

    )
}

export default FilesListing;

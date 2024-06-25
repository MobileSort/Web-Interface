import { Search } from "@/components/Search/Search";
import {useEffect, useState} from "react";
import DialogCreateDirectoryItem from "@/components/Dialog/DialogCreateDirectoryItem.tsx";
import FilesListing from "@/components/FileExplorer/FilesListing.tsx";
import {useNavigation} from "@/providers/FileNavigationProvider.tsx";
import {Button} from "@/components/ui/button.tsx";

export function FileExplorer() {
    const {actions, history} = useNavigation();

    const [selectedDirectory, setSelectedDirectory] = useState<string>("/");

    useEffect(() => {
        actions.setAs("/")
    }, []);


    return (
        <>
            <Search/>
            <div className="flex flex-col items-center">
            <DialogCreateDirectoryItem/>
            {history.length >= 2 &&
                <Button className="mb-2" title={"<- Go Back"} onClick={() => {
                    const directoryLastIndex = actions.pop().slice(-1);
                    setSelectedDirectory(directoryLastIndex[0]);
                }}>&lt;- Go Back</Button>
            }
            </div>
            <div className=" text-white gap-2 flex flex-col items-center justify-between">
                <FilesListing path={selectedDirectory} setPath={setSelectedDirectory}/>
            </div>
        </>
    )
}

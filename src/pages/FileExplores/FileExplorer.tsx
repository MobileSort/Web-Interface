import {Search} from "@/components/Search";
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
            <div>
            <Search/>
            <DialogCreateDirectoryItem/>
            </div>
            {history.length >= 2 &&
                <Button  title={"<- Go Back"} onClick={() => {
                    const directoryLastIndex = actions.pop().slice(-1);
                    setSelectedDirectory(directoryLastIndex[0]);
                }}>&lt;- Go Back</Button>
            }
            <FilesListing path={selectedDirectory} setPath={setSelectedDirectory}/>
        </>
    )
}

import {useEffect, useState} from "react";
import DialogCreateDirectoryItem from "@/components/Dialog/DialogCreateDirectoryItem.tsx";
import FilesListing from "@/components/FileExplorer/FilesListing.tsx";
import {useNavigation} from "@/providers/FileNavigationProvider.tsx";
import {Button} from "@/components/ui/button.tsx";
import Search from "@/components/Search/Search";
import {DirectoryModel} from "@/utils/models/Directory.model";
import {Tag} from "@/components/Tag/Tag.tsx";
import {Order} from "@/components/Order/Order.tsx";
import DialogOrdering from "@/components/Dialog/DialogOrdering.tsx";

export function FileExplorer() {
    const { listing} = useNavigation();
    const { actionsListing, historyListing } = listing
    const [selectedDirectory, setSelectedDirectory] = useState<string>("/");

    useEffect(() => {
        reload()
    }, []);

    const handleSearch = (term: DirectoryModel) => {
        const lastDir = term.type == "file" ? term.path.split("/").slice(0, -1).join("/") : term.path;
        setSelectedDirectory(lastDir);
        actionsListing.add(lastDir);
    };

    const reload = () => {
        actionsListing.setAs("/")
        setSelectedDirectory("/")
    }

    return (
        <>
            <div>
                <Search onSelect={(result) => handleSearch(result)}/>
                <div className="absolute right-1/3">
                    <Tag/>
                    <DialogOrdering/>
                </div>
            </div>

            <div className="flex flex-col items-center">
                <>
                    <DialogCreateDirectoryItem path={selectedDirectory} onCreate={() => reload()} />
                    <Order path={selectedDirectory}/>
                </>
                {historyListing.length >= 2 &&
                    <Button className="mb-2" title={"<- Go Back"} onClick={() => {
                        const directoryLastIndex = actionsListing.pop().slice(-1);
                        setSelectedDirectory(directoryLastIndex[0]);
                    }}>&lt;- Go Back</Button>
                }
            </div>
            <div className="flex flex-col items-center gap-1">
                <FilesListing path={selectedDirectory} setPath={setSelectedDirectory}/>
            </div>
        </>
    )
}

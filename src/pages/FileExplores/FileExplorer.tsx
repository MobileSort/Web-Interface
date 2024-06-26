import {useEffect, useState} from "react";
import DialogCreateDirectoryItem from "@/components/Dialog/DialogCreateDirectoryItem.tsx";
import FilesListing from "@/components/FileExplorer/FilesListing.tsx";
import {useNavigation} from "@/providers/FileNavigationProvider.tsx";
import {Button} from "@/components/ui/button.tsx";
import Search from "@/components/Search/Search";
import DialogDeleteDirectoryItem from "@/components/Dialog/DiologDeleteDirectoryItem.tsx";

export function FileExplorer() {
    const {actions, history} = useNavigation();

    const [selectedDirectory, setSelectedDirectory] = useState<string>("/");
    const [searchTerm, setSearchTerm] = useState("")

    useEffect(() => {
        actions.setAs("/")
    }, []);

    const handleSearch = (term: string) => {
        setSearchTerm(term);
    }


    return (
        <>
            <Search onSearch={handleSearch} />
                <div className="flex flex-col items-center">
                    <DialogCreateDirectoryItem path={selectedDirectory}/>
                    <DialogDeleteDirectoryItem/>
                        {history.length >= 2 &&
                            <Button className="mb-2" title={"<- Go Back"} onClick={() => {
                                const directoryLastIndex = actions.pop().slice(-1);
                                setSelectedDirectory(directoryLastIndex[0]);
                            }}>&lt;- Go Back</Button>
                        }
                </div>
                <div className="flex flex-col items-center gap-1">
                    <FilesListing path={selectedDirectory} setPath={setSelectedDirectory} searchTerm={searchTerm} />
                </div>
        </>
    )
}

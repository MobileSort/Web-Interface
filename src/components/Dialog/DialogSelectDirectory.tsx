import {DialogContent, DialogFooter, DialogTrigger} from "@/components/ui/dialog.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Dialog} from "@radix-ui/react-dialog";
import {useEffect, useState} from "react";
import {useNavigation} from "@/providers/FileNavigationProvider.tsx";
import FilesListingSelect from "@/components/Order/FilesListingSelect.tsx";

const DialogSelectDirectory = ({select}: {select:(selected: string) => void}) => {
    const [selectedDirectory, setSelectedDirectory] = useState<string>("/");
    const [directoryName, setDirectoryName] = useState<string>("");
    const {selecting} = useNavigation();
    const {actionsSelecting, historySelecting} = selecting
    useEffect(() => {
        reload()
    }, []);

    const reload = () => {
        actionsSelecting.setAs("/")
        setSelectedDirectory("/")
    }

    return (
        <div className="flex items-center justify-between gap-3">
            <Dialog>
                <DialogTrigger
                    className="mb-7 bg-blue-600 h-9 rounded-md text-white font-medium gap-4 flex flex-col justify-center items-center px-3 py-4">
                    {directoryName != "" ? directoryName : "+Selecionar diretório"}
                </DialogTrigger>
                <DialogContent>
                    <div className="flex flex-col items-center">
                        {historySelecting.length >= 2 &&
                            <Button className="mb-2" title={"<- Go Back"} onClick={() => {
                                const directoryLastIndex = actionsSelecting.pop().slice(-1);
                                setSelectedDirectory(directoryLastIndex[0]);
                            }}>&lt;- Go Back</Button>
                        }
                    </div>
                    <div className="flex flex-col items-center gap-1">
                        <FilesListingSelect path={selectedDirectory} setPath={setSelectedDirectory}/>
                    </div>
                    <DialogFooter>
                        <Button type={"button"} onClick={() => {
                            const lastDir = selectedDirectory.split("/").slice(-1)[0];
                            setDirectoryName(lastDir)
                            select(selectedDirectory)
                        }}>
                            Selecionar este diretório
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}


export default DialogSelectDirectory

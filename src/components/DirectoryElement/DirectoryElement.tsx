import { IoMdFolderOpen } from "react-icons/io";
import { DirectoryModel } from "../../utils/models/Directory.model.ts";
import { GoFile } from "react-icons/go";
import {Button} from "@/components/ui/button.tsx";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog.tsx";
import axios from "axios";


interface Props {
    directory: DirectoryModel,
    onClick?: () => void,
    onDelete:() => void,
}

const DirectoryElement = ({directory, onClick, onDelete}: Props) => {
    const directoryName = directory.path.split("/").slice(-1) || "N/A";

    const onSubmit = () => {
        const url = 'http://localhost:5033/api/Directory/RemoveItem'
        axios
            .delete(url, {data:{path:directory.path}})
            .then(() => {onDelete()})
    }

    return (
       <>
         <div onClick={() => onClick && onClick()}
             className="text-white flex gap-3 justify-between items-center bg-slate-900 rounded-md px-3 py-4 cursor-pointer">
             {directory.type == "directory" ? <IoMdFolderOpen size={40}/> : <GoFile size={30}/>}
             {
             directoryName
             }
         </div>
         <div>
             <Dialog>
                 <DialogTrigger
                        className="mb-7 bg-red-600 h-9 rounded-md text-white font-medium gap-4 flex flex-col justify-center items-center px-3 py-4">
                        - Deletar
                 </DialogTrigger>
                 <DialogContent>
                     <DialogHeader>
                         <DialogTitle>Deseja Excluir Esse Item</DialogTitle>
                     </DialogHeader>
                     <DialogFooter>
                         <Button type={"button"} onClick={()=>onSubmit()}>
                             Deletar!
                         </Button>
                     </DialogFooter>
                 </DialogContent>
             </Dialog>
         </div>
       </>
    )
}

export default DirectoryElement

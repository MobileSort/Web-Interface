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
import {Delete} from "lucide-react";
import {data} from "autoprefixer";
import axios from "axios";
import {handler} from "tailwindcss-animate";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";
import {string} from "yup";
import * as url from "node:url";

const schema = yup.object().shape({
    del: yup.string().required(),
});

interface Props {
    directory: DirectoryModel,
    onClick?: () => void,
}

const DirectoryElement = ({directory, onClick}: Props) => {
    const directoryName = directory.path.split("/").slice(-1) || "N/A";
    const {
        handleSubmit,
    } = useForm({resolver: yupResolver(schema),});
    const onSubmit = (data: {del:string;}) => {
        const url = data.del == 'https://localhost:7213/api/Directory/RemoveItem'
        axios
            .post(url)
            .then((res) => res.data as DirectoryModel)
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
                         <Button type={"button"} onClick={handleSubmit(onSubmit)}>
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

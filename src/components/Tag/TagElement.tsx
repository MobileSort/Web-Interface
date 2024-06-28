import { DirectoryModel } from "../../utils/models/Directory.model.ts";
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
}

const TagElement = ({directory}: Props) => {
    const TagName = directory.path.split("/").slice(-1) || "N/A";
    const onSubmit = () => {
        const url = 'http://localhost:5033/api/Tag/RemoveTag'
        axios
            .delete(url, {data:{path:directory.path}})
            .then((res) => res.data as DirectoryModel)
    }

    return (
        <>
            <div>
                {
                    TagName
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
                            <DialogTitle>Deseja Excluir Essa Tag?</DialogTitle>
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

export default TagElement

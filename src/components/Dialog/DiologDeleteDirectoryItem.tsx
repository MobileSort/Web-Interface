import {
    Dialog,
    DialogTrigger,
} from "@/components/ui/dialog"

const DialogDeleteDirectoryItem = () => {


    return (
        <div className="flex items-center justify-between gap-3">
            <Dialog>
                <DialogTrigger
                className="mb-7 bg-red-600 h-9 rounded-md text-white font-medium gap-4 flex flex-col justify-center items-center px-3 py-4">
                    - Deletar
                </DialogTrigger>
            </Dialog>
        </div>
    )
}

export default DialogDeleteDirectoryItem;
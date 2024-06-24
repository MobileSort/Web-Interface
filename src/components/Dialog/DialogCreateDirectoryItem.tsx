import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

const DialogCreateDirectoryItem = () => {



    return(
        <Dialog>
            <DialogTrigger>+ Adicionar</DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Adicionar item</DialogTitle>
                    <DialogContent>
                        Content
                    </DialogContent>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}

export default DialogCreateDirectoryItem;

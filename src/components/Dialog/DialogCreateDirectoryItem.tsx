import {
    Dialog,
    DialogContent, DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useForm } from "react-hook-form"
import {Button} from "@/components/ui/button.tsx";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import {DirectoryModel} from "@/utils/models/Directory.model.ts";

const schema = yup.object().shape({
    NomeItem: yup.string().required(),
    TipoItem: yup.string().required(),
});

interface Props {
    path: string,
}

const DialogCreateDirectoryItem = ({path}: Props) => {

        const {
            handleSubmit,
            register,
            setValue,
        } = useForm({resolver: yupResolver(schema),});
        const onSubmit = (data) => {
            const url = data.TipoItem == "directory" ? 'https://localhost:7213/api/Directory/AddDirectory' : "https://localhost:7213/api/Directory/AddFile"
            let model: any = {path:path +"/"+ data.NomeItem}
            if (data.TipoItem == "file"){
                model = {
                    ...model,
                    size_bytes: 0
                }
            }
            axios
                .post(url, model)
                .then((res) => res.data as DirectoryModel)
        }

    return (
        <div className="flex items-center justify-between gap-3">
            <Dialog>
                    <DialogTrigger
                        className="mb-7 bg-blue-600 h-9 rounded-md text-white font-medium gap-4 flex flex-col justify-center items-center px-3 py-4">
                        + Adicionar
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Adicionar item</DialogTitle>
                        </DialogHeader>
                            <div className="h-[40%] w-[90%] p-4 pr-8 ">
                                <label>
                                    Nome Item:
                                    <input className="w-[95%] border-2 border-black"  type="text"
                                           {...register("NomeItem")}
                                    />
                                </label>
                                <label>
                                    Selecione o tipo do Item:
                                    <RadioGroup onValueChange={(e)=>setValue("TipoItem", e)} defaultValue={""}>
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="Arquivo" id="Arquivo" />
                                            <Label htmlFor="Arquivo">Arquivo</Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="Pasta" id="Pasta" />
                                            <Label htmlFor="Pasta">Pasta</Label>
                                        </div>
                                    </RadioGroup>
                                </label>
                            </div>
                            <DialogFooter>
                                <Button type={"button"} onClick={handleSubmit(onSubmit)}>
                                    Salvar!
                                </Button>
                            </DialogFooter>
                    </DialogContent>
            </Dialog>
        </div>
    )
}

export default DialogCreateDirectoryItem;

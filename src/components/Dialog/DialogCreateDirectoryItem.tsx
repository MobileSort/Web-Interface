import {
    Dialog,
    DialogContent, DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {Label} from "@/components/ui/label"
import {RadioGroup, RadioGroupItem} from "@/components/ui/radio-group"
import {useForm} from "react-hook-form"
import {Button} from "@/components/ui/button.tsx";
import * as yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";
import axios from "axios";
import {useEffect} from "react";

const schema = yup.object().shape({
    NameItem: yup.string().required(),
    TypeItem: yup.string().required(),
    FileExtension: yup.string().when("TypeItem",{
        is: "file",
        then: (schema) => schema.required(),
        otherwise: (schema) => schema
    })
});

interface Props {
    path: string,
    onCreate: () => void,
}

const DialogCreateDirectoryItem = ({path, onCreate}: Props) => {

    const {
        handleSubmit,
        register,
        setValue,
        watch
    } = useForm({resolver: yupResolver(schema),});
    const onSubmit = (data: { TypeItem: string; NameItem: string; FileExtension: string }) => {
        const url = data.TypeItem == "directory" ? 'http://localhost:5033/api/Directory/AddDirectory' : "http://localhost:5033/api/Directory/AddFile"
        const location = path == "/" ? path : path + "/"
        const extention = data.TypeItem == "file" ? "."+data.FileExtension : "";
        let model: any = {path: location + data.NameItem + extention}
        if (data.TypeItem == "file") {
            model = {
                ...model,
                size_bytes: 0
            }
        }
        axios
            .post(url, model)
            .then(() => onCreate())
    }


    const TypeItem = watch("TypeItem");

    useEffect(() => {
        console.log({FileExtension: TypeItem})
    }, [TypeItem]);

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
                            <input className="w-[95%] border-2 border-black" type="text"
                                   {...register("NameItem")}
                            />
                        </label>
                        {TypeItem == "file" &&
                            <label>
                            Extensão do arquivo:
                            <input className="w-[95%] border-2 border-black" type="text"
                                   {...register("FileExtension")}
                            />
                        </label>}
                        <label>
                            Selecione o tipo do Item:
                            <RadioGroup onValueChange={(e) => setValue("TypeItem", e)} defaultValue={""}>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="file" id="Arquivo"/>
                                    <Label htmlFor="Arquivo">Arquivo</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="directory" id="Pasta"/>
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

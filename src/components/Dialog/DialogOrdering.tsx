import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog.tsx";
import {Button} from "@/components/ui/button.tsx";
import {LuArrowDownUp} from "react-icons/lu";
import axios from "axios";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {TagsModel} from "@/utils/models/Tags.model.ts";
import {useQuery} from "@tanstack/react-query";
import * as yup from "yup";
import {OrderingModel} from "@/utils/models/Ordering.model.ts";
import {Label} from "@/components/ui/label.tsx";
import DialogSelectDirectory from "@/components/Dialog/DialogSelectDirectory.tsx";
import { Chip } from "@mui/material";
import {useState} from "react";
import {useToast} from "@/components/ui/use-toast.ts";


const schemaOrder = yup.object().shape({
    NameOrdering: yup.string().required(),
    DirectoryDestination: yup.string().required(),
    Tags: yup.array().required().min(1)
});

const DialogOrdering = () => {
    const [dialogOpen, setDialogOpen] = useState<boolean>(false);
    const { toast } = useToast()
    const {
        handleSubmit,
        register,
        watch,
        setValue
    } = useForm({
        resolver: yupResolver(schemaOrder),
        defaultValues: {
            NameOrdering: '',
            DirectoryDestination: '',
            Tags: []
        }
    });

    const selectedTags = watch("Tags");

    const createOrdering = (data: { NameOrdering: string; DirectoryDestination: string; Tags: any[] }) => {
        const url = 'http://localhost:5033/api/Ordering/AddOrdering'
        console.log({data})
        const tags = data.Tags.map((tag: TagsModel) => tag.idTag)
        axios
            .post(url, {name: data.NameOrdering, tags: tags, directoryDestination: data.DirectoryDestination})
            .then((res) => {
                if(res.status !== 200){
                    return
                }
                setDialogOpen(false)
                toast({
                    description: "Ordenação cadastrada com sucesso"
                })
            })
    }

    const fetchOrderings = (): Promise<OrderingModel[]> => {
        return axios
            .post('http://localhost:5033/api/Ordering/ListOrderings'
            )
            .then((res) => res.data as OrderingModel[])
    }

    const {isLoading: isLoadingOrderings, data: orderings} = useQuery({
        queryKey: ['dialog-orderings'],
        queryFn: () => fetchOrderings(),
    })

    const fetchTags = (): Promise<TagsModel[]> => {
        return axios
            .post('http://localhost:5033/api/Tag/ListTags'
            )
            .then((res) => res.data as TagsModel[])
    }

    const {isLoading: isLoadingTags, data: tags} = useQuery({
        queryKey: ['ordering-tags'],
        queryFn: () => fetchTags(),
    })

    const AddTag = (tag: TagsModel) => {
        let selected = [...selectedTags];
        if(selected.findIndex((select: TagsModel) => select.idTag == tag.idTag) != -1){
            return;
        }

        selected.push(tag)
        setValue("Tags", selected)
    }

    const RemoveTag = (tag: TagsModel) => {
        let selected = [...selectedTags];
        selected = selected.filter((currentTag) => currentTag.idTag != tag.idTag)
        setValue("Tags", selected)
    }

    return (
        <div className="flex items-center justify-between gap-3">
            <Dialog open={dialogOpen} onOpenChange={(open) => setDialogOpen(open)}>
                <DialogTrigger>
                    <LuArrowDownUp size={30} color="#fff"/>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Organizações Criadas</DialogTitle>
                        <div className="mb-5 px-2 py-2 flex gap-1 items-center border border-black rounded-md">
                            {isLoadingOrderings ? "...Loading" :
                                orderings &&
                                orderings.map((ordering) =>
                                    <Chip label={ordering.name} color="primary" />
                                )
                            }
                        </div>
                    </DialogHeader>
                    <div className="h-[40%] w-[90%] p-4 pr-8 ">
                        <Label>
                            Nome da ordenação:
                            <input className="w-[95%] border-2 border-black mb-3" type="text" {...register("NameOrdering")}
                            />
                        </Label>
                        <Label>
                            Selecione o diretório
                            <DialogSelectDirectory select={(selected) => {setValue("DirectoryDestination",selected)}}/>
                        </Label>
                        <br/>
                        <Label>
                            <div className="flex gap-1 items-center">
                            {
                                selectedTags &&
                                selectedTags.map((tag) =>
                                    <>
                                        <Chip label={tag.name} onDelete={() => RemoveTag(tag)} color="primary" className="mr-1" />
                                    </>
                                )
                            }
                            </div>
                            <div className="mt-3 gap-1 flex items-center">
                            Selecione as tags:
                            {(!isLoadingTags && tags) &&
                                tags && tags.map((tag) =>
                                    <>
                                        <Chip label={tag.name} onClick={() => AddTag(tag)} color="secondary" />
                                    </>
                                )
                            }
                            </div>
                        </Label>
                    </div>
                    <DialogFooter>
                        <Button type={"button"} onClick={handleSubmit(createOrdering)}>
                            Salvar!
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default DialogOrdering

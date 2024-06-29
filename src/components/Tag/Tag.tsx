import axios from "axios";
import { BsTags} from "react-icons/bs";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Button } from "../ui/button";
import { TagsModel } from "@/utils/models/Tags.model";
import { useQuery } from "@tanstack/react-query";
import { TypeTagModel } from "@/utils/models/TypeTag.model";
import * as yup from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import Chip from '@mui/material/Chip';
import {Label} from "@/components/ui/label.tsx";

const schema = yup.object().shape({
    NomeTag: yup.string().required(),
    ColorTag: yup.string().required(),
    IdTypeTag: yup.number().required(),
    ValueTag: yup.string().required(),
});

export function Tag(){

    const {
        handleSubmit,
        register,
        setValue
    } = useForm({resolver: yupResolver(schema),});
    const onSubmit = (data: {NomeTag: string; ColorTag: string; IdTypeTag: number; ValueTag: string;}) => {
        const url = 'http://localhost:5033/api/Tag/AddTag'
        axios
            .post(url, {  name: data.NomeTag, color: data.ColorTag, typeTag: data.IdTypeTag, valueTag: data.ValueTag})
            .then(() => {})
    }

    const fetchTags = (): Promise<TagsModel[]> => {
        return axios
            .post('http://localhost:5033/api/Tag/ListTags'
            )
            .then((res) => res.data as TagsModel[])
    }

    const {isLoading:isLoadingTags, data: tags, refetch} = useQuery({
        queryKey: ['tags'],
        queryFn: () => fetchTags(),
    })

    const fetchTypeTags = (): Promise<TypeTagModel[]> => {
        return axios
            .post('http://localhost:5033/api/Tag/ListTypeTags'
            )
            .then((res) => res.data as TypeTagModel[])
    }

    const {isLoading:isLoadingTypeTags, data: typeTags} = useQuery({
        queryKey: ['typeTags'],
        queryFn: () => fetchTypeTags(),
    })

    const onDelete = (tag: TagsModel) => {
        const url = 'http://localhost:5033/api/Tag/RemoveTag'
        axios
            .delete(url, {data:{Idtag:tag.idTag}})
            .then(() =>{refetch()})
    }


    return(
        <>
            <div className="flex items-center justify-between gap-3">
            <Dialog>
                <DialogTrigger>
                    <BsTags size={33} color="#fff"/>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Tags existentes</DialogTitle>
                            <div className="mb-5 px-2 py-2 flex items-center border border-black rounded-md">
                            {isLoadingTags ? "...Loading" :
                                tags &&
                                tags.map((tag) =>
                                    <Chip label={tag.name} color="primary" onDelete={() => onDelete(tag)} />
                                )
                            }
                            </div>
                        <DialogTitle>Adicionar Tag</DialogTitle>

                        <div className="h-[40%] w-[90%] p-4 pr-8">
                            {(!isLoadingTypeTags && typeTags) &&
                            <Select onValueChange={(e) => setValue("IdTypeTag",parseInt(e))}>
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Selecione"/>
                                </SelectTrigger>
                                <SelectContent>
                                    {typeTags && typeTags.map((typeTags) =>
                                        <SelectItem value={typeTags.idTypeTag + ""}>{typeTags.description}</SelectItem>
                                    )
                                    }
                                </SelectContent>
                            </Select>
                            }
                            <br/>
                            <Label>
                                Nome
                            <input type={"text"} {...register("NomeTag")}/>
                            </Label>
                            <br/>
                            <Label>
                                Selecione a cor
                                <input type={"color"} {...register("ColorTag")}/>
                            </Label>
                            <br/>
                            <Label>
                                Valor
                            <input type={"text"} {...register("ValueTag")}/>
                            </Label>
                        </div>
                    </DialogHeader>
                    <DialogFooter>
                        <Button type={"button"} onClick={handleSubmit(onSubmit)}>
                            Salvar!
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
        </>
    )
}

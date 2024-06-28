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
            .post(url, {  name: data.NomeTag, color: data.ColorTag, typeTag: 0, valueTag: data.ValueTag})
            .then(() => {})
    }

    const fetchTags = (): Promise<TagsModel[]> => {
        return axios
            .post('http://localhost:5033/api/Tag/ListTags'
            )
            .then((res) => res.data as TagsModel[])
    }

    const {isLoading:isLoadingTags, data: tags} = useQuery({
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
                        <div className="mb-5 px-2 py-2 flex flex-col items-center border border-black rounded-md">
                            {isLoadingTags ? "...Loading" :
                                tags &&
                                tags.map((tag) =>
                                    tag.name
                                )
                            }    
                        </div> 
                        <DialogTitle>Adicionar item</DialogTitle>
                    
                        <div className="h-[40%] w-[90%] p-4 pr-8">
                            <label>
                                Nome da Tag:
                                    <input className="w-[95%] border-2 border-black mb-2 mt-2"  type="text"
                                />
                            </label>
                            <label>
                                Selecione o tipo da Tag:

                            <div className="border rounded border-black border-1">
                                {isLoadingTypeTags ? "...Loading" :
                                    typeTags &&
                                    typeTags.map((typeTag) =>
                                        typeTag.description
                                    )
                                } 
                            </div>    
                                    {/* <div className="flex items-center space-x-2 mt-2 mb-2">
                                        <RadioGroupItem value="TagExt" id="TagExt" />
                                        <Label htmlFor="TagExt">Extensão</Label>
                                    </div>
                                    <div className="flex items-center space-x-2 mt-2 mb-2">
                                        <RadioGroupItem value="Pasta" id="Pasta" />
                                        <Label htmlFor="Pasta">Pasta</Label>
                                    </div>
                                    <div className="flex items-center space-x-2 mt-2 mb-2">
                                        <RadioGroupItem value="Arquivo" id="Arquivo" />
                                        <Label htmlFor="Arquivo">Arquivo</Label>
                                    </div> */}
                                    
                            </label>
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
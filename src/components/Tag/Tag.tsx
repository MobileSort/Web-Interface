import { DirectoryModel } from "@/utils/models/Directory.model";import axios from "axios";
import { BsTags} from "react-icons/bs";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Button } from "../ui/button";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";
import { TagsModel } from "@/utils/models/Tags.model";
import { useQuery } from "@tanstack/react-query";

export function Tag(){

    const fetchTags = (): Promise<TagsModel[]> => {
        return axios
            .post('http://localhost:5033/api/Tag/ListTags'
            )
            .then((res) => res.data as TagsModel[])
    }

    const {isLoading, data: tags} = useQuery({
        queryKey: ['tags'],
        queryFn: () => fetchTags(),
    })

    return(
        <>

            <BsTags size={30} className="rotate-[360deg]" color="#fff"/>

            {isLoading ? "...Loading" :
                tags &&
                tags.map((tag) =>
                    tag.name
                )
            } 
        {/* <div>
            <div className="flex items-center justify-between gap-3">
            <Dialog>
                    <DialogTrigger>
                        <BsTags size={30} className="rotate-[360deg]" color="#fff"/>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Adicionar item</DialogTitle>
                        </DialogHeader>
                            <div className="h-[40%] w-[90%] p-4 pr-8">
                                <label>
                                    Nome da Tag:
                                    <input className="w-[95%] border-2 border-black mb-2 mt-2"  type="text"
                                    />
                                </label>
                                <label>
                                    Selecione o tipo da Tag:
                                    <RadioGroup>
                                        <div className="flex items-center space-x-2 mt-2 mb-2">
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
                                        </div>
                                    </RadioGroup>
                                </label>
                            </div>
                            <DialogFooter>
                                <Button type={"button"}>
                                    Salvar!
                                </Button>
                            </DialogFooter>
                    </DialogContent>
            </Dialog>
        </div>
        </div> */}
        </>
    )
}
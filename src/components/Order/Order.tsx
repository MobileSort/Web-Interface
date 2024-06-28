import {LuArrowDownUp} from "react-icons/lu";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog.tsx";
import {Button} from "@/components/ui/button.tsx";
import {TagsModel} from "@/utils/models/Tags.model.ts";
import axios from "axios";
import {useQuery} from "@tanstack/react-query";
import {OrderingModel} from "@/utils/models/Ordering.model.ts";
import {ReactNode, useState} from "react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select.tsx";


export function Order({path}:{path: string}) {
    const [orderingId, setOrderingId] = useState<number>(0)

    const fetchOrderings = (): Promise<OrderingModel[]> => {
        return axios
            .post('http://localhost:5033/api/Ordering/ListOrderings'
            )
            .then((res) => res.data as OrderingModel[])
    }

    const {isLoading, data: orderings} = useQuery({
        queryKey: ['orderings'],
        queryFn: () => fetchOrderings(),
    })

    const executeOrdering = () =>{
        if(orderingId == 0){
            return;
        }
        axios
            .post('http://localhost:5033/api/Ordering/ExecuteOrdering',
                {
                    idOrdering: orderingId,
                    targetDirectory: path
                }
            )
            .then(() => {})
    }

    return (
        <div className="flex items-center justify-between">
            <Dialog>
                <DialogTrigger className="mb-7 bg-blue-600 h-9 rounded-md text-white font-medium gap-4 flex flex-col justify-center items-center px-3 py-4">
                    Organizar
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Selecione uma ordenação</DialogTitle>
                    </DialogHeader>
                    <div className="h-[40%] w-[90%] p-4 pr-8 ">
                        {(!isLoading && orderings) &&
                            <Select onValueChange={(e) => setOrderingId(parseInt(e))}>
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Selecione"/>
                                </SelectTrigger>
                                <SelectContent>
                                    {orderings && orderings.map((ordering) =>
                                        <SelectItem value={ordering.idOrdering + ""}>{ordering.name}</SelectItem>
                                    )
                                    }
                                </SelectContent>
                            </Select>
                        }
                    </div>
                    <DialogFooter>
                        <Button onClick={() => executeOrdering()}>
                            Executar
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}

import { DirectoryModel } from "@/utils/models/Directory.model";
import axios from "axios";
import { useState } from "react"
import { BsSearch } from "react-icons/bs"
import { Tag } from "../Tag/Tag";
import { Order } from "../Order/Order";

interface SearchProps{
    onSelect: (searchTerm: DirectoryModel) => void;
}

const Search = ({onSelect}: SearchProps) => {
    const [results, setResults] = useState<DirectoryModel[]>([])
    const [searchTerm, setSearchTerm] = useState("")

    const fetchDirectories = () => {
        axios
            .post('http://localhost:5033/api/Directory/SearchItem',
                {
                    "searchItem": searchTerm
                }
            )
            .then((res) => setResults(res.data))
    }

    return(
        <main className="flex flex-col items-center">
            <div className="flex mt-8 w-full gap-3 max-w-xl justify-between px-3 py-3 rounded-md">
                <input 
                    type="text"
                    placeholder="Digite o nome do diretório ou arquivo..."
                    className="px-2 py-2 rounded-md w-full"
                    value={searchTerm}
                    onChange={ (e) => setSearchTerm(e.target.value) }
                />

                <button onClick={ () => fetchDirectories() } type="button" value="Buscar" className="bg-transparent">
                    <BsSearch size={30} color="#fff" />
                </button>

                <Tag />
                <Order />
                
            </div>

            
            <div className="text-white mb-5 px-2 py-2 cursor-pointer">
                {results.map((result) => 
                    <div 
                        onClick={() => onSelect(result)}
                    >
                        {result.path}
                    </div>
                )}
            </div>
        </main>
    )
}

export default Search;
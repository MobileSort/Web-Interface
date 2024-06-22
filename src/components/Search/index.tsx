import { FormEvent } from "react"
import { BsSearch } from "react-icons/bs"
import { QueryClient, useQuery, useQueryClient } from "@tanstack/react-query";

export function Search(){

    function handleSearch(e: FormEvent){
        e.preventDefault();

        
 
    }

    return(
        <main>
            <form className="flex flex-col mt-8 mb-8 w-full max-w-xl justify-between px-3 py-3 rounded-md">

                <label className="bg-black text-white font-medium mt-2 mb-2">Buscar por aquivo</label>
                <input 
                    type="text"
                    placeholder="Digite o nome do arquivo..."
                />

                <button onClick={handleSearch} type="submit" value="Buscar" className="bg-transparent mt-4 ">
                    <BsSearch size={30} color="#000" />
                </button>

            </form>
        </main>
    )
}
import { FormEvent } from "react"
import { BsSearch } from "react-icons/bs"

export function Search(){

    function handleSearch(e: FormEvent){
        e.preventDefault();
        
        
    }

    return(
        <main className="flex flex-col items-center">
            <form className="flex flex-col mt-8 mb-8 w-full max-w-xl justify-between px-3 py-3 rounded-md">
                <input 
                    type="text"
                    placeholder="Digite o nome do arquivo..."
                    className="mt-2 mb-2 px-2 py-2 rounded-md"
                />

                <button onClick={handleSearch} type="submit" value="Buscar" className="bg-transparent mt-4 ">
                    <BsSearch size={30} color="#000" />
                </button>

            </form>
        </main>
    )
}
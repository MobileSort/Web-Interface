import { FormEvent, useState } from "react"
import { BsSearch } from "react-icons/bs"

interface SearchProps{
    onSearch: (searchTerm: string) => void;
}

const Search = ({onSearch}: SearchProps) => {

    const [searchTerm, setSearchTerm] = useState("")

    const handleSearch = (e: FormEvent) => {
        e.preventDefault();
        
        onSearch(searchTerm);
    }

    return(
        <main className="flex flex-col items-center">
            <form className="flex mt-8 mb-8 w-full gap-3 max-w-xl justify-between px-3 py-3 rounded-md">
                <input 
                    type="text"
                    placeholder="Digite o nome do diretório ou arquivo..."
                    className="mt-2 mb-2 px-2 py-2 rounded-md w-full"
                    value={searchTerm}
                    onChange={ (e) => setSearchTerm(e.target.value) }
                />

                <button onClick={handleSearch} type="submit" value="Buscar" className="bg-transparent">
                    <BsSearch size={30} color="#fff" />
                </button>
            </form>
        </main>
    )
}

export default Search;
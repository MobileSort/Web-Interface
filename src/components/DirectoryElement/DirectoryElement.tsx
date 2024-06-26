import { IoMdFolderOpen } from "react-icons/io";
import { DirectoryModel } from "../../utils/models/Directory.model.ts";
import { GoFile } from "react-icons/go";

interface Props {
    directory: DirectoryModel,
    onClick?: () => void
}

const DirectoryElement = ({directory, onClick}: Props) => {
    const directoryName = directory.path.split("/").slice(-1) || "N/A";

    return(
        <div onClick={() => onClick && onClick()} className="text-white flex gap-3 justify-between items-center bg-slate-900 rounded-md px-3 py-4 cursor-pointer">
              {directory.type == "directory" ? <IoMdFolderOpen size={40}/> : <GoFile size={30} />}          
            {
                directoryName
            }
        </div>
    )
}
export default DirectoryElement

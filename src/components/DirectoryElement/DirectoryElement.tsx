import {DirectoryModel} from "../../utils/models/Directory.model.ts";

interface Props {
    directory: DirectoryModel,
    onClick?: () => void
}

const DirectoryElement = ({directory, onClick}: Props) => {
    const directoryName = directory.path.split("/").slice(-1) || "N/A";

    return(
        <div onClick={() => onClick && onClick()}>
            {
                directoryName
            }
        </div>
    )
}
export default DirectoryElement

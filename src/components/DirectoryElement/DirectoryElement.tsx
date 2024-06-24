import {DirectoryModel} from "../../utils/models/Directory.model.ts";

const DirectoryElement = ({directory}: { directory: DirectoryModel }) => {
    const directoryName = directory.path.split("/").slice(-1) || "N/A";

    return(
        <div>
            {
                directoryName
            }
        </div>
    )
}
export default DirectoryElement

import FolderActionsModel from "@/utils/models/FolderActions.model.ts";

export default interface FolderNavigationModel{
    listing: {
        historyListing: string[];
        actionsListing: FolderActionsModel;
    },
    selecting: {
        historySelecting: string[];
        actionsSelecting: FolderActionsModel;
    }
}

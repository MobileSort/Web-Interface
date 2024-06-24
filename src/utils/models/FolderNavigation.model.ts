import FolderActionsModel from "@/utils/models/FolderActions.model.ts";

export default interface FolderNavigationModel {
    history: string[];
    actions: FolderActionsModel;
}

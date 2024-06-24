export default interface FolderActionsModel {
    pop: () => string[];
    clear: () => void;
    setAs: (path: string) => void;
    add: (path: string) => void;
}

export type DirectoryModel = {
    path: string,
    type: "directory" | "file"
    size_bytes: number,
    files: DirectoryModel[]
}

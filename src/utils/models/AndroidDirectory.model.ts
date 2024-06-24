import {DirectoryModel} from "./Directory.model.ts";

export type AndroidDirectoryModel = {
    emulated: boolean,
    removable: boolean,
    path: string,
    uuid: number,
    fs_type: string,
    total_bytes: number,
    available_bytes: number,
    system_bytes: number,
    data_bytes: number,
    read_only: boolean,
    primary: boolean,
    directories: DirectoryModel[],
}

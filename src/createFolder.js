import { mkdir } from "fs/promises";
import { existsSync } from "fs";

export async function createFolder(folderName) {
    try {
        if (!existsSync(folderName)) {
            await mkdir(folderName, { recursive: true });
            console.log(`Folder "${folderName}" created successfully.`);
        } else {
            console.log(`Folder "${folderName}" already exists.`);
        }
    } catch (err) {
        console.error(`Error creating folder "${folderName}":`, err);
    }
}
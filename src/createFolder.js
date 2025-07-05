import { mkdir } from "fs/promises";
import { existsSync } from "fs";

export default async function createFolder(folderName) {
  try {
    if (!existsSync(folderName)) {
      await mkdir(folderName, { recursive: true });
    }
  } catch (err) {
    console.error(`Error creating folder "${folderName}":`, err);
  }
}
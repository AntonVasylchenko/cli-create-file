import { writeFile } from "fs/promises";
import { join } from "path";

export async function createIgnoreFiles(folderPath) {
    const gitignoreContent = `
node_modules/
dist/
.env
.DS_Store
.shopifyignore
    `.trim();

    const shopifyIgnoreContent = `
node_modules/
dist/
.DS_Store
.gitignore
    `.trim();

    try {
        await writeFile(join(folderPath, ".gitignore"), gitignoreContent);
        await writeFile(join(folderPath, ".shopifyignore"), shopifyIgnoreContent);
        console.log("Ignore files created successfully.");
    } catch (err) {
        console.error("Error creating ignore files:", err);
    }
}

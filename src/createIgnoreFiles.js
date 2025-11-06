import { writeFile } from "fs/promises";
import { join } from "path";

export default async function createIgnoreFiles(folderPath) {
    const fileContent = `
node_modules/*
dist/*
.env
.DS_Store
.shopifyignore
package.json
shopify.theme.toml
.shopify
.vscode
.prettierrc.json
    `.trim();

    try {
        await writeFile(join(folderPath, ".gitignore"), fileContent);
        await writeFile(join(folderPath, ".shopifyignore"), fileContent);
    } catch (err) {
        console.error("Error creating ignore files:", err);
    }
}

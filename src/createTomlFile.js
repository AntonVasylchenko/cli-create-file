import { writeFile } from "fs/promises";
import { join } from "path";

export default async function createTomlFile(folderPath, { shopName, themeId }) {
    if (!shopName || !themeId) {
        console.error("Error: 'shopName' and 'themeId' parameters are required.");
        return;
    }

    const fileContent = `
[environments.env1]
store = "${shopName}"
theme = "${themeId}"

[environments.env2]
store = "${shopName}"
    `.trim();

    try {
        await writeFile(join(folderPath, "shopify.theme.toml"), fileContent);
    } catch (err) {
        console.error("Error creating shopify.theme.toml:", err);
    }
}

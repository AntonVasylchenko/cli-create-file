import fs from "node:fs";
import path from "node:path";

export async function createPackageJson(folderPath) {
    const packageJsonPath = path.join(folderPath, "package.json");

    // Структура package.json
    const packageJsonContent = {
        name: path.basename(folderPath),
        version: "1.0.0",
        scripts: {
            logout: "shopify auth logout",
            pull: "shopify theme pull -e env1",
            start: "shopify theme dev -e env2"
        }
    };

    try {
        // Записуємо у файл
        fs.writeFileSync(packageJsonPath, JSON.stringify(packageJsonContent, null, 2));
        console.log("✅ package.json created successfully!");
    } catch (error) {
        console.error("❌ Error creating package.json:", error);
    }
}

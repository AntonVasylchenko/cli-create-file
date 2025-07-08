import fs from "node:fs";
import path from "node:path";

export default async function createPackageJson(folderPath) {
    const packageJsonPath = path.join(folderPath, "package.json");
    const validPackageName = path.basename(folderPath).toLowerCase().replace(/[^a-z0-9-._~]/g, "-");

    const packageJsonContent = {
        name: validPackageName,
        version: "1.0.0",
        scripts: {
            "logout": "shopify auth logout",
            "pull": "shopify theme pull -e env1",
            "pull:local": "shopify theme pull env2",
            "push": "shopify theme push -e env1",
            "dev": "shopify theme dev -e env2",
        }
    };

    try {
        fs.writeFileSync(packageJsonPath, JSON.stringify(packageJsonContent, null, 2));
    } catch (error) {
        console.error("Error creating package.json:", error);
    }
}

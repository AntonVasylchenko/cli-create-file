import fs from "fs/promises";
import path from "path";

export default async function createVSCodeConfig(targetDir = process.cwd()) {
  const vscodePath = path.join(targetDir, ".vscode");

  try {
    await fs.mkdir(vscodePath, { recursive: true });
    const extensionsContent = {
      recommendations: ["shopify.theme-check-vscode", "esbenp.prettier-vscode"],
    };
    await fs.writeFile(
      path.join(vscodePath, "extensions.json"),
      JSON.stringify(extensionsContent, null, 2)
    );

    const settingsContent = {
      "editor.formatOnSave": false,
      "[javascript]": {
        "editor.formatOnSave": false,
        "editor.defaultFormatter": "esbenp.prettier-vscode",
      },
      "[css]": {
        "editor.formatOnSave": false,
        "editor.defaultFormatter": "esbenp.prettier-vscode",
      },
      "[liquid]": {
        "editor.defaultFormatter": "Shopify.theme-check-vscode",
        "editor.formatOnSave": false,
      },
      "themeCheck.checkOnSave": false,
    };
    await fs.writeFile(
      path.join(vscodePath, "settings.json"),
      JSON.stringify(settingsContent, null, 2)
    );
  } catch (err) {
    console.error("Failed to create VSCode config:", err.message);
  }
}

import { writeFile } from "fs/promises";
import { join } from "path";

export default async function createTomlFile(
  folderPath,
  { shopName, themeId, addSeparateFolder }
) {
  if (!shopName || !themeId) {
    console.error("Error: 'shopName' and 'themeId' parameters are required.");
    return;
  }

  const isSeparateFolder = addSeparateFolder === "Yes";

  const fileContent = `
[environments.env1]
store = "${shopName}"
theme = "${themeId}"
${isSeparateFolder ? "path = './theme' " : ""}

[environments.env2]
store = "${shopName}"
${isSeparateFolder ? "path = './theme' " : ""}

    `.trim();

  try {
    await writeFile(join(folderPath, "shopify.theme.toml"), fileContent);
  } catch (err) {
    console.error("Error creating shopify.theme.toml:", err);
  }
}

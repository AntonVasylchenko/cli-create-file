import { writeFile } from "fs/promises";
import { join } from "path";

export default async function createPrettierrcFile(folderPath) {
    const prettierrcContent = `
{
  "printWidth": 120,
  "singleQuote": true,
  "overrides": [
    {
      "files": "*.liquid",
      "options": {
        "singleQuote": false
      }
    }
  ]
}
    `.trim();


    try {
        await writeFile(join(folderPath, ".prettierrc.json"), prettierrcContent);
    } catch (err) {
        console.error("Error creating prettierrc file:", err);
    }
}

import os from "node:os";
import path from "node:path";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


function cleanPath(customPath) {
    return customPath.startsWith("'") && customPath.endsWith("'")
        ? customPath.slice(1, -1)
        : customPath;
}

export function createBasePath({ action, isDesktop, customLocationType, desktopSubfolder, customPath }) {
    if (action === "Use an existing folder") {
        return __dirname
    }
    if (isDesktop === "Yes") {
        return path.join(os.homedir(), "Desktop");
    }

    if (customLocationType === "Desktop") {
        return path.join(os.homedir(), "Desktop", desktopSubfolder);
    }

    return cleanPath(customPath);
}
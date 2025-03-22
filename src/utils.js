import os from "node:os";
import path from "node:path";

function cleanPath(customPath) {
    return customPath.startsWith("'") && customPath.endsWith("'")
        ? customPath.slice(1, -1)
        : customPath;
}

export function createBasePath({ action, isDesktop, customLocationType, desktopSubfolder, customPath }) {
    if (action === "Use an existing folder") {
        return process.cwd();
    }

    if (isDesktop === "Yes") {
        return path.join(os.homedir(), "Desktop");
    }

    if (customLocationType === "Desktop") {
        return path.join(os.homedir(), "Desktop", desktopSubfolder);
    }

    return cleanPath(customPath);
}

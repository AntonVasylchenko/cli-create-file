import { exec } from "child_process";
import { promisify } from "util";

const execAsync = promisify(exec);

export async function initGitRepo(folderPath) {
    try {
        console.log("Initializing Git repository...");

        await execAsync("git init", { cwd: folderPath });
        console.log("Git repository initialized.");

        await execAsync("git add .", { cwd: folderPath });
        console.log("All files added to Git.");

        await execAsync('git commit -m "init"', { cwd: folderPath });
        console.log('Initial commit created with message: "init".');

    } catch (err) {
        console.error("Error initializing Git repository:", err);
    }
}

import { exec } from "child_process";
import { promisify } from "util";

const execAsync = promisify(exec);

export default async function initGitRepo(folderPath) {
    try {
        console.log(folderPath);
        
        console.log("Initializing Git repository...");

        await execAsync("git init", { cwd: folderPath });
        console.log("Git repository initialized.");

        await execAsync("git add .", { cwd: folderPath });
        console.log("All files added to Git.");

        await execAsync('git commit -m "init"', { cwd: folderPath });
    } catch (err) {
        console.error("Error initializing Git repository:", err);
    }
}

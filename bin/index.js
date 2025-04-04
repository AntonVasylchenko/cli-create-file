#!/usr/bin/env node
import inquirer from "inquirer";
import fs from 'node:fs';
import path from "node:path";

import { createIgnoreFiles } from "../src/createIgnoreFiles.js";
import { createFolder } from "../src/createFolder.js";
import { createBasePath } from "../src/utils.js";
import { createTomlFile } from "../src/createTomlFile.js";
import { initGitRepo } from "../src/initGitRepo.js";
import { createPackageJson } from "../src/createPackageJson.js";

async function creareWorkFolder() {
    try {
        const answers = await inquirer.prompt([
            {
                type: "list",
                name: "action",
                message: "What do you want to do?",
                choices: ["Create a folder", "Use an existing folder"],
            },
            {
                type: "list",
                name: "isDesktop",
                message: "Create folder on Desktop?",
                when: (answers) => answers.action === "Create a folder",
                choices: ["Yes", "No"],
                default: "Yes",
            },
            {
                type: "list",
                name: "customLocationType",
                message: "Specify folder on Desktop or another location?",
                choices: ["Desktop", "Another location"],
                when: (answers) => answers.isDesktop === "No",
                default: "Desktop",
            },
            {
                type: "input",
                name: "desktopSubfolder",
                message: "Enter the name of the folder on Desktop where the new folder will be created:",
                when: (answers) => answers.customLocationType === "Desktop",
                default: "MyProjects",
                validate: (input) => input.trim() !== "" || "Folder name cannot be empty!",
            },
            {
                type: "input",
                name: "customPath",
                message: "Enter the folder path:",
                when: (answers) => answers.customLocationType === "Another location",
                default: "/Users/yourname/Documents",
                validate: (input) => input.trim() !== "" || "Path cannot be empty!",
            },
            {
                type: "input",
                name: "folderName",
                message: "Enter folder name:",
                default: "NewProject",
            },
            {
                type: "list",
                name: "initGit",
                message: "Initialize a Git repository?",
                choices: ["Yes", "No"],
                default: "Yes",
            },
            {
                type: "list",
                name: "createIgnoreFiles",
                message: "Create ignore files (.gitignore and .shopifyignore)?",
                choices: ["Yes", "No"],
                default: "Yes",
            },
            {
                type: "list",
                name: "createShopifyToml",
                message: "Create shopify.theme.toml file?",
                choices: ["Yes", "No"],
                default: "Yes",
            },
            {
                type: "list",
                name: "addTomlInSeparateFolder",
                message: "Add shopify.theme.toml in a separate folder?",
                choices: ["Yes", "No"],
                when: (answers) => answers.createShopifyToml === "Yes",
                default: "No",
            },
            {
                type: "input",
                name: "shopName",
                message: "Enter Shopify store name:",
                when: (answers) => answers.createShopifyToml === "Yes",
                default: "my-shopify-store",
                validate: (input) => input.trim() !== "" || "Store name cannot be empty!",
            },
            {
                type: "input",
                name: "themeId",
                message: "Enter Theme ID:",
                when: (answers) => answers.createShopifyToml === "Yes",
                default: "123456789",
                validate: (input) => input.trim() !== "" || "Theme ID cannot be empty!",
            },
            {
                type: "list",
                name: "createPackageJson",
                message: "Create package.json with Shopify commands?",
                choices: ["Yes", "No"],
                when: (answers) => answers.addTomlInSeparateFolder === "No" && answers.createShopifyToml === "Yes",
                default: "Yes",
            }
        ]);


        const basePath = createBasePath(answers);
        const folderPath = path.join(basePath, answers.folderName);

        if (!fs.existsSync(basePath) || !fs.lstatSync(basePath).isDirectory()) {
            throw new Error("Path does not exist");
        }

        if (answers.action !== "Use an existing folder" && fs.existsSync(folderPath)) {
            throw new Error("Folder already exists");
        }

        await createFolder(folderPath);

        if (answers.addTomlInSeparateFolder === "Yes") {
            await createFolder(`${folderPath}/theme`);
        }

        if (answers.createIgnoreFiles === "Yes") {
            await createIgnoreFiles(folderPath);
        }

        if (answers.createShopifyToml === "Yes") {
            const tomlPath = answers.addTomlInSeparateFolder === "Yes" ? `${folderPath}/theme` : folderPath;
            await createTomlFile(tomlPath, answers);
        }

        if (answers.initGit === "Yes") {
            await initGitRepo(folderPath);
        }

        if (answers.createPackageJson === "Yes" && answers.createShopifyToml == "Yes" && answers.addTomlInSeparateFolder === "No" ) {
            await createPackageJson(folderPath);
        }

    } catch (error) {
        console.log(error)
    }
}
creareWorkFolder()
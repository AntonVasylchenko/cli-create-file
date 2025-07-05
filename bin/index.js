#!/usr/bin/env node
import inquirer from "inquirer";
import fs from "node:fs";
import path from "node:path";

import {
  createFolder,
  createIgnoreFiles,
  createPackageJson,
  createPrettierrcFile,
  createTomlFile,
  createVSCodeConfig,
  initGitRepo,
} from "../src/index.js";

async function creareWorkFolder() {
  try {
    const answers = await inquirer.prompt([
      {
        type: "list",
        name: "action",
        message: "Where do you want to work?",
        choices: ["Create a folder", "Use an existing folder"],
        default: "Use an existing folder",
      },
      {
        type: "input",
        name: "folderName",
        message: "Name for the new folder:",
        default: "NewProject",
        when: (answers) => answers.action === "Create a folder",
      },
      {
        type: "list",
        name: "isVScode",
        message: "Are you using Visual Studio Code?",
        choices: ["Yes", "No"],
        default: "Yes",
      },
      {
        type: "list",
        name: "initGit",
        message: "Initialize Git in this project?",
        choices: ["Yes", "No"],
        default: "Yes",
      },
      {
        type: "list",
        name: "createPrettierFile",
        message: "Add a Prettier config file?",
        choices: ["Yes", "No"],
        default: "Yes",
      },
      {
        type: "list",
        name: "createIgnoreFiles",
        message: "Generate .gitignore and .shopifyignore files?",
        choices: ["Yes", "No"],
        default: "Yes",
      },
      {
        type: "list",
        name: "createShopifyToml",
        message: "Add a shopify.theme.toml file?",
        choices: ["Yes", "No"],
        default: "Yes",
      },
      {
        type: "list",
        name: "addTomlInSeparateFolder",
        message: "Place shopify.theme.toml inside a separate folder?",
        choices: ["Yes", "No"],
        when: (answers) => answers.createShopifyToml === "Yes",
        default: "No",
      },
      {
        type: "input",
        name: "shopName",
        message: "Your Shopify store name:",
        when: (answers) => answers.createShopifyToml === "Yes",
        default: "my-shopify-store",
        validate: (input) =>
          input.trim() !== "" || "Store name cannot be empty!",
      },
      {
        type: "input",
        name: "themeId",
        message: "Theme ID for this project:",
        when: (answers) => answers.createShopifyToml === "Yes",
        default: "123456789",
        validate: (input) => input.trim() !== "" || "Theme ID cannot be empty!",
      },
      {
        type: "list",
        name: "createPackageJson",
        message: "Add package.json with Shopify CLI scripts?",
        choices: ["Yes", "No"],
        when: (answers) =>
          answers.addTomlInSeparateFolder === "No" &&
          answers.createShopifyToml === "Yes",
        default: "Yes",
      },
    ]);

    const basePath = process.cwd();
    const folderPath = path.join(basePath, answers.folderName || ".");

    if (!fs.existsSync(basePath) || !fs.lstatSync(basePath).isDirectory()) {
      throw new Error("Path does not exist");
    }

    if (
      answers.action !== "Use an existing folder" &&
      fs.existsSync(folderPath)
    ) {
      throw new Error("Folder already exists");
    }

    await createFolder(folderPath);

    if (answers.addTomlInSeparateFolder === "Yes") {
      await createFolder(`${folderPath}/theme`);
    }

    if (answers.createIgnoreFiles === "Yes") {
      await createIgnoreFiles(folderPath);
    }

    if (answers.isVScode === "Yes") {
      await createVSCodeConfig(folderPath);
    }

    if (answers.createPrettierFile === "Yes") {
      await createPrettierrcFile(folderPath);
    }

    if (answers.createShopifyToml === "Yes") {
      const tomlPath =
        answers.addTomlInSeparateFolder === "Yes"
          ? `${folderPath}/theme`
          : folderPath;
      await createTomlFile(tomlPath, answers);
    }

    if (
      answers.createPackageJson === "Yes" &&
      answers.createShopifyToml == "Yes" &&
      answers.addTomlInSeparateFolder === "No"
    ) {
      await createPackageJson(folderPath);
    }

    if (answers.initGit === "Yes") {
      await initGitRepo(folderPath);
    }
  } catch (error) {
    console.log(error);
  }
}
creareWorkFolder();

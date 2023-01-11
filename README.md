# Connect Four

The basic project structure for a NPM package that will contain the core game logic for the game Connect Four.

## Local Development

This project uses [Yarn](https://yarnpkg.com/) as a package manager, however you can use `NPM` to run this project locally.

### Install Project Dependencies

```bash
yarn install --frozen-lockfile
```

If you are using `npm`, run the following command:

```bash
npm install
```

### Run Tests

```bash
yarn test
```

If you are using `npm`, run the following command:

```bash
npm run test
```

### Run Linting

```bash
yarn lint
```

If you are using `npm`, run the following command:

```bash
npm run lint
```

## Project Structure

In the project folder, there is a variety of files and folders. At a high level, here is a quick summary of what each folder and file is used for:

```
.
├── .vscode          this folder contains configuration files for the VSCode editor, which will add auto linting and custom launch configurations for running tests (if you are not using VSCode, you can remove this folder from your project)
├── config           this folder contains configuration files for ESLint and TSC (the TypeScript Compiler)
├── dist             a dynamically generated folder which will contain the compiled source code of the finished library (generated when you run the build script)
├── node_modules     a dynamically generated folder which contains the project developer dependencies when working on the library (generated when you run the install script)
├── src              this folder will contain the core code for our library (currently contains a placeholder Class for the Connect Four library)
├── tests            this folder will contain the custom tests for our library
├── .gitignore       this file is used for telling git to ignore certain files in our project (mainly used for our project dependencies and dynamically generated files)
├── package.json     a configuration file for npm that contains metadata about your project
├── tsconfig.json    a configuration file for TSC
├── yarn.lock        a configuration file that contains the exact tree structure of the project dependencies and their versions (helps with repeatable project builds)
```

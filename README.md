# Node.js TypeScript Jest Starter

This project is a starter template for a Node.js application using TypeScript and Jest for testing. It includes basic configurations for building, running, and testing your application.

## Table of Contents

- [Getting Started](#getting-started)
- [Scripts](#scripts)
- [Dependencies](#dependencies)
- [Development](#development)
- [Testing](#testing)
- [Build](#build)
- [Author](#author)

## Getting Started

To get started with this project, follow these steps:

1. **Clone the repository:**
    ```bash
    git clone git@github.com:isamir909/nodejs-ts-jest-starter.git
    ```

2. **Install dependencies:**
    ```bash
    pnpm install
    ```

3. **Build the project:**
    ```bash
    pnpm run build
    ```

4. **Start the application:**
    ```bash
    pnpm start
    ```

## Scripts

The following scripts are available in this project:

- `build`: Bundles the TypeScript files using esbuild.
- `start`: Runs the bundled Node.js application.
- `dev:tsc`: Watches for changes in TypeScript files and compiles them.
- `dev:node`: Watches for changes in the built JavaScript file and restarts the Node.js application.
- `dev:esbuild`: Watches for changes and rebuilds using esbuild.
- `dev`: Runs all development scripts concurrently.
- `test`: Runs tests using Jest.

## Dependencies

The project includes the following development dependencies:

- `@jest/types`: TypeScript types for Jest.
- `@types/jest`: Type definitions for Jest.
- `@types/node`: Type definitions for Node.js.
- `esbuild`: JavaScript bundler and minifier.
- `jest`: Testing framework.
- `npm-run-all`: CLI tool to run multiple npm-scripts in parallel or sequential.
- `ts-jest`: TypeScript preprocessor with sourcemap support for Jest.
- `ts-node`: TypeScript execution environment for Node.js.
- `typescript`: TypeScript language.

## Development

To start the development environment, run:

```bash
pnpm run dev
```
This will concurrently watch for changes in your TypeScript files, compile them, and restart the Node.js application.

## Testing

To run the tests, use:

```bash
pnpm test
```
This will execute all tests defined in the __tests__ directory or any file with a .test.ts extension.

## Build

To build the project, use:

```bash
pnpm run build
```
This will bundle the TypeScript files into a single JavaScript file in the dist directory.


## Author

Samir Lohiya

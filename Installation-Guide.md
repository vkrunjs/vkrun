# Installation Guide

> This is a module for [Node.js](https://nodejs.org/en/) available through the [npm registry](https://www.npmjs.com/package/vkrun).

#### Step 1: [Install Node.js](https://nodejs.org/en/download/) 18 or higher is required.

#### Step 2: Create a new directory for your project. (For new projects)

#### Step 3: Create the `package.json` file. (For new projects)

```bash
npm init
```

#### Step 4: Installing the Vkrun Framework

##### NPM

```bash
npm install vkrun
```

##### YARN

```bash
yarn add vkrun
```

Your package.json should look like:

```json
{
  "name": "project-name",
  "main": "index.js",
  "type": "module",
  "scripts": {
    "dev": "node index.js"
  },
  "dependencies": {
    "vkrun": "^0.26.0"
  }
}
```

#### Step 5: Installing the Vkrun Framework

##### If you're working on a TypeScript project, you also need to install TypeScript:

##### NPM

```bash
npm install typescript @types/node ts-node --save-dev
```

##### YARN

```bash
yarn add typescript @types/node ts-node -D
```

Your package.json should look like:

```json
{
  "name": "project-name",
  "main": "index.ts",
  "scripts": {
    "dev": "ts-node index.ts"
  },
  "dependencies": {
    "vkrun": "^0.26.0"
  },
  "devDependencies": {
    "typescript": "*",
    "ts-node": "^10.9.2",
    "@types/node": "^20.10.4"
  }
}
```

Your tsconfig.json should look like:

```json
{
  "exclude": ["./dist"],
  "compilerOptions": {
    "target": "ES2021",
    "module": "commonjs",
    "allowJs": true,
    "outDir": "./dist",
    "rootDir": "./src",
    "removeComments": true,
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "strict": true,
    "sourceMap": true,
    "skipLibCheck": true,
    "declaration": true
  },
  "include": [ "src" ]
}
```

If this is your first time using Vkrun, you can choose a template from index.ts, [example projects](./examples).

#### Step 6: Running the project

##### NPM

```bash
npm run dev
```

##### YARN

```bash
yarn dev
```
# Publishing Guide

> This is a guide to publishing the package to npm.

#### Step 1: Change the version in **package.json**.

#### Step 2: Change the **CHANGELOG.json** file with changes from the new version.

#### Step 3: Generate the new package.

  ##### NPM

  ```bash
  npm run build
  ```

  ##### YARN

  ```bash
  yarn build
  ```

#### Step 4: Publish the package to npm.

  ```bash
  npm publish
  ```
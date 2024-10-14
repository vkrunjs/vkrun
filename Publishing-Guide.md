# Publishing Guide

> This is a guide to publishing the package to npm.

#### Step 1: Update the Version in package.json.

> Use the npm version command to update the version number automatically, create a Git commit, and add a version tag.

```bash
npm version patch    # For a patch update (0.1.1 -> 0.1.2)
npm version minor    # For a minor update (0.1.1 -> 0.2.0)
npm version major    # For a major update (0.1.1 -> 1.0.0)
```

Alternatively, you can manually edit the version field in package.json, but using npm version is recommended to ensure consistency and create automatic Git tags.

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
import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import prettierPlugin from "eslint-plugin-prettier";

/** @type {import('eslint').Linter.Config[]} */
export default [
  { files: ["**/*.{js,mjs,cjs,ts}"] },
  { files: ["**/*.js"], languageOptions: { sourceType: "script" } },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  {
    parserOptions: {
      ecmaVersion: 2021,
      sourceType: "module",
    },
  },
  {
    files: ["*.ts", "src/**/__tests__"],
    rules: {
      "@typescript-eslint/strict-boolean-expressions": "off",
      "@typescript-eslint/consistent-type-imports": "off",
      "@typescript-eslint/no-unsafe-argument": "off",
      "@typescript-eslint/no-confusing-void-expression": "off",
      "@typescript-eslint/non-nullable-type-assertion-style": "off",
      "@typescript-eslint/no-this-alias": "off",
      "eslint-comments/require-description": "off",
    },
  },
  {
    plugins: { prettier: prettierPlugin },
    rules: {
      "prettier/prettier": "error", // Faz o ESLint avisar sobre formatação incorreta
    },
  },
  {
    ignores: ["lib/", "examples/"],
  },
];

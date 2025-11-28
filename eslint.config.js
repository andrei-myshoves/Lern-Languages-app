import js from "@eslint/js";
import react from "eslint-plugin-react";
import globals from "globals";
import prettier from "eslint-plugin-prettier";
import prettierConfig from "eslint-config-prettier";

export default [
  {
    files: ["**/*.{js,jsx}"],

    languageOptions: {
      ecmaVersion: 2023,
      sourceType: "module",
      globals: {
        ...globals.browser,
        ...globals.node
      },
      parserOptions: { ecmaFeatures: { jsx: true } }
    },

    plugins: {
      react,
      prettier
    },

    rules: {
      ...js.configs.recommended.rules,
      ...react.configs.recommended.rules,

      "no-unused-vars": "warn",
      "react/prop-types": "off",
      "react/react-in-jsx-scope": "off",


      "prettier/prettier": "error"
    },

    settings: { react: { version: "detect" } },

    extends: [prettierConfig] 
  }
];
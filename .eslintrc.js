module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended"
  ],
  parserOptions: {
    ecmaVersion: 14,
    sourceType: "module"
  },
  plugins: ["react"],
  rules: {
    "no-unused-vars": "warn",
    "react/prop-types": "off"
  },
  settings: {
    react: { version: "detect" }
  }
};

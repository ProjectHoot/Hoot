module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: ["plugin:vue/essential", "eslint:recommended", "prettier"],
  parserOptions: {
    parser: "babel-eslint",
  },
  rules: {
    "vue/component-name-in-template-casing": ["error", "PascalCase"],
    "no-console": "off",
    "no-debugger": "error",
    "no-unused-vars": process.env.NODE_ENV === "production" ? "error" : "off",
  },
};

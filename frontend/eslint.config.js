import js from "@eslint/js";

export default [
  js.configs.recommended,
  {
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        console: "readonly",
        window: "readonly",
        document: "readonly",
        setTimeout: "readonly",
        clearTimeout: "readonly",
        localStorage: "readonly",
        location: "readonly",
        URL: "readonly",
        fetch: "readonly",
        navigator: "readonly",
        IntersectionObserver: "readonly",
      },
    },
    rules: {
      "no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
      "no-console": "warn",
      "no-constant-condition": "warn",
      "no-undef": "warn",
    },
  },
  {
    ignores: ["node_modules/", "dist/", "coverage/"],
  },
];

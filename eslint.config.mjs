import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
// import globals from "globals"; // It's good practice to define globals

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

/** @type {import('eslint').Linter.FlatConfig[]} */
const eslintConfig = [
  // 1. Add this "ignores" section at the top
  {
    ignores: [
      ".next/**",
      "node_modules/**",
      "app/generated/**", // This will ignore the Prisma wasm file and others
      "out/**",
      "build/**",
    ],
  },

  // This is your original configuration
  ...compat.extends("next/core-web-vitals", "next/typescript"),

  // 2. Add this "rules" section to disable specific rules
  {
    rules: {
      // Turn off the rules that are causing the most noise
      "@typescript-eslint/no-unused-expressions": "off",
      "@typescript-eslint/no-this-alias": "off",

      // Turn off the unused variables rule completely.
      // (See below for a better alternative if you want to keep it partially)
      "@typescript-eslint/no-unused-vars": "off",
      
      // You can add any other rules you want to disable here
      // "example-rule/name": "off",
    }
  },
];

export default eslintConfig;
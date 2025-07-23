import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";
import { globalIgnores } from "eslint/config";

export default tseslint.config([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs["recommended-latest"],
      reactRefresh.configs.vite,
      "prettier",
    ],
    plugins: ["prettier"],
    rules: {
      "sort-imports": [
        "warn",
        {
          ignoreDeclarationSort: true,
          ignoreMemberSort: false,
          ignoreCase: true,
        },
      ],
      "import/order": [
        "warn",
        {
          groups: ["builtin", ["external", "internal"], "parent", "sibling"],
          alphabetize: {
            order: "asc",
            caseInsensitive: true,
          },
          "newlines-between": "always",
        },
      ],
      "no-unexpected-multiline": "off",
      "space-before-function-paren": [
        "error",
        {
          anonymous: "always",
          named: "never",
          asyncArrow: "always",
        },
      ],
      "arrow-parens": ["error", "as-needed"],
    },
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
  },
])

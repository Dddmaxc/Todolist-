// eslint.config.js
import js from "@eslint/js";
import tseslint from "typescript-eslint";
import reactPlugin from "eslint-plugin-react";
import globals from "globals";

export default [
  js.configs.recommended,

  // ✅ Явно исключаем eslint.config.js от линтинга TypeScript-правилами
  {
    files: ["eslint.config.js"],
    languageOptions: {
      parser: null,
    },
    rules: {},
  },

  // ✅ Ограничиваем область применения TypeScript правил только на ts/tsx
  {
    files: ["**/*.ts", "**/*.tsx"],
    ...tseslint.configs.recommendedTypeChecked[1], // основной TS конфиг
    languageOptions: {
      ...tseslint.configs.recommendedTypeChecked[1].languageOptions,
      parserOptions: {
        project: ["./tsconfig.json"],
      },
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    plugins: {
      react: reactPlugin,
    },
    rules: {
      ...tseslint.configs.recommendedTypeChecked[1].rules,
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",
    },
  },
];

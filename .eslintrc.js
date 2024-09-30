module.exports = {
    env: {
        es2021: true,
        node: true,
    },
    extends: [
        "eslint:recommended",
        "plugin:react/recommended",
        "plugin:@typescript-eslint/recommended",
    ],
    parser: "@typescript-eslint/parser",
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 12,
        sourceType: "module",
    },
    plugins: [
        "react",
        "react-hooks",
        "react-native",
        "@typescript-eslint",
        "prettier",
    ],
    rules: {
        "prettier/prettier": [
            "error",
            {
                endOfLine: "auto",
                tabWidth: 4,
            },
        ],

        // indent: ["error", "tab"],
        "linebreak-style": ["error", "unix"],
        quotes: ["error", "double"],
        semi: ["error", "always"],
        "react/prop-types": 0,
    },
    settings: {
        react: {
            version: "detect",
        },
    },
};

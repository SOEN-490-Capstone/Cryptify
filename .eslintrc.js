module.exports = {
    parser: "@typescript-eslint/parser",
    parserOptions: {
        ecmaVersion: 2020,
        sourceType: "module",
    },
    extends: [
        "plugin:@typescript-eslint/recommended",
        "plugin:prettier/recommended",
    ],
    rules: {
        "@typescript-eslint/no-explicit-any": 0,
    },
    ignorePatterns: [
        "dist",
        "pgdata"
    ]
};

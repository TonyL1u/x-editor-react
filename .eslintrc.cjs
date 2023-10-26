module.exports = {
    root: true,
    env: { browser: true, es2020: true },
    extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended-type-checked', 'plugin:react-hooks/recommended', 'plugin:react/recommended', 'plugin:react/jsx-runtime', 'plugin:prettier/recommended', 'prettier'],
    ignorePatterns: ['dist', 'scripts', '.eslintrc.cjs', 'postcss.config.cjs', 'tailwind.config.cjs', 'fast-bundle.config.cjs', 'src/libs/*'],
    parser: '@typescript-eslint/parser',
    parserOptions: { ecmaVersion: 'latest', sourceType: 'module', project: ['./tsconfig.json', './tsconfig.node.json'], tsconfigRootDir: __dirname },
    plugins: ['react-refresh', 'simple-import-sort'],
    rules: {
        'simple-import-sort/imports': 'warn',
        'simple-import-sort/exports': 'warn',
        'react-refresh/only-export-components': 'off',
        '@typescript-eslint/no-explicit-any': ['error', { fixToUnknown: true, ignoreRestArgs: true }],
        '@typescript-eslint/ban-ts-comment': 'off',
        '@typescript-eslint/no-misused-promises': ['error', { checksVoidReturn: false }],
        'no-console': 'error'
    }
};

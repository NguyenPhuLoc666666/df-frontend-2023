module.exports = {
  root: true,
  extends: [
    './node_modules/@dwarvesf/react-eslint-config',
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:prettier/recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'next',
    'next/core-web-vitals',
    'prettier',
    'standard-with-typescript',
    'plugin:jsx-a11y/recommended',
  ],
  ignorePatterns: ['node_modules/', 'eslintrc.js'],
  env: {
    es6: true,
    browser: true,
    node: true,
  },
  globals: {
    io: true,
    chrome: true,
  },
  parserOptions: {
    ecmaVersion: 10,
    ecmaFeatures: {
      jsx: true,
    },
    project: ['./tsconfig.json'],
    tsconfigRootDir: __dirname,
    createDefaultProgram: true,
    sourceType: 'module',
    babelOptions: {
      presets: [require.resolve('next/babel')],
    },
  },
  rules: {
    'comma-dangle': 'off',
    '@typescript-eslint/comma-dangle': ['error', 'always-multiline'],
    semi: ['error', 'never'],
    'prettier/prettier': ['error', { endOfLine: 'auto' }],
    'arrow-body-style': 'off',
    'prefer-arrow-callback': 'off',
    '@typescript-eslint/space-before-function-paren': ['error', 'never'],
    'jsx-a11y/label-has-associated-control': 0,
  },
  overrides: [
    {
      files: ['**/*.ts?(x)', '**/*.js?(x)'],
      rules: {
        'react/react-in-jsx-scope': 'off',
        'react/jsx-sort-props': 'off',
        'react/function-component-definition': 'off',
        'no-shadow': 'off',
        'no-console': 'off',
        '@typescript-eslint/no-misused-promises': [
          'error',
          {
            checksVoidReturn: false,
          },
        ],
      },
    },
  ],
  plugins: ['jsx-a11y'],
}

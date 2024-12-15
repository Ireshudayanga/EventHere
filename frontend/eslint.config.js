import js from '@eslint/js';
import globals from 'globals';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';

export default [
  { 
    ignores: ['dist'] 
  },
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 'latest', // Use the latest ECMAScript version
      globals: globals.browser,
      parserOptions: {
        ecmaFeatures: { jsx: true }, // Enable JSX syntax
        sourceType: 'module',
      },
    },
    settings: {
      react: { 
        version: 'detect' // Automatically detect React version
      },
    },
    plugins: {
      react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...react.configs.recommended.rules,
      ...react.configs['jsx-runtime'].rules,
      ...reactHooks.configs.recommended.rules,

      // Custom rules
      'react/jsx-no-target-blank': 'off', // Disable warnings for target="_blank"
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],

      // Disable unused variable and React scope rules
      'no-unused-vars': 'off', // Disable unused variables rule completely
      'react/react-in-jsx-scope': 'off', // Disable for React 17+ with JSX transform
      'react/jsx-uses-react': 'off',    // Disable for React 17+ with JSX transform
    },
  },
];

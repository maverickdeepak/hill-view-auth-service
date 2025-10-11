// @ts-check

import eslint from '@eslint/js'
import tseslint from 'typescript-eslint'
import { defineConfig } from 'eslint/config'

export default defineConfig([
    eslint.configs.recommended,
    ...tseslint.configs.recommendedTypeChecked,
    {
        ignores: ['.eslintrc', 'dist', 'node_modules', 'eslint.config.mjs'],
        languageOptions: {
            parserOptions: {
                projectService: true,
            },
        },
        rules: {
            'no-console': 'off',
            'dot-notation': 'error',
        },
    },
])

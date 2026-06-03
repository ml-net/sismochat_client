import js from '@eslint/js'
import tseslint from 'typescript-eslint'
import pluginVue from 'eslint-plugin-vue'
import globals from 'globals'

export default tseslint.config(
  js.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  ...pluginVue.configs['flat/recommended'],
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
        extraFileExtensions: ['.vue'],
      },
      globals: globals.browser,
    },
    rules: {
      'vue/multi-word-component-names': 'off',
    },
  },
  {
    // TODO: re-enable when vue-tsc exposes component types to eslint (#32)
    files: ['src/main.ts', 'src/router/index.ts'],
    rules: {
      '@typescript-eslint/no-unsafe-argument': 'off',
      '@typescript-eslint/no-unsafe-assignment': 'off',
    },
  },
  {
    files: ['**/*.js'],
    ...tseslint.configs.disableTypeChecked,
  },
  {
    files: ['*.vue', '**/*.vue'],
    languageOptions: {
      parserOptions: {
        parser: tseslint.parser,
      },
    },
  },
  {
    ignores: ['dist/**', 'node_modules/**'],
  },
)

import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    rules: {
      // Trop strict pour ce projet: beaucoup d'effets légitimes mettent à jour du state.
      'react-hooks/set-state-in-effect': 'off',
    },
  },
  // Les fichiers de context/hooks exportent aussi des helpers (useXxx), ce qui déclenche
  // à tort la règle Fast Refresh.
  {
    files: ['src/context/**/*.{ts,tsx}', 'src/hooks/**/*.{ts,tsx}'],
    rules: {
      'react-refresh/only-export-components': 'off',
    },
  },
])

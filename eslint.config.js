import js from '@eslint/js'
import globals from 'globals'
import eslintConfigPrettier from 'eslint-config-prettier/flat'

export default [
	{ignores: ['node_modules/**', 'legacy/**', 'reports/**']},
	js.configs.recommended,
	{
		languageOptions: {
			ecmaVersion: 'latest',
			sourceType: 'module',
			globals: {...globals.node},
		},
		rules: {
			'no-else-return': 'error',
			'operator-assignment': ['warn', 'always'],
			'no-undef-init': 'error',
			'no-negated-condition': 'warn',
			'max-params': ['error', 3],
			'no-nested-ternary': 'warn',
		},
	},
	eslintConfigPrettier,
]

module.exports = {
  extends: ['eslint-config-prettify-ts-react'],
  rules: {
    // 'curly': "error",
    'class-methods-use-this': 'off',
    'max-classes-per-file': 'off',
    'global-require': 'off',

    'no-console': 'off',
    'no-continue': 'off',
    'no-param-reassign': 'off',
    'no-unused-vars': 'off',
    'no-await-in-loop': 'off',

    'import/prefer-default-export': 'off',
    'import/no-extraneous-dependencies': [
      'warn',
      { devDependencies: ['**/*.test.ts', '**/*.spec.ts'] },
    ],

    '@typescript-eslint/no-this-alias': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
  },
};

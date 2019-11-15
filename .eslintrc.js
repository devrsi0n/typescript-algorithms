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

    '@typescript-eslint/no-this-alias': 'off',
    '@typescript-eslint/no-empty-function': 'off',
  },
};

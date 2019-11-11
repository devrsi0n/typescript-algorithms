module.exports = {
  extends: ['eslint-config-prettify-ts-react'],
  rules: {
    // 'curly': "error",
    'class-methods-use-this': 'off',
    'max-classes-per-file': 'off',
    'global-require': 'off',

    'no-console': 'off',

    '@typescript-eslint/no-this-alias': 'off',
  },
};

module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['airbnb-base'],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    'no-plusplus': 0,
    semi: ['error', 'always'],
    'comma-dangle': ['error', 'always-multiline'],
  },
};

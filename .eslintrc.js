module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  parserOptions: {
    parser: '@babel/eslint-parser',
    requireConfigFile: false,
  },
  extends: [
    'airbnb-base',
    'plugin:vue/recommended',
    'plugin:nuxt/recommended',
    '@nuxtjs',
    'prettier',
  ],
  plugins: [],
  // add your custom rules here
  rules: {
    'vue/no-mutating-props': 'warn',
    'vue/html-self-closing': 'off',
    'import/extensions': 'off',
    'import/no-unresolved': 'off',
  },
}

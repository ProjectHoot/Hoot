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
    '@nuxtjs',
    'plugin:nuxt/recommended',
    'prettier',
    'plugin:vue/recommended',
  ],
  plugins: [],
  // add your custom rules here
  rules: {
    'vue/no-mutating-props': 'warn',
  },
}

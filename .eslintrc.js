module.exports = {
  extends: [
    'eslint:recommended',
    'airbnb-base',
    'plugin:vue/recommended', // or 'plugin:vue/base'
  ],
  plugins: [
  	'vue',
  ],
  rules: {
    'vue/valid-v-if': 'error',
  },
};
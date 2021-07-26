/*
 * @Date: 2021-07-25 22:44:18
 * @Author: gsf
 * @Description: ---
 */
const path = require('path');

module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
  },
  // extends: '@ali/eslint-config-am',
  //   parserOptions: {
  //     ecmaFeatures: {
  //       jsx: true,
  //     },
  //     ecmaVersion: 12,
  //   },
  plugins: [
    'react',
  ],
  rules: {
    // 'no-console': 0
  },
  settings: {
    'import/resolver': {
      alias: {
        map: [
          ['components', path.resolve(__dirname, './components')],
          ['pages', path.resolve(__dirname, 'src/pages/')],
          ['@', path.resolve(__dirname, 'src/')],
        ],
      },
    },
  },

};
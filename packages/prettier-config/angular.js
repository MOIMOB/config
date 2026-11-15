const base = require('./index.js');

/** @type {import('prettier').Config} */
module.exports = {
  ...base,
  overrides: [{ files: '*.html', options: { parser: 'angular' } }],
};

module.exports = {
  ignorePatterns: ['lib', 'dist'],
  overrides: [
    {
      files: ['./packages/**/*.ts'],
      extends: ['@mario34/eslint-config-ts'],
    },
    {
      files: ['./packages/**/*.vue'],
      extends: ['@mario34/eslint-config-vue3'],
    },
  ],
}

module.exports = {
  // notify: true,
  preset: 'ts-jest',
  setupFiles: ['./jest/setup.js'],
  runner: '@jest-runner/electron',
  testEnvironment: '@jest-runner/electron/environment',
};

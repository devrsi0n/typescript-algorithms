module.exports = {
  // setupFiles: ['./jest/setup.js', 'jest-canvas-mock'],
  // notify: true,
  // preset: 'ts-jest',
  // runner: 'jest-electron/runner',
  // testEnvironment: 'jest-electron/environment',

  notify: true,
  preset: 'ts-jest',
  setupFiles: ['./jest/setup.js'],
  runner: '@jest-runner/electron',
  testEnvironment: '@jest-runner/electron/environment',
};

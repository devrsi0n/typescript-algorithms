// const commonConfigh = {
//   // notify: true,
//   preset: 'ts-jest',
//   setupFiles: ['./jest/setup.js'],
// }

// module.exports = {
//   projects: [
//     {
//       ...commonConfigh,
//       runner: '@jest-runner/electron',
//       testEnvironment: '@jest-runner/electron/environment',
//       testMatch: ['./src/Pint2D/*.(spec|test).tsx'],
//     },
//     {
//       ...commonConfigh,
//       runner: '@jest-runner/electron/main',
//       testEnvironment: 'node',
//     },
//   ],
// };

module.exports = {
  verbose: true,
  // notify: true,
  preset: 'ts-jest',
  setupFiles: ['./jest/setup.js'],
  runner: '@jest-runner/electron',
  testEnvironment: '@jest-runner/electron/environment',
};

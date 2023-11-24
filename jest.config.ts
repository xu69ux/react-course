const nextJest = require('next/jest')

const createJestConfig = nextJest({
  dir: './',
})

const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jest-environment-jsdom',
  testPathIgnorePatterns: ['/node_modules/', './__tests__/__mocks__', './__tests__/setupTests'],
  collectCoverage: true,
  collectCoverageFrom: [
    "**/pages/**/*.{js,jsx,ts,tsx}",
    "**/components/**/*.{js,jsx,ts,tsx}",
    "!**/node_modules/**",
    "!**/vendor/**",
    "!jest.config.ts",
    "!.next/**",
    "!pages/api/**",
    "!pages/_document.tsx",

  ],
  coverageReporters: ['json', 'lcov', 'text', 'clover'],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
}

module.exports = createJestConfig(customJestConfig)
export default {
  preset: "ts-jest",
  testEnvironment: "jest-environment-jsdom",
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
  moduleNameMapper: {
    "\\.(css|less|scss|sss|styl)$": "identity-obj-proxy",
    "\\.(gif|ttf|eot|svg|png)$": "identity-obj-proxy",
  },
  collectCoverage: true,
  collectCoverageFrom: [
    "src/**/*.{js,jsx,ts,tsx}",
    "!<rootDir>/node_modules/",
    "!<rootDir>/path/to/dir/",
  ],
  coverageReporters: ["text", "lcov"],
  coverageThreshold: {
    global: {
      branches: 50,
      functions: 50,
      lines: 80,
      statements: 80,
    },
  },
  coveragePathIgnorePatterns: [
    "<rootDir>/src/utils/usefulFunction.ts",
    "<rootDir>/src/main.tsx",
    "<rootDir>/src/vite-env.d.ts",
  ],
  setupFilesAfterEnv: ["<rootDir>/src/__test__/setupTests.ts"],
};

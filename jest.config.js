// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

module.exports = {
  clearMocks: false,
  coverageDirectory: "coverage",
   coveragePathIgnorePatterns: [
     "\\\\node_modules\\\\"
  ],
  testMatch: [
    "**/tests/**/*.[jt]s?(x)",
    "**/?(*.)+(spec|test).[tj]s?(x)"
  ],
  testPathIgnorePatterns: [
    "\\\\node_modules\\\\"
  ],
  testURL: "http://localhost",
  verbose: true,
};

module.exports = {
  testEnvironment: "node",
  testMatch: ["<rootDir>/__tests__/*.test.+(js)"],
  testPathIgnorePatterns: ["<rootDir>/node_modules/"],
  coverageDirectory: "./test_reports",
};

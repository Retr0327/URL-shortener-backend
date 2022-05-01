module.exports = {
  clearMocks: true,
  coverageDirectory: "coverage",
  coveragePathIgnorePatterns: ["<rootDir>/node_modules/(?!@foo)"],
  moduleFileExtensions: ["ts", "js"],
  moduleNameMapper: {
    "src/(.*)": "<rootDir>/src/$1",
  },
  testEnvironment: "node",
  testRegex: "(/tests/.*|(\\.|/)(test|spec))\\.(js?|ts?)$",
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
  },
  transformIgnorePatterns: ["<rootDir>/node_modules/(?!@foo)"],
  setupFiles: ["<rootDir>/test/__mocks__/setEnvVars.js"],
};

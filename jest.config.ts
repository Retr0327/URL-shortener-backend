import type { Config } from "@jest/types";

const config: Config.InitialOptions = {
  preset: "ts-jest",
  testEnvironment: "node",
  verbose: true,
  clearMocks: true,
  collectCoverage: true,
  collectCoverageFrom: ["src/**/*.ts"],
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
  },
  moduleFileExtensions: ["ts", "js"],
  moduleNameMapper: {
    "src/(.*)": "<rootDir>/src/$1",
    "@config": "<rootDir>/src/api/config/index.ts",
    "@validations": "<rootDir>/src/api/validations/index.ts",
    "@middlewares": "<rootDir>/src/api/middlewares/index.ts",
    "@utils": "<rootDir>/src/api/utils/index.ts",
    "@controllers": "<rootDir>/src/api/controllers/index.ts",
    "@routes": "<rootDir>/src/api/routes/index.ts",
    "@models": "<rootDir>/src/api/models/index.ts",
    "@types": "<rootDir>/src/api/types/index.ts",
  },
  testTimeout: 5000,
  setupFiles: ["<rootDir>/test/__mocks__/setEnvVars.js"],
  testRegex: "(/tests/.*|(\\.|/)(test|spec))\\.(js?|ts?)$",
};

export default config;
import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  verbose: true,
  clearMocks: true,
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.ts'],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'js'],
  moduleNameMapper: {
    'src/(.*)': '<rootDir>/src/$1',
    '@config': '<rootDir>/src/api/config/index.ts',
    '@validations/(.*)': '<rootDir>/src/api/validations/$1',
    '@middlewares/(.*)': '<rootDir>/src/api/middlewares/$1',
    '@utils/(.*)': '<rootDir>/src/api/utils/$1',
    '@controllers/(.*)': '<rootDir>/src/api/controllers/$1',
    '@routes': '<rootDir>/src/api/routes/index.ts',
    '@models': '<rootDir>/src/api/models/index.ts',
    '@types': '<rootDir>/src/api/types/index.ts',
  },
  testTimeout: 5000,
  setupFiles: ['<rootDir>/test/__mocks__/setEnvVars.js'],
  testRegex: '(/tests/.*|(\\.|/)(test|spec))\\.(js?|ts?)$',
};

export default config;

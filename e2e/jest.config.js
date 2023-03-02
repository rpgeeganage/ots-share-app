module.exports = {
  preset: 'jest-playwright-preset',
  moduleFileExtensions: ['ts', 'js'],
  transform: {
    '^.+\\.ts?$': [
      'ts-jest',
      {
        isolatedModules: true,
        tsconfig: './tsconfig.json',
      },
    ],
  },
  modulePathIgnorePatterns: ['<rootDir>/build/'],
  testPathIgnorePatterns: ['/node_modules/', '<rootDir>/build/'],
  testRegex: '.*\\.spec\\.ts$',
  testEnvironment: 'node',
  collectCoverage: false,
  reporters: ['default'],
  testTimeout: 20000000,
  testEnvironmentOptions: {
    'jest-playwright': {
      browsers: ['firefox'],
    },
  },
};

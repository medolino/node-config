module.exports = {
  // Automatically clear mock calls and instances between every test
  clearMocks: true,
  // The directory where Jest should output its coverage files
  coverageDirectory: 'coverage',
  // An array of regexp pattern strings used to skip coverage collection
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '__tests__',
    '__data__',
    '__mocks__',
    '__helpers__',
    '__expected__',
    '__mock-helpers__',
    '__data-helpers__'
  ],
  // A list of reporter names that Jest uses when writing coverage reports
  coverageReporters: ['json', 'html', 'text', 'lcov', 'clover'],
  // Ignore helper and data files
  testPathIgnorePatterns: [
    '__data__',
    '__mocks__',
    '__helpers__',
    '__expected__',
    '__mock-helpers__',
    '__data-helpers__'
  ],
  // Automatically reset mock state between every test
  resetMocks: false,
  // Reset the module registry before running each individual test
  resetModules: true,
  // Automatically restore mock state between every test
  restoreMocks: true,
  // Indicates whether each individual test should be reported during the run
  verbose: true,
  // Extend expect with additional matchers
  setupFilesAfterEnv: ['jest-extended/all']
}

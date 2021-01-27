module.exports = {
  setupFiles: ['<rootDir>/env.loader.js'],
  coverageDirectory: '<rootDir>/storage/coverage',
  collectCoverageFrom: [
    'app/**/*.js',
    '!**/node_modules/**',
    '!app/index.js',
    '!assets/index.js'
  ],
  moduleFileExtensions: ['js'],
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/assets/mocks/fileMock.js',
    '\\.(css|scss)$': 'identity-obj-proxy'
  },
  transform: {
    '^.+\\.js$': '<rootDir>/node_modules/babel-jest'
  },
  testRegex: '(/tests/.*|(\\.|/)(test|spec))\\.jsx?$',
  testPathIgnorePatterns: ['<rootDir>/node_modules/']
};

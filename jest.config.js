module.exports = {
  setupFilesAfterEnv: ['<rootDir>/config/jest/setupTest.js'],
  coverageDirectory: '<rootDir>/storage/coverage',
  collectCoverageFrom: [
    'app/**/*.js',
    'app/views/**/*.vue',
    '!**/node_modules/**',
    '!app/index.js',
    '!assets/index.js'
  ],
  moduleFileExtensions: ['js', 'vue'],
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/config/jest/fileMock.js',
    '\\.(css|scss)$': '<rootDir>/config/jest/styleMock.js'
  },
  snapshotSerializers: ['<rootDir>/node_modules/jest-serializer-vue'],
  transform: {
    '.*\\.(vue)$': '<rootDir>/node_modules/vue-jest',
    '^.+\\.js$': '<rootDir>/node_modules/babel-jest'
  },
  testRegex: '(/tests/.*|(\\.|/)(test|spec))\\.jsx?$',
  testPathIgnorePatterns: ['<rootDir>/node_modules/']
};

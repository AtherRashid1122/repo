module.exports = {
  preset: 'react-native',
  coverageDirectory: 'coverage',
  testMatch: [
    '**/__tests__/**/*.spec.js',
  ],
  setupFiles: ['./jest.setup.js'],
  transform: {
    "^.+\\.jsx?$": "babel-jest",
  },
  "transformIgnorePatterns": [
    "node_modules/(?!(jest-)?react-native|react-clone-referenced-element|@react-native-community|expo(nent)?|@expo(nent)?/.*|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules|sentry-expo|native-base|@sentry/.*)"
  ]
};

module.exports = {
  transform: { '\\.ts$': ['ts-jest'], '\\.js?$': 'babel-jest' },
  globals: {
    'ts-jest': {
      diagnostics: false,
    },
  },
  transformIgnorePatterns: ['/node_modules/(?!router6)'],
};

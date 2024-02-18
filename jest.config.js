
module.exports = {
    testEnvironment: 'jsdom',
  
    moduleNameMapper: {
 
      '\\.module\\.css$': 'identity-obj-proxy',
  
      '\\.css$': '<rootDir>/__mocks__/styleMock.js',
      '\\.(gif|jpg|jpeg|png|svg|webp)$': '<rootDir>/__mocks__/fileMock.js',
    },
  };
  
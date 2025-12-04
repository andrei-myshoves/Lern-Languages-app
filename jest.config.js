export default {
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'],
    moduleNameMapper: {
        '\\.(css|scss)$': 'identity-obj-proxy',
    },
    transform: {
        '^.+\\.(js|jsx)$': 'babel-jest',
    },
}

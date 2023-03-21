module.exports = {
	testEnvironment: 'jsdom',
	transform: { '\\.(js|jsx)$': ['babel-jest', { configFile: './babel.jest.config.js' }] },

	testPathIgnorePatterns: ['/node_modules/'],
};

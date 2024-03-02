import type { Config } from 'jest';

const config: Config = {
	preset: 'ts-jest',
	testEnvironment: 'jsdom',
	transform: {
		'^.+\\.tsx?$': 'ts-jest',
		'^.+\\.js$': 'babel-jest',
	},
	// Transform the cbor-x package with babel-jest
	transformIgnorePatterns: ['node_modules/(?!(cbor-x)/)'],
};

export default config;

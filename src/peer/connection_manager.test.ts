import ConnectionManager from './connection_manager';
import Peer from 'peerjs';

describe('ConnectionManager', () => {
	let connectionManager: ConnectionManager;

	beforeEach(() => {
		connectionManager = new ConnectionManager();
	});

	it('should return a Peer object', () => {
		expect(connectionManager.getPeer()).toBeInstanceOf(Peer);
	});

	jest.mock('peerjs', () => {
		return jest.fn().mockImplementation(() => {
			throw new Error('Unable to connect to the PeerJS server');
		});
	});

	it('should throw an error if unable to connect to the PeerJS server', () => {
		expect(() => new ConnectionManager()).toThrow(
			'Unable to connect to the PeerJS server'
		);
	});
});

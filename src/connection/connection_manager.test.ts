import ConnectionManager from './connection_manager';
import { Peer } from 'peerjs';
import { InitializePeerError } from './connection_manager.errors';

describe('ConnectionManager', () => {
  it('should return a Peer object', () => {
    expect(new ConnectionManager().getPeer()).toBeInstanceOf(Peer);
  });

  it('should throw an error if unable to connect to the PeerJS server', () => {
    jest.isolateModules(() => {
      jest.doMock('peerjs', () => {
        return {
          Peer: jest.fn().mockImplementation(() => {
            throw new InitializePeerError();
          }),
        };
      });

      // Import the ConnectionManager inside the isolateModules function
      const ConnectionManager = jest.requireActual(
        './connection_manager'
      ).default;

      // TODO: Check for an instance of the error class instead
      expect(() => new ConnectionManager()).toThrow(new InitializePeerError());
    });
  });
});

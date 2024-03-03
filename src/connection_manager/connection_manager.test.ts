import ConnectionManager from './connection_manager';
import { Peer } from 'peerjs';

describe('ConnectionManager', () => {
  it('should return a Peer object', () => {
    expect(new ConnectionManager().getPeer()).toBeInstanceOf(Peer);
  });

  it('should throw an error if unable to connect to the PeerJS server', () => {
    jest.isolateModules(() => {
      jest.doMock('peerjs', () => {
        return {
          Peer: jest.fn().mockImplementation(() => {
            throw new Error('instantiate-peer-error');
          }),
        };
      });

      // Import the ConnectionManager inside the isolateModules function
      const ConnectionManager = jest.requireActual(
        './connection_manager'
      ).default;

      expect(() => new ConnectionManager()).toThrow('instantiate-peer-error');
    });
  });
});

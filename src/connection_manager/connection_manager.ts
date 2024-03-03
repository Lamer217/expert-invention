// Import the Peer class from the peerjs module
import Peer from 'peerjs';
import { InitializePeerError } from './connection_manager.errors';

interface ConnectionManager {
  peerId: string | null;
  connectToPeer(peerId: string): void;
}

// Define a class to manage the peer-to-peer connection
class ConnectionManager implements ConnectionManager {
  // Declare a private property to hold the Peer instance
  private peer: Peer;
  // Define the constructor method
  constructor() {
    this.initializePeer();
  }

  /**
   * Initializes this Peer instance and establishes a connection to the PeerJSServer.
   * @throws {Error} Throws an error if there is an issue instantiating the Peer instance.
   */
  private initializePeer(): void {
    try {
      // Create a new Peer instance
      // No ID is given, one will be generated automatically
      this.peer = new Peer({ debug: 2 }); // Print out warns and errors
    } catch (error) {
      throw new InitializePeerError();
    }

    // Add an event listener for the 'open' event
    // This event is triggered when the connection to the PeerServer is established
    this.peer.on('open', (id) => {
      this.peerId = id;
      // Log the ID of the peer to the console
      console.log('My peer ID is: ' + this.peerId);
    });
  }

  getPeer(): Peer {
    return this.peer;
  }
}

export default ConnectionManager;

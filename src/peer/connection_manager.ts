// Import the Peer class from the peerjs module
import Peer from 'peerjs';

interface ConnectionManager {
  id: string | null;
  connectToPeer(peerId: string): void;
}

// Define a class to manage the peer-to-peer connection
class ConnectionManager implements ConnectionManager {
  // Declare a private property to hold the Peer instance
  private peer: Peer;
  // Define the constructor method
  constructor() {
    try {
      // Create a new Peer instance
      // No ID is given, one will be generated automatically
      this.peer = new Peer({ debug: 2 }); // Print out warns and errors

      // Add an event listener for the 'open' event
      // This event is triggered when the connection to the PeerServer is established
      this.peer.on('open', (id) => {
        this.id = id;
        // Log the ID of the peer to the console
        console.log('My peer ID is: ' + this.id);
      });
    } catch (error) {
      throw new Error('instantiate-peer-error');
    }
  }

  getPeer(): Peer {
    return this.peer;
  }
}

export default ConnectionManager;

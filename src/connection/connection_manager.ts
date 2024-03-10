// Import the Peer class from the peerjs module
import Peer from 'peerjs';
import { InitializePeerError } from './connection_manager.errors';
import QrScanner from 'qr-scanner';
import SettingsManager from 'src/settings/settings_manager';

// Define a class to manage the peer-to-peer connection
export default class ConnectionManager {
  // Declare a private property to hold the Peer instance
  private peer: Peer;
  private settingsManager: SettingsManager;
  peerId: string | null;
  // Define the constructor method, expecting the settings manager
  constructor(settingsManager: SettingsManager) {
    this.settingsManager = settingsManager;
  }

  /**
   * Initializes this Peer instance and establishes a connection to the PeerJSServer.
   * @throws {Error} Throws an error if there is an issue instantiating the Peer instance.
   */
  initializePeer(): Promise<void> {
    // Check for the existing peer
    if (this.peer) {
      return Promise.resolve();
    }

    // Get the peerId from the settings manager
    const existingPeerId = this.settingsManager.getSetting('peerId');

    return new Promise((resolve, reject) => {
      try {
        const options = {
          debug: 2, // Print out warns and errors
        };

        // Provide the peerId from the settings object
        if (existingPeerId) this.peer = new Peer(existingPeerId, options);
        // Create a new Peer instance with a random ID
        else this.peer = new Peer(options);

        // Add an event listener for the 'open' event
        // This event is triggered when the connection to the PeerServer is established
        this.peer.on('open', (assignedPeerId) => {
          this.peerId = assignedPeerId;

          // Save the peerId to the settings manager, if different from the existing one
          if (existingPeerId !== assignedPeerId)
            this.settingsManager.setSetting('peerId', assignedPeerId);

          // Log the ID of the peer to the console
          console.log('My peer ID is: ' + assignedPeerId);
          resolve(); // Resolve the promise on 'open'
        });

        // Add an event listener for the 'error' event
        // This event is triggered when there is an error in the Peer instance
        this.peer.on('error', (error) => {
          reject(error); // Reject the promise in case of errors
        });
      } catch (error) {
        reject(new InitializePeerError());
      }
    });
  }

  getPeer(): Peer {
    return this.peer;
  }
  /**
   * Scans for a QR code in the given video stream and returns the decoded data.
   */
  private async scanQR(videoElement: HTMLVideoElement): Promise<string> {
    return new Promise((resolve, reject) => {
      try {
        // Instantiate a new QrScanner object
        new QrScanner(
          videoElement, // The video element to use for the scanner feed display
          (result: QrScanner.ScanResult) => {
            resolve(result.data); // Resolve with the scanned result string
          },
          {
            onDecodeError: reject, // Reject with the error if there is an issue decoding the QR code
            preferredCamera: 'environment',
            highlightCodeOutline: true,
          }
        ).start(); // Start the QR scanner
      } catch (error) {
        reject(error); // Reject with the error if there is an issue starting the QR scanner
      }
    });
  }
}

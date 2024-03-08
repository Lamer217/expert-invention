import { App, Modal } from 'obsidian';
import ConnectionManager from 'src/connection_manager/connection_manager';

export default class ScanModal extends Modal {
  connectionManager: ConnectionManager;

  constructor(app: App, connectionManager: ConnectionManager) {
    super(app);
    this.connectionManager = connectionManager;
  }

  async onOpen() {
    const { contentEl, close } = this;
    // Create a video element to display the camera feed
    const videoElement: HTMLVideoElement = getVideoElement(contentEl);
    // Pass the video element to the connection manager to scan the QR code
    // and get the resulting peer ID
    const scannedPeerId = await this.connectionManager.scanQR(videoElement);
    // Log the result for now
    console.log('Scan success!');
    console.log(scannedPeerId);
    // Close the modal
    close();
  }
}

/**
 * Creates and returns an HTMLVideoElement for displaying video feeds from the device's camera.
 *
 * @param contentEl - The parent HTMLElement where the video element will be created.
 * @returns The created HTMLVideoElement.
 */
function getVideoElement(contentEl: HTMLElement): HTMLVideoElement {
  // Create a new video element
  const videoElement: HTMLVideoElement = contentEl.createEl('video');
  // Set the necessary attributes
  videoElement.autoplay = true;
  videoElement.playsInline = true;
  videoElement.muted = true;
  videoElement.controls = false;
  // Return the video element
  return videoElement;
}

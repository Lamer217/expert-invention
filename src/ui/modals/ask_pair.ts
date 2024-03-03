import { Modal, App } from 'obsidian';
import ConnectionManager from 'src/connection_manager/connection_manager';

/**
 * Represents a modal for asking the user
 * if they want to start pairing with another device.
 */
export default class AskPairModal extends Modal {
  connectionManager: ConnectionManager;

  constructor(app: App, connectionManager: ConnectionManager) {
    // Provide the application instance to the superclass
    super(app);
    // Set the connection manager
    this.connectionManager = connectionManager;
  }

  onOpen() {
    this.setTitle('Start pairing?');
    this.contentEl.createEl('p', {
      text: `Would you like to pair with another device?
Scan the peer device connection code or share yours.
You can always initialize pairing from the command panel, or the plugin settings.`,
    });

    // Add a button to start scanning peer connection code
    this.contentEl
      .createEl('button', { text: 'Scan' })
      .addEventListener('click', () => {
        // this.connectionManager.scanQR();
        this.close();
      });

    // TODO: Implement a share code button and method
    // TODO: Implement don't ask again checkbox and logic
  }
}

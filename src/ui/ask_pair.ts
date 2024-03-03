import { Modal } from 'obsidian';
import ConnectionManager from 'src/connection_manager/connection_manager';

/**
 * Asks the user if they want to start pairing with another device.
 * Displays a modal with options to scan a QR code or share a connection code.
 * @param connectionManager - The connection manager instance.
 */
export function askPair(connectionManager: ConnectionManager) {
  // Instantiate a new modal
  const modal = new Modal(this.app);
  // Set the title of the modal
  modal.setTitle('Start pairing?');
  // Set the modal message
  modal.contentEl.createEl('p', {
    text: `Would you like to pair with another device?
Scan the peer device connection code or share yours.
You can always initialize pairing from the command panel, or the plugin settings.`,
  });
  // Create a scan button
  modal.contentEl
    .createEl('button', { text: 'Scan' })
    .addEventListener('click', () => {
      // Initiate the scanning process
      // TODO: Implement the scanQRCode method
      // connectionManager.scanQRCode();
      modal.close();
    });
  // TODO: Implement a share code button and method
  // TODO: Implement don't ask again checkbox and logic
  modal.open();
}

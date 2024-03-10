import { Notice, Plugin } from 'obsidian';
import ConnectionManager from 'src/connection/connection_manager';
import AskPairModal from 'src/ui/modals/ask_pair';

export default class CommunityPlugin extends Plugin {
  async onload() {
    // Instantiate the ConnectionManager that will initialize a Peer instance
    const connectionManager = new ConnectionManager();
    console.log(connectionManager);

    // Show a toaster notifying the user that the plugin has started successfully
    new Notice('Plugin has started successfully', 2000);

    // Create a modal suggesting to pair with another device
    new AskPairModal(this.app, connectionManager).open();
  }
  async onunload() {
    // Release any resources configured by the plugin.
  }
}

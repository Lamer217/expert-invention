import { Notice, Plugin } from 'obsidian';
import ConnectionManager from 'src/connection/connection_manager';
import SettingsManager from 'src/settings/settings_manager';
import CredentialsModal from 'src/ui/modals/credentials';

export default class CommunityPlugin extends Plugin {
  private settingsManager: SettingsManager;
  private connectionManager: ConnectionManager;

  async onload() {
    this.settingsManager = new SettingsManager(this);
    // Initialize the settings manager
    await this.settingsManager.init();
    // Instantiate the ConnectionManager
    this.connectionManager = new ConnectionManager(this.settingsManager);
    // Initialize this peer
    await this.connectionManager.initializePeer();

    this.addCommand({
      id: 'show-credentials',
      name: 'Show my connection credentials',
      callback: () => {
        // Display the connection credentials
        new CredentialsModal(
          this.app,
          this.settingsManager.getSetting('peerId')
        ).open();
      },
    });

    // Show a toaster notifying the user that the plugin has started successfully
    new Notice('Plugin has started successfully', 2000);
  }
}

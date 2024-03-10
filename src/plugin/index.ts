import { Notice, Plugin } from 'obsidian';
import ConnectionManager from 'src/connection/connection_manager';
import SettingsManager from 'src/settings/settings_manager';

export default class CommunityPlugin extends Plugin {
  private settingsManager: SettingsManager;

  async onload() {
    this.settingsManager = new SettingsManager(this);
    // Initialize the settings manager
    await this.settingsManager.init();
    // Instantiate the ConnectionManager
    const connectionManager = new ConnectionManager(this.settingsManager);
    // Initialize this peer
    await connectionManager.initializePeer();

    // Show a toaster notifying the user that the plugin has started successfully
    new Notice('Plugin has started successfully', 2000);
  }
}

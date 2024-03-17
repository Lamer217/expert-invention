import { App, Modal } from 'obsidian';
import { PluginSettings } from 'src/settings/settings_manager';

export default class CredentialsModal extends Modal {
  private peerId: PluginSettings['peerId'];
  constructor(app: App, peerId: PluginSettings['peerId']) {
    super(app);
    this.peerId = peerId;
  }

  onOpen(): void {
    if (!this.peerId) {
      this.contentEl.createEl('p', {
        text: '– No peer ID found. Please try initializing peer again.',
      });
      return;
    }

    const { contentEl } = this;
    this.setTitle(this.peerId);

    contentEl.createEl('p', {
      text: '– This is your peer ID. Enter it on another device to connect and sync.',
    });
  }
}

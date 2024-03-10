import CommunityPlugin from '../plugin/index';

/**
 * Interface for the settings of the plugin.
 */
export interface PluginSettings {
  peerId?: string;
}

/**
 * Class to manage the settings of the plugin.
 */
export default class SettingsManager {
  private settings: PluginSettings;

  /**
   * Creates a new SettingsManager.
   * @param {CommunityPlugin} plugin - The plugin to manage settings for.
   */
  constructor(private plugin: CommunityPlugin) {}

  /**
   * Initializes the SettingsManager by loading the settings from disk.
   * @returns {Promise<void>}
   */
  async init(): Promise<void> {
    await this.loadSettings();
  }

  /**
   * Loads the settings from disk.
   * @returns {Promise<void>}
   */
  async loadSettings(): Promise<void> {
    this.settings = (await this.plugin.loadData()) as PluginSettings;
  }

  /**
   * Gets a specific setting.
   * @param {keyof PluginSettings} key - The key of the setting to get.
   * @returns {PluginSettings[keyof PluginSettings] | undefined} The setting, or undefined if it does not exist.
   */
  getSetting(
    key: keyof PluginSettings
  ): PluginSettings[keyof PluginSettings] | undefined {
    return this.settings ? this.settings[key] : undefined;
  }

  /**
   * Gets all settings.
   * @returns {PluginSettings | undefined} The settings, or undefined if they have not been loaded.
   */
  getSettings(): PluginSettings | undefined {
    return this.settings;
  }

  /**
   * Sets a specific setting.
   * @param {keyof PluginSettings} key - The key of the setting to set.
   * @param {PluginSettings[keyof PluginSettings]} value - The new value of the setting.
   */
  setSetting(
    key: keyof PluginSettings,
    value: PluginSettings[keyof PluginSettings]
  ): void {
    if (this.settings) {
      this.settings[key] = value;
    }
  }

  /**
   * Saves the settings to disk.
   * @returns {Promise<void>}
   */
  async saveSettings(): Promise<void> {
    await this.plugin.saveData(this.settings);
  }
}

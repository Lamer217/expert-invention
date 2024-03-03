import { Plugin } from 'obsidian';
import ConnectionManager from 'src/connection_manager/connection_manager';

export default class ExamplePlugin extends Plugin {
  async onload() {
    // Configure resources needed by the plugin.
    console.log('Hello from the Example Plugin');
    const connectionManager = new ConnectionManager();
    console.log(connectionManager);
  }
  async onunload() {
    // Release any resources configured by the plugin.
  }
}

import { Plugin } from 'obsidian';

export default class ExamplePlugin extends Plugin {
  async onload() {
    // Configure resources needed by the plugin.
    console.log('Hello from the Example Plugin');
  }
  async onunload() {
    // Release any resources configured by the plugin.
  }
}

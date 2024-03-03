/*
 * @file Defines the errors that can be thrown by the ConnectionManager class.
 */

/**
 * Represents an error that can occur during the initialization of a peer.
 */
export class InitializePeerError extends Error {
  // TODO: Expect a generic error as an argument
  constructor() {
    super('initialize-peer-error');
    this.name = 'InitializePeerError';
  }
}

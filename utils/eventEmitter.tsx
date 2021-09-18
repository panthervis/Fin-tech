import React, { FunctionComponent } from "react"
import EventEmitter from "eventemitter3"

enum LocalEventAction {
  ACTIVE_SUGGEST_SEARCH = "ACTIVE_SUGGEST_SEARCH",
  SUBMIT_SUGGEST_SEARCH = "SUBMIT_SUGGEST_SEARCH",
}

class ClientEventEmitter {
  eventEmitter: any
  /**
   * Initiate the event emitter
   */
  constructor() {
    this.eventEmitter = new EventEmitter()
  }

  /**
   * Adds the @listener function to the end of the listeners array
   * for the event named @eventName
   * Will ensure that only one time the listener added for the event
   *
   * @param {string} eventName
   * @param {function} listener
   */
  on(eventName: string, listener: (payload: any) => void) {
    this.eventEmitter.on(eventName, listener)
  }

  /**
   * Will temove the specified @listener from @eventname list
   *
   * @param {string} eventName
   * @param {function} listener
   */
  removeEventListener(eventName: string, listener: (payload: any) => void) {
    this.eventEmitter.removeListener(eventName, listener)
  }

  /**
   * Will emit the event on the evetn name with the @payload
   * and if its an error set the @error value
   *
   * @param {string} event
   * @param {object} payload
   * @param {boolean} error
   */
  emit(event: string, payload: any, error = false) {
    this.eventEmitter.emit(event, payload, error)
  }

  /**
   * Returns the event emitter
   * Used for testing purpose and avoid using this during development
   */
  getEventEmitter() {
    return this.eventEmitter
  }
}
const eventEmitter = new ClientEventEmitter()
const EventEmitterProvider: FunctionComponent<{}> = props => {
  const { children } = props
  return <>{children}</>
}

export { eventEmitter, EventEmitterProvider, LocalEventAction }

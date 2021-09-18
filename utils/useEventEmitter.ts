import React from "react"
import { eventEmitter } from "./eventEmitter"

const useEventListener = (eventName: string, listener: any) => {
  React.useEffect(() => {
    eventEmitter.on(eventName, listener)
    return () => {
      eventEmitter.removeEventListener(eventName, listener)
    }
  }, [])
}

const useEventEmitter = (eventName: string, value: any, timeoutSec: number) => {
  let timeout: NodeJS.Timeout | null = null
  if (timeout) clearTimeout(timeout)
  timeout = setTimeout(() => {
    eventEmitter.emit(eventName, value)
  }, timeoutSec)
}

export { useEventListener, useEventEmitter }

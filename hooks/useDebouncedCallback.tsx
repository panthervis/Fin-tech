import React from "react"

const useDebouncedCallback = (
  cb: (...args: any[]) => any,
  interval: number = 800
) => {
  const timeout = React.useRef<any>()

  return React.useCallback(
    (...args) => {
      if (timeout.current) {
        clearTimeout(timeout.current)
      }

      timeout.current = setTimeout(() => cb(...args), interval)
    },
    [cb]
  )
}

export default useDebouncedCallback

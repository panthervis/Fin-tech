/** @jsx jsx */ jsx
import { jsx } from "@emotion/core"
import * as React from "react"

const Modal: React.FunctionComponent<any> = ({ display, children }) => {
  React.useEffect(() => {
    document.body.style.overflow = display === true ? "hidden" : "auto"
    return () => {
      document.body.style.overflow = "auto"
    }
  }, [display])

  if (!display) return null

  return (
    <div className="flex items-center justify-center">
      <div className="modal opacity-100 fixed w-full h-full top-0 left-0 flex items-center justify-center z-50">
        <div
          style={{ transition: "opacity 0.25s ease;" }}
          className="modal-overlay absolute w-full h-full bg-gray-900 opacity-50"
        ></div>
        <div className="modal-container bg-white md:w-11/12 max-w-sm md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto">
          <div className="modal-content py-4 text-left px-6 font-opensans text-xs">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Modal

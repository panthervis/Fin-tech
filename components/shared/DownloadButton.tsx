/** @jsx jsx */ jsx
import { jsx } from "@emotion/core"
import * as React from "react"
import Button from "./Button"

const DownloadButton: React.FunctionComponent<any> = props => (
  <Button
    className={`inline-flex items-center bg-white font-bold text-${props.color}`}
    css={{ background: props.bgColor ? props.bgColor : "white" }}
    {...props}
  >
    <img className="h-5" alt="Download Icon" src={props.iconURL} />
    <span className="pl-1 align-middle relative">{props.children}</span>
  </Button>
)

export default DownloadButton

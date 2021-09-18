/** @jsx jsx */ jsx
import { css, jsx } from "@emotion/core"
import * as React from "react"
import cn from "classnames"

const Button: React.FunctionComponent<any> = ({
  className,
  children,
  noDefaultClass,
  customCss,
  sm,
  xs,
  onClick,
}) => {
  let sizeStyle = "py-3 px-8 md:px-10 md:py-4 md:text-sm"
  if (sm) {
    sizeStyle = "py-2 px-4 md:px-5 md:py-2 md:text-sm"
  }
  if (xs) {
    sizeStyle = "py-1 px-3 md:px-3 md:py-1 text-3xs"
  }
  return (
    <button
      className={cn(
        noDefaultClass ? className : cn(className, "rounded-sm", sizeStyle),
        "items-center cursor-pointer text-xs"
      )}
      css={css`
        ${customCss}
      `}
      onClick={onClick}
      style={{ outline: "none" }}
    >
      {children}
    </button>
  )
}

export default Button

/** @jsx jsx */ jsx
import { css, jsx } from "@emotion/core"
import * as React from "react"

type DividerBlockProps = {
  colorOne: string
  colorTwo: string
  colorThree?: string
}

const DividerBlock: React.FunctionComponent<DividerBlockProps> = ({
  colorOne,
  colorTwo,
  colorThree,
}) => {
  return colorThree ? (
    <div
      className="w-full"
      css={css`
        height: 11px;
        background-image: linear-gradient(
          to right,
          ${colorOne},
          ${colorTwo} 51%,
          ${colorThree} 100%
        );
      `}
    />
  ) : (
    <div
      className="w-full"
      css={css`
        height: 11px;
        background-image: linear-gradient(
          to right,
          ${colorOne},
          ${colorTwo}
        );
      `}
    />
  )
}

export default DividerBlock

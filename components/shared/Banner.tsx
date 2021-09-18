/** @jsx jsx */ jsx
import { jsx, css } from "@emotion/core"
import * as React from "react"

type BannerProps = {
  backgroundImageUrl: string | undefined
  overlay?: React.ReactNode
  children?: any
  height?: string
  className?: string
}

const Banner: React.FunctionComponent<BannerProps> = ({
  backgroundImageUrl,
  overlay,
  children,
  height = "h-screen",
  className,
}) => (
  <React.Fragment>
    {overlay}
    <div
      className={`px-20 md:px-6 bg-cover bg-center flex relative ${height}`}
      css={css`
      background-image: url("${backgroundImageUrl}");
      @media only screen and (max-width: 768px) {
        background-position-x: 60%;
      }
    `}
    >
      <div
        className={`md:w-full md:text-center text-white z-10 relative flex flex-col justify-end ${className}`}
        css={css`
          &:last-child {
            margin-bottom: 5.4rem;
          }
          @media only screen and (max-width: 768px) {
            &:last-child {
              margin-bottom: 1rem;
            }
          }
        `}
      >
        {children}
      </div>
    </div>
  </React.Fragment>
)

export default Banner

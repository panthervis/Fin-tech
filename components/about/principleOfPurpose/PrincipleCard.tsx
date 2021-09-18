import * as React from "react"

/** @jsx jsx */ jsx
import { css, jsx } from "@emotion/core"
import cn from "classnames"

type PrincipleCardProps = {
  header: string
  content: string
  backgroundImageURL: string
  cardIconURL: string
  className?: any
  customCss?: any
  index: number
}

const PrincipleCard: React.FunctionComponent<PrincipleCardProps> = ({
  header,
  content,
  backgroundImageURL,
  cardIconURL,
  className,
  customCss,
  index,
}) => {
  const [isHover, setIsHover] = React.useState(false)
  return (
    <div
      className={cn(className, `relative`)}
      css={css`
        ${customCss}
      `}
    >
      <div
        className="w-full h-full absolute top-0 left-0 bg-bottom bg-no-repeat bg-cover text-white p-6"
        css={css`
          background-image: url("${backgroundImageURL}");
          &:hover {
            top: -1rem;
          }
          transition: all 0.3s;
          transition-timing-function: ease-out;
        `}
        onMouseEnter={() => {
          setIsHover(true)
        }}
        onMouseLeave={() => {
          setIsHover(false)
        }}
      >
        <div
          className="bg-center bg-contain bg-no-repeat mb-2"
          css={css`
          width: 1.875rem;
          height: 1.875rem;
          background-image:url("${cardIconURL}");
          @media screen and (max-width: 942px) {
            width: 3.2em;
            height: 3.2em;
          }
          @media screen and (max-width: 768px) {
            width: 2.875em;
            height: 2.875em;
          }
      `}
        ></div>
        <p
          className="text-lg font-tiemposMedium mb-2 w-4/5"
          css={css`
            @media screen and (max-width: 942px) {
              opacity: 1 !important;
              font-size: 1.8rem;
              width: 100%;
            }
          `}
        >
          {header}
        </p>
        <p
          className={`font-medium ${isHover ? "opacity-100" : "opacity-0"}`}
          css={css`
            transition: opacity 0.3s;
            transition-timing-function: ease-out;
            font-size: 0.68rem;
            @media screen and (max-width: 942px) {
              opacity: 1 !important;
              font-size: 1rem;
            }
          `}
        >
          {content}
        </p>
        <div className="absolute w-full h-full top-0 left-0 flex justify-end items-end">
          <span
            className="font-tiemposMedium opacity-30 leading-none text-bottom"
            css={css`
              font-size: 10rem;
              margin-bottom: -0.09em;
              @media (max-width: 942px) {
                margin-bottom: 0px;
                margin-right: 0.1em;
              }
              @media screen and (max-width: 425px) {
                font-size: 7rem;
              }
            `}
          >
            {index + 1}
          </span>
        </div>
      </div>
    </div>
  )
}

export default PrincipleCard

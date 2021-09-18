/** @jsx jsx */ jsx
import { jsx, css } from "@emotion/core"
import cn from "classnames"
import React from "react"
import Oval from "./teamModal/Oval.svg"
import Link from "next/link"
import ArrowDownColor from "../../../invest/productIndex/collapsibleCategory/arrowDownColor.svg"
import ArrowUpColor from "../../../invest/productIndex/collapsibleCategory/arrowUpColor.svg"

const FundAccordion: React.FunctionComponent<any> = ({ fundList }) => {
  const [isCollapsed, setIsCollapsed] = React.useState()

  return (
    <div>
      <div
        className="flex justify-start flex-no-wrap py-3 items-center pr-10 md:pr-0 cursor-pointer"
        css={css`
          border-top: none;
          border-left: none;
          border-right: none;
        `}
        onClick={() => {
          setIsCollapsed(!isCollapsed)
        }}
      >
        {isCollapsed ? (
          <ArrowUpColor
            css={css`
              min-width: 26px;
              & rect {
                fill: #751446;
              }
            `}
          />
        ) : (
          <ArrowDownColor
            css={css`
              min-width: 26px;
              & rect {
                fill: #751446;
              }
            `}
          />
        )}

        <p className="ml-5 italic font-tiempos font-light leading-tight">
          Funds I Manage
        </p>
      </div>
      <div
        className={cn(
          !isCollapsed ? "max-h-0" : "max-h-full",
          "text-xs font-opensans opacity-90 overflow-hidden"
        )}
      >
        {fundList.map((fund: any, idx: any) => (
          <div
            key={idx}
            className="text-xs font-opensans opacity-90 my-2 flex flex-no-wrap"
          >
            <span className="mr-2 mt-1">
              <Oval />
            </span>
            <Link href={"/funds/" + fund.link}>
              <a>{fund.name}</a>
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}

export default FundAccordion

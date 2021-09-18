/** @jsx jsx */ jsx
import { jsx, css } from "@emotion/core"
import * as React from "react"
import CollapseArrowDownIcon from "./collapsibleItem/collapseArrowDown.svg"
import CollapseArrowUpIcon from "./collapsibleItem/collapseArrowUp.svg"
import cn from "classnames"

type CollapsibleItemProps = {
  title: string
  className?: any
  fontSize?: any
  tightHeight?: boolean
  titleClass?: string
}

const CollapsibleItem: React.FunctionComponent<CollapsibleItemProps> = ({
  title,
  children,
  className,
  fontSize = "xs",
  tightHeight = false,
  titleClass,
}) => {
  const [isCollapsed, setIsCollapsed] = React.useState(true)
  return (
    <div
      className={cn("cursor-pointer", className, tightHeight ? "" : "py-4")}
      onClick={() => {
        setIsCollapsed(!isCollapsed)
      }}
    >
      <div
        className={cn(
          tightHeight ? "py-3" : "py-5",
          "flex justify-between flex-no-wrap border border-gray-1 items-center",
          titleClass
        )}
        css={css`
          border-top: none;
          border-left: none;
          border-right: none;
        `}
      >
        <div className={`text-${fontSize} md:text-lg`}>{title}</div>
        {isCollapsed ? (
          <CollapseArrowDownIcon className="mr-5" />
        ) : (
          <CollapseArrowUpIcon className="mr-5" />
        )}
      </div>
      <div
        className={cn(
          isCollapsed ? "max-h-0" : "max-h-full my-5",
          "text-xs font-opensans opacity-90 overflow-hidden"
        )}
      >
        {children}
      </div>
    </div>
  )
}

export default CollapsibleItem

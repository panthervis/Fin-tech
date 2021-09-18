/** @jsx jsx */ jsx
import { jsx, css } from "@emotion/core"
import * as React from "react"
import ArrowDownColor from "./collapsibleCategory/arrowDownColor.svg"
import ArrowUpColor from "./collapsibleCategory/arrowUpColor.svg"
import cn from "classnames"
import FundDataContext from "../FundDataContext"
import stringToUnderscore from "../../../utils/stringToUnderscore"
import LocaleContext from "../../shared/context/localeContext"
import AssetsTable from "./AssetsTable"

type CollapsibleCategoryProps = {
  assetClass: AssetClass
  initialCollapsion?: boolean
  isShowAllFunds?: boolean
  setIsShowAllFunds?: any
}

const CollapsibleCategory: React.FunctionComponent<CollapsibleCategoryProps> = ({
  assetClass,
  initialCollapsion,
  isShowAllFunds,
  setIsShowAllFunds,
}) => {
  const [isCollapsed, setIsCollapsed] = React.useState(initialCollapsion)
  let { allFunds }: any = React.useContext(FundDataContext)
  const locale: any = React.useContext(LocaleContext)
  const [title, setTitle] = React.useState()
  React.useEffect(() => {
    if (locale.language === "fr-CA") {
      setTitle(assetClass.fields && assetClass.fields.frenchClassName)
    } else {
      setTitle(assetClass.fields && assetClass.fields.className)
    }
  }, [locale.language])
  allFunds = allFunds.filter((fund: any) => {
    return fund.asset_categories.indexOf(assetClass.fields.className) > -1
  })

  React.useEffect(() => {
    if (isShowAllFunds) {
      setIsCollapsed(false)
      setIsShowAllFunds(false)
    }
  }, [isShowAllFunds])

  const [funds, setFunds] = React.useState(allFunds)
  return allFunds ? (
    <div id={`${stringToUnderscore(title)}`}>
      <div
        className="flex justify-start flex-no-wrap border border-gray-1 py-3 items-center pr-10 md:pr-0 cursor-pointer"
        css={css`
          border-top: none;
          border-left: none;
          border-right: none;
        `}
        onClick={() => {
          setIsCollapsed(!isCollapsed)
          setFunds(allFunds)
        }}
      >
        {isCollapsed ? (
          <ArrowDownColor
            css={css`
              min-width: 26px;
              & rect {
                fill: ${assetClass.fields &&
                  assetClass.fields.themeColorWithoutOpacity};
              }
            `}
          />
        ) : (
          <ArrowUpColor
            css={css`
              min-width: 26px;
              & rect {
                fill: ${assetClass.fields &&
                  assetClass.fields.themeColorWithoutOpacity};
              }
            `}
          />
        )}
        <p className="ml-5 text-xs uppercase w-2/5">{title}</p>
        <p
          className="font-opensans text-gray-16 md:hidden w-3/5"
          css={css`
            font-size: 0.625rem;
          `}
        >
          {assetClass.fields && assetClass.fields.shortDescription}
        </p>
      </div>
      <div
        className={cn(
          isCollapsed ? "max-h-0" : "max-h-full my-5 ",
          "text-xs font-opensans opacity-90 overflow-hidden"
        )}
      >
        <div className="flex flex-wrap justify-center sm:block">
          <AssetsTable
            funds={funds}
            assetClass={assetClass}
            assetClassName={assetClass.fields.className}
          />
        </div>
      </div>
    </div>
  ) : null
}

export default CollapsibleCategory

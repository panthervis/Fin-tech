/** @jsx jsx */ jsx
import React from "react"
import { jsx, css } from "@emotion/core"
import Link from "next/link"
import ToolTip from "react-tooltip"
import sortBy from "lodash/sortBy"
import _ from "lodash"
import ReactMarkdown from "react-markdown"

import LocaleContext from "../../shared/context/localeContext"
import Button from "../../shared/Button"
import InfoIcon from "../../../public/info.svg"
import DownloadIcon from "../../../public/downloadArrowGreen.svg"

const TOOLTIP_TEXT = `<p>Distribution yield is calculated as</p>
<p>the most recent distribution which</p>
<p>is then annualized and expressed </p>
<p>as % of current NAV of the fund.</p>`

const SORTS: any = {
  NONE: (list: [any]) => list,
  NAME: (list: [any]) => sortBy(list, "name"),
  ETF: (list: [any]) => sortBy(list, "eft"),
  YIELD: (list: [any]) => sortBy(list, "yield"),
}

const orderBySpecificOrder = (funds: any, order: string[]) => {
  return _.sortBy(funds, fund => {
    return _.indexOf(order, fund.code) > -1 ? _.indexOf(order, fund.code) : 99
  })
}

const fundsOrderByCategory: any = {
  Alternatives: [
    "PYF",
    "PAYF",
    "PSY",
    "PHE",
    "PHW",
    "PMM",
    "REDCOP",
    "RTA",
    "PRA",
  ],
  "Active Fixed Income": [
    "BND",
    "IGB",
    "SYLD",
    "FLOT",
    "PBD",
    "PCF",
    "RPS",
    "RIGP",
    "RPU",
    "PFU",
    "RBP_A",
  ],
  Equity: [
    "PDF",
    "PDIV",
    "PUD",
    "PID",
    "REM",
    "BNC",
    "PUB",
    "RDE",
    "PHR",
    "PBI",
    "MJJ",
    "CBSX",
    "PINV",
    "BHAV",
    "REDSEQ",
    "REDSOP",
    "REDRGI",
    "RAMEGQ",
    "RAMING",
  ],
  "Private Assets": ["OM"],
  "Multi-Asset Class": ["PRP", "PINC", "PIN", "RAMPEN"],
  Cash: ["PSA", "PSU_U", "PMT", "PMR"],
  Commodities: ["KILO", "SBT"],
}

const AssetsTable: React.FC<any> = ({ funds, assetClass, assetClassName }) => {
  const locale: any = React.useContext(LocaleContext)
  const [sortKey, setSortKey] = React.useState("NONE")
  const [isSortReverse, setIsSortReverse] = React.useState(false)
  const onSort = (_sortKey: string) => {
    const _isSortReverse = _sortKey === sortKey && !isSortReverse
    setSortKey(_sortKey)
    setIsSortReverse(_isSortReverse)
  }
  if (fundsOrderByCategory[assetClassName]) {
    funds = orderBySpecificOrder(funds, fundsOrderByCategory[assetClassName])
  }
  const sortedList = funds && SORTS[sortKey](funds)
  const reverseSortedList = isSortReverse ? sortedList.reverse() : sortedList

  const documentNamesMap: any = {
    "en-CA": {
      product: "PRODUCT",
      etf: "ETF",
      class_f: "CLASS F",
      mgmt_fee: "MGMT FEE",
      yield: "YIELD",
      brochure: "BROCHURE",
    },
    "fr-CA": {
      product: "PRODUIT",
      etf: "FNB",
      class_f: "CATÉGORIE F",
      mgmt_fee: "MGMT FEE",
      yield: "RENDEMENT",
      brochure: "BROCHURE",
    },
  }
  return (
    <>
      <table className="w-11/12">
        <thead
          className="text-gray-18"
          css={css`
            font-size: 0.625rem;
          `}
        >
          <tr>
            <td className="pl-3 w-5/12 sm:w-8/12 sm:pl-2">
              <Sort onSort={onSort} sortKey="NAME">
                {isSortReverse && sortKey === "NAME" ? (
                  <>
                    {documentNamesMap[locale.language].product}
                    <BlackSpan>&#9650;</BlackSpan>
                  </>
                ) : (
                  <>
                    {documentNamesMap[locale.language].product}
                    <BlackSpan>&#9660;</BlackSpan>
                  </>
                )}
              </Sort>
            </td>
            <td className="pl-3 w-1/12 sm:hidden">
              <Sort onSort={onSort} sortKey="ETF">
                {isSortReverse && sortKey === "ETF" ? (
                  <>
                    {documentNamesMap[locale.language].etf}
                    <BlackSpan>&#9650;</BlackSpan>
                  </>
                ) : (
                  <>
                    {documentNamesMap[locale.language].etf}{" "}
                    <BlackSpan>&#9660;</BlackSpan>
                  </>
                )}
              </Sort>
            </td>
            <td className="pl-3 w-1/12 sm:hidden">
              {" "}
              {documentNamesMap[locale.language].class_f}
            </td>
            <td className="text-center w-1/12 sm:hidden">
              {" "}
              {documentNamesMap[locale.language].mgmt_fee}
            </td>
            <td
              className="pl-3 w-1/12 sm:w-1/4 sm:pl-2"
              css={{ whiteSpace: "nowrap" }}
            >
              <span data-tip={TOOLTIP_TEXT}>
                <Sort onSort={onSort} sortKey="YIELD">
                  {isSortReverse && sortKey === "YIELD" ? (
                    <>
                      {documentNamesMap[locale.language].yield}
                      <BlackSpan>
                        &#9650;{" "}
                        <InfoIcon
                          css={{
                            display: "inline",
                            fill: assetClass.fields
                              ? assetClass.fields.themeColorWithoutOpacity
                              : "#D3C07D",
                          }}
                        />
                      </BlackSpan>
                    </>
                  ) : (
                    <>
                      {documentNamesMap[locale.language].yield}
                      <BlackSpan>
                        &#9660;{" "}
                        <InfoIcon
                          css={{
                            display: "inline",
                            fill: assetClass.fields
                              ? assetClass.fields.themeColorWithoutOpacity
                              : "#D3C07D",
                          }}
                        />
                      </BlackSpan>
                    </>
                  )}
                </Sort>
              </span>
            </td>
            <td className="pl-4 w-2/12 sm:w-1/4 sm:pl-2">
              &nbsp;&nbsp;&nbsp;
              {documentNamesMap[locale.language].brochure}
            </td>
          </tr>
        </thead>
        <tbody>
          {reverseSortedList &&
            reverseSortedList.map((fund: any, index: number) => (
              <tr
                css={{
                  height: "90px",
                  color: "#2E3C3B",
                  background: index % 2 ? "#F5F5F4" : "#fff",
                }}
                key={reverseSortedList + "_" + index}
              >
                <td className="p-3">
                  {/^http/.test(fund.url_name) ? (
                    <a
                      css={{
                        color: assetClass.fields
                          ? assetClass.fields.themeColorWithoutOpacity
                          : "#D3C07D",
                        cursor: "pointer",
                        textDecoration: "underline",
                      }}
                      href={fund.url_name}
                    >
                      {fund.name}{" "}
                    </a>
                  ) : (
                    <Link href={`/funds/${fund.url_name}`}>
                      <span
                        css={{
                          color: assetClass.fields
                            ? assetClass.fields.themeColorWithoutOpacity
                            : "#D3C07D",
                          cursor: "pointer",
                          textDecoration: "underline",
                        }}
                      >
                        {fund.name}
                      </span>
                    </Link>
                  )}
                  <p
                    className="text-gray-18"
                    css={css`
                      font-size: 0.625rem;
                    `}
                  >
                    <ReactMarkdown
                      source={
                        fund.contentfulFields &&
                        fund.contentfulFields.fundSubheader
                      }
                      disallowedTypes={["paragraph", "link"]}
                      unwrapDisallowed={true}
                    />
                  </p>
                </td>
                <td className="p-3 sm:hidden">
                  {fund.etf_code ? fund.etf_code : "--"}
                </td>
                <td className="p-3 sm:hidden">
                  {fund.f_code ? fund.f_code : "--"}
                </td>
                <td
                  className="p-3 text-center sm:hidden"
                  css={{ whiteSpace: "nowrap" }}
                >
                  {fund.fee}
                </td>
                <td className="p-3 text-center" css={{ whiteSpace: "nowrap" }}>
                  {fund.yield ? fund.yield + " %" : "N/A"}
                </td>
                <td className="p-3">
                  {fund.brochure ? (
                    <a href={fund.brochure} target="_self">
                      <Button
                        xs
                        className={`inline-flex items-center pl-1 pr-1`}
                        css={{
                          background: "none",
                          color: assetClass.fields
                            ? assetClass.fields.themeColorWithoutOpacity
                            : "#D3C07D",
                        }}
                      >
                        <DownloadIcon
                          fill={
                            assetClass.fields
                              ? assetClass.fields.themeColorWithoutOpacity
                              : "#D3C07D"
                          }
                        />
                        <span className="align-middle relative sm:hidden">
                          Download
                        </span>
                      </Button>
                    </a>
                  ) : (
                    ""
                  )}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <ToolTip
        place="top"
        type="dark"
        effect="solid"
        multiline
        wrapper="span"
        html
      />
    </>
  )
}

const Sort: React.FC<any> = ({ onSort, sortKey, children }) => {
  return (
    <button onClick={() => onSort(sortKey)} tabIndex={-1}>
      {children}
    </button>
  )
}

const BlackSpan: React.FC<any> = ({ children }) => {
  return <span css={{ color: "black" }}>{children}</span>
}

export default AssetsTable

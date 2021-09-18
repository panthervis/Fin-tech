/** @jsx jsx */ jsx
import { jsx, css } from "@emotion/core"
import * as React from "react"
import stringToUnderscore from "../../utils/stringToUnderscore"
import { useRouter } from "next/router"
import CollapsibleCategory from "./productIndex/CollapsibleCategory"
import InvestPageDataContext from "./InvestPageDataContext"
import AssetClassContext from "../invest/AssetClassContext"
import LocaleContext from "../shared/context/localeContext"
import _ from "lodash"
import scrollToTargetBaseNav from "../../utils/scrollToTarget"
import DownloadButton from "../shared/DownloadButton"

const ProductIndex: React.FunctionComponent<any> = ({
  isShowAllFunds,
  setIsShowAllFunds,
}) => {
  const router = useRouter()
  const locale: any = React.useContext(LocaleContext)
  const investPageData: InvestPageData = React.useContext(InvestPageDataContext)
  let assetClasses: any = React.useContext(AssetClassContext)
  const classOrder = [
    "Alternatives",
    "Active Fixed Income",
    "Equity",
    "Private Assets",
    "Multi-Asset Class",
    "Cash",
    "Commodities",
  ]
  assetClasses = _.sortBy(assetClasses, assetClass => {
    return _.indexOf(classOrder, assetClass.fields.className)
  })
  React.useEffect(() => {
    const timeOut = setTimeout(() => {
      const assets = document.getElementById(router.query.goto as string)
      if (assets && router.query && router.query.goto) {
        const navbarScrolledElm = document.getElementsByTagName("nav")[1]
        scrollToTargetBaseNav(assets, navbarScrolledElm)
      }
    }, 300)
    return () => clearTimeout(timeOut)
  }, [])

  return investPageData.fields ? (
    <div id="all-product">
      <div className="bg-gray-17 px-30 md:px-5 py-10">
        <p className="font-tiempos font-light italic text-2xl text-gray-16 p">
          {investPageData.fields.productIndexHeaderLineOne}
        </p>
        <h2
          className="font-tiemposMedium"
          css={css`
            max-width: 15rem;
          `}
        >
          {investPageData.fields.productIndexHeaderLineTwo}
        </h2>
        <div className="mt-8">
          {assetClasses &&
            assetClasses.map((assetClass: AssetClass, index: number) => {
              return (
                <CollapsibleCategory
                  isShowAllFunds={isShowAllFunds}
                  setIsShowAllFunds={setIsShowAllFunds}
                  initialCollapsion={
                    assetClass.fields &&
                    router.query.goto !==
                      stringToUnderscore(
                        locale.language === "en-CA"
                          ? assetClass.fields.className
                          : assetClass.fields.frenchClassName
                      )
                  }
                  assetClass={assetClass}
                  key={index}
                />
              )
            })}
        </div>
        <br />
        <div className="flex justify-end">
          {locale.language === "en-CA" ? (
            <a
              href="https://documents.purposeinvest.com/Product%20Sheet_en.pdf"
              className=""
              target="_self"
            >
              <DownloadButton xs color="teal-1" iconURL="/downloadArrow.svg">
                Fund Reference Guide
              </DownloadButton>
            </a>
          ) : (
            <a
              href="https://documents.purposeinvest.com/Product%20Sheet_fr.pdf"
              className=""
              target="_self"
            >
              <DownloadButton xs color="teal-1" iconURL="/downloadArrow.svg">
                Guide de référence du fonds
              </DownloadButton>
            </a>
          )}
        </div>
      </div>
    </div>
  ) : null
}

export default ProductIndex

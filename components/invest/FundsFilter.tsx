/** @jsx jsx */ jsx
import { jsx, css } from "@emotion/core"
import * as React from "react"
import cn from "classnames"
import FilterSelect from "./fundsFilter/Select"
import Button from "../shared/Button"
import FundCard from "./fundsFilter/FundCard"
import InvestPageDataContext from "./InvestPageDataContext"
import FundDataContext from "../invest/FundDataContext"
import LocaleContext from "../shared/context/localeContext"
import _ from "underscore"
import {
  investForOptions,
  assetClassOptions,
  regionOptions,
  investForOptionsInFr,
  assetClassOptionsInFr,
  regionOptionsInFr,
} from "./FilterOptions"
import scrollToTargetBaseNav from "../../utils/scrollToTarget"

const INIT_LENGTH = 50
const FundsFilter: React.FunctionComponent<any> = ({ setIsShowAllFunds }) => {
  const locale: any = React.useContext(LocaleContext)
  const [outcome, setOutcome] = React.useState()
  const [assetClass, setAssetClass] = React.useState()
  const [region, setRegion] = React.useState()
  const [outcomeInFr, setOutcomeInFr] = React.useState()
  const [assetClassInFr, setAssetClassInFr] = React.useState()
  const [regionInFr, setRegionInFr] = React.useState()
  const [searched, setSearched] = React.useState(false)
  const [fundLoading, setFundLoading] = React.useState([
    false,
    false,
    false,
    false,
  ])
  const [finalFunds, setFunds] = React.useState()

  const { filteredFunds }: any = React.useContext(FundDataContext)
  const investPageData: InvestPageData = React.useContext(InvestPageDataContext)
  const [title, setTitle] = React.useState(
    investPageData.fields && investPageData.fields.suggestedProduct
  )
  React.useEffect(() => {
    let defaultText =
      investPageData.fields && investPageData.fields.suggestedProduct

    switch (filteredFunds.length) {
      case INIT_LENGTH:
        setTitle(defaultText)
        break
      case 0:
        setTitle(
          locale.language === "en-CA"
            ? "Sorry, we couldn't find any results"
            : "Désolé, nous n'avons trouvé aucun résultat"
        )
        break
      default:
        setTitle(
          locale.language === "en-CA"
            ? "Ideas for you -"
            : "Nous pensons que vous aimerez"
        )
        break
    }
  }, [filteredFunds])
  React.useEffect(() => {
    setOutcome(undefined)
    setAssetClass(undefined)
    setRegion(undefined)
    setOutcomeInFr(undefined)
    setAssetClassInFr(undefined)
    setRegionInFr(undefined)
  }, [locale.language])
  const filterFunds = (
    funds: any,
    outcome: any,
    assetClass: any,
    region: any
  ) => {
    const filterByOutcome = (funds: any, outcome: string) => {
      return _.filter(funds, (fund: any) => {
        return (
          fund.outcome
            .map((value: any) => {
              return value.toLowerCase()
            })
            .indexOf(outcome.toLowerCase()) > -1
        )
      })
    }
    const filterByAssetClass = (funds: any, assetClass: string) => {
      return _.filter(funds, (fund: any) => {
        return (
          fund.asset_categories
            .map((value: any) => {
              return value.toLowerCase()
            })
            .indexOf(assetClass.toLowerCase()) > -1
        )
      })
    }
    const filterByRegion = (funds: any, region: string) => {
      return _.filter(funds, (fund: any) => {
        return (
          fund.region
            .map((value: any) => {
              return value.toLowerCase()
            })
            .indexOf(region.toLowerCase()) > -1
        )
      })
    }
    if (outcome) {
      if (outcome.value != "any") {
        funds = filterByOutcome(funds, outcome.value as string)
      }
    }
    if (assetClass) {
      if (assetClass.value != "any") {
        funds = filterByAssetClass(funds, assetClass.value as string)
      }
    }
    if (region) {
      if (region.value != "any") {
        funds = filterByRegion(funds, region.value as string)
      }
    }

    setFunds(funds)
  }
  const onHandleClick = () => {
    locale.language === "en-CA"
      ? filterFunds(filteredFunds, outcome, assetClass, region)
      : filterFunds(filteredFunds, outcomeInFr, assetClassInFr, regionInFr)
    setSearched(true)
    setFundLoading([true, true, true, true])
    const promiseFirst = () =>
      new Promise(function(resolve) {
        setTimeout(() => {
          setFundLoading([false, true, true, true])
          resolve()
        }, 500 * (Math.random() + 1.7))
      })
    const promiseSecond = () =>
      new Promise(function(resolve) {
        setFundLoading([false, false, true, true])
        setTimeout(() => {
          resolve()
        }, 300 * Math.random())
      })
    const promiseThird = () =>
      new Promise(function(resolve) {
        setFundLoading([false, false, false, true])
        setTimeout(() => {
          resolve()
        }, 300 * Math.random())
      })
    const promiseFourth = () =>
      new Promise(function(resolve) {
        setFundLoading([false, false, false, false])
        setTimeout(() => {
          resolve()
        }, 300 * Math.random())
        resolve()
      })
    promiseFirst().then(function() {
      promiseSecond().then(function() {
        promiseThird().then(function() {
          promiseFourth()
        })
      })
    })
    const targetSection = document.getElementById("suggested-products")
    const navbarScrolledElm = document.getElementsByTagName("nav")[1]
    scrollToTargetBaseNav(targetSection, navbarScrolledElm)
  }
  const FilterGroupInEn = (
    <>
      <FilterSelect
        title={
          investPageData.fields && investPageData.fields.filterInvestForTitle
        }
        options={investForOptions}
        setValue={setOutcome}
        currentValue={outcome}
        key="outcome"
        border={css`
          @media screen and (max-width: 640px) {
            border-left: 1px solid rgba(61, 74, 73, 0.69);
            padding-left: 2em;
          }
        `}
      />
      <FilterSelect
        title={
          investPageData.fields && investPageData.fields.filterAssetClassTitle
        }
        options={assetClassOptions}
        setValue={setAssetClass}
        currentValue={assetClass}
        key="assetClass"
        border={css`
          border-left: 1px solid rgba(61, 74, 73, 0.69);
          padding-left: 2em;
        `}
      />
      <FilterSelect
        title={investPageData.fields && investPageData.fields.filterRegionTitle}
        options={regionOptions}
        setValue={setRegion}
        currentValue={region}
        key="region"
        border={css`
          border-left: 1px solid rgba(61, 74, 73, 0.69);
          padding-left: 2em;
        `}
      />
    </>
  )
  const FilterGroupInFr = (
    <>
      <FilterSelect
        title={
          investPageData.fields && investPageData.fields.filterInvestForTitle
        }
        options={investForOptionsInFr}
        setValue={setOutcomeInFr}
        currentValue={outcomeInFr}
        key="outcomeInFr"
        border={css`
          @media screen and (max-width: 640px) {
            border-left: 1px solid rgba(61, 74, 73, 0.69);
            padding-left: 2em;
          }
        `}
      />
      <FilterSelect
        title={
          investPageData.fields && investPageData.fields.filterAssetClassTitle
        }
        options={assetClassOptionsInFr}
        setValue={setAssetClassInFr}
        currentValue={assetClassInFr}
        key="assetClassInFr"
        border={css`
          border-left: 1px solid rgba(61, 74, 73, 0.69);
          padding-left: 2em;
        `}
      />
      <FilterSelect
        title={investPageData.fields && investPageData.fields.filterRegionTitle}
        options={regionOptionsInFr}
        setValue={setRegionInFr}
        currentValue={regionInFr}
        key="regionInFr"
        border={css`
          border-left: 1px solid rgba(61, 74, 73, 0.69);
          padding-left: 2em;
        `}
      />
    </>
  )

  var imgFormat: any = "jpg"
  if (process.browser) {
    if (sessionStorage.getItem("imgFormat") !== null) {
      imgFormat = sessionStorage.getItem("imgFormat")
    }
  }

  return (
    <div
      className="w-full bg-center bg-cover bg-no-repeat pb-10"
      css={css`
        min-height: 80vh;
        background-image: linear-gradient(
            rgba(0, 0, 0, 0.1),
            rgba(0, 0, 0, 0.1)
          ),
          linear-gradient(to bottom, rgba(0, 0, 0, 0), #334342),
        url("${investPageData.fields &&
          investPageData.fields.bannerBackgroundImage.fields.file.url +
            "?fm=" +
            imgFormat}");
      `}
    >
      <div
        className="flex px-20 md:px-5 relative items-center"
        css={css`
          min-height: 70vh;
        `}
      >
        <div className="w-full text-white">
          <h3 className="font-tiempos italic font-thin mt-40 md:mt-32">
            {investPageData.fields && investPageData.fields.headerLineOne}
          </h3>
          <h1
            className="font-tiempos leading-tight mt-2"
            css={css`
              max-width: 25rem;
              @media screen and (max-width: 768px) {
                font-size: 2rem;
              }
            `}
          >
            {investPageData.fields && investPageData.fields.headerLineTwo}
          </h1>
          <div
            className="flex justify-start flex-row md:flex-wrap mt-6 w-full"
            css={css`
              @media screen and (max-width: 942px) {
                flex-direction: column;
                align-items: center;
              }
            `}
          >
            <div
              className="flex md:w-full w-3/4"
              css={css`
                @media screen and (max-width: 942px) {
                  width: 100%;
                }
                @media screen and (max-width: 640px) {
                  flex-direction: column;
                }
              `}
            >
              {locale.language === "en-CA" ? FilterGroupInEn : FilterGroupInFr}
            </div>
            <div className="mt-5 md:flex-row md:text-center md:mb-10">
              <Button
                className="rounded-sm text-white font-bold px-8 py-2 md:px-10 md:py-4 whitespace-no-wrap"
                css={css`
                  transition: all 300ms ease-out;
                  background-color: #7bacb5;
                  &:hover {
                    transform: translateY(-2px);
                    box-shadow: 0px 8px 20px rgba(0, 0, 0, 0.35);
                    background-color: #7bacb5;
                  }
                `}
                onClick={onHandleClick}
              >
                {!searched &&
                  investPageData.fields &&
                  investPageData.fields.filterButtonText}
                {searched && "Update possibilities"}
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div
        id="suggested-products"
        className={cn("px-20 md:px-5 relative items-center pt-10")}
      >
        <div className="flex text-white items-center w-full justify-between">
          <h3 className="font-tiempos font-light italic">{title}</h3>
          <p
            className="text-sm cursor-pointer hover:text-gray-1"
            css={css`
              transition: color 0.3s;
            `}
            onClick={() => {
              const targetSection = document.getElementById("all-product")
              const navbarScrolledElm = document.getElementsByTagName("nav")[1]
              scrollToTargetBaseNav(targetSection, navbarScrolledElm)
              setIsShowAllFunds(true)
            }}
          >
            {investPageData.fields && investPageData.fields.showAllProduct}
          </p>
        </div>
        <div className="flex mt-5 flex-wrap justify-between">
          {finalFunds &&
            Array.isArray(finalFunds) &&
            finalFunds
              .filter((fund: any) => {
                if (fund.category !== "Non-Core Funds") {
                  return fund
                }
              })
              .slice(0, 4)
              .map((fund: any, index: number) => (
                <FundCard
                  key={index}
                  fund={fund}
                  language={locale.language}
                  loading={fundLoading[index]}
                />
              ))}
          {!finalFunds &&
            filteredFunds &&
            Array.isArray(filteredFunds) &&
            filteredFunds
              .filter((fund: any) => {
                if (fund.category !== "Non-Core Funds") {
                  return fund
                }
              })
              .slice(0, 4)
              .map((fund: any, index: number) => (
                <FundCard
                  key={index}
                  fund={fund}
                  language={locale.language}
                  loading={fundLoading[index]}
                />
              ))}
        </div>
      </div>
    </div>
  )
}

export default FundsFilter

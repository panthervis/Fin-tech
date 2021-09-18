import * as React from "react"

import { fetchEntriesForFunds } from "../utils/fund"
import FundFilterContext from "../components/shared/context/fundFilterContext"
import LocaleContext from "../components/shared/context/localeContext"

const useFundData = () => {
  const [fundData, setFundData] = React.useState()
  const [allFundData, setAllFundData] = React.useState()
  const localeContext: any = React.useContext(LocaleContext)
  const fundFilterContext: any = React.useContext(FundFilterContext)

  const fetchFundData = async () => {
    const locale = localeContext.language ? localeContext.language : "en-CA"
    let data: any = await fetchEntriesForFunds(locale, {
      outcome:
        fundFilterContext.filter &&
        fundFilterContext.filter.outcome &&
        fundFilterContext.filter.outcome.value !== "any"
          ? fundFilterContext.filter.outcome.value
          : "",
      assetClass:
        fundFilterContext.filter &&
        fundFilterContext.filter.assetClass &&
        fundFilterContext.filter.assetClass.value !== "any"
          ? fundFilterContext.filter.assetClass.value
          : "",
      manager:
        fundFilterContext.filter &&
        fundFilterContext.filter.manager &&
        fundFilterContext.filter.manager.value !== "any"
          ? fundFilterContext.filter.manager.value
          : "",
      region:
        fundFilterContext.filter &&
        fundFilterContext.filter.region &&
        fundFilterContext.filter.region.value !== "any"
          ? fundFilterContext.filter.region.value
          : "",
    })
    setFundData(data)
  }

  const fetchAllFundData = async () => {
    const locale = localeContext.language ? localeContext.language : "en-CA"
    let data: any = await fetchEntriesForFunds(locale, {
      outcome: "",
      assetClass: "",
      manager: "",
      region: "",
    })
    setAllFundData(data)
  }

  const getFundData = () => {
    React.useEffect(() => {
      fetchFundData()
    }, [localeContext.language, fundFilterContext.filter])
    return fundData
  }

  const getAllFundData = () => {
    React.useEffect(() => {
      fetchAllFundData()
    }, [localeContext.language])
    return allFundData
  }

  return { getFundData, fetchFundData, getAllFundData }
}

export default useFundData

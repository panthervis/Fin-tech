import fetch from "isomorphic-unfetch"
import _ from "underscore"

import { capitalizeFirstLetter } from "../captalizeString"
import { fetchEntriesForContentType } from "../contentful"

type Filter = {
  outcome: string
  assetClass: string
  region: string
  manager: string
}

export const fetchEntriesForFunds = async (
  locale = "en-CA",
  filter: Filter
) => {
  let data = await fetch(
    `${
      process.browser ? "" : process.env.API_HOST || "http://localhost:3000"
    }/api/funds?outcome=${filter.outcome}&&asset_class=${
      filter.assetClass
    }&&region=${filter.region}&&manager=${filter.manager}&&locale=${locale}`
  )

  let json = await data.json()
  return json
}

export const fetchAssetClasses = async (locale = "en-CA") => {
  let data = await fetch(
    `${
      process.browser ? "" : process.env.API_HOST || "http://localhost:3000"
    }/api/asset_classes?locale=${locale}`
  )
  const json = data.json()
  return json
}

export const fetchNAV = async (fundId: string, seriesId: string) => {
  let data = await fetch(
    `${
      process.browser ? "" : process.env.API_HOST || "http://localhost:3000"
    }/api/nav?fundId=${fundId}&&seriesId=${seriesId}`
  )
  const json = data.json()
  return json
}

export const fetchEntriesForTerminatedFunds = async (locale = "en-CA") => {
  let data = await fetch(
    `${
      process.browser ? "" : process.env.API_HOST || "http://localhost:3000"
    }/api/terminated_funds?locale=${locale}`
  )
  const json = data.json()
  return json
}

export const fetchEntriesForFund = async (
  locale = "en-CA",
  id: string | number
) => {
  let data
  if (locale !== "fr-CA") {
    data = await fetch(
      `https://purposecloud.s3.amazonaws.com/fund/${id}-en.json`
    )
  } else {
    data = await fetch(
      `https://purposecloud.s3.amazonaws.com/fund/${id}-fr.json`
    )
  }
  const json = data.json()
  return json
}

export interface FundData {
  portfolio?: {
    [key: string]: any

    exposureHistorical?: {
      min: string
      max: string
      data: {
        [date: string]: number
      }
    }
  }
  returnsData: {
    [series: string]: Object[]
  }
  compoundReturns: any
  calendarReturns: {
    [series: string]: Object[]
  }
  taxFactors: {
    [series: string]: Object[]
  }
  [key: string]: any
}

export class FundData {
  public static transformHistoricalExposures(fundData: FundData): FundData {
    if (!(fundData.portfolio && fundData.portfolio.exposure)) return fundData

    const newFundData = Object.assign({}, fundData)
    const exposureKey = "Historical Net Market Exposure"

    const exposureHistorical = Object.keys(fundData.portfolio!.exposure).reduce<
      any
    >((_, title: string) => {
      if (title === exposureKey) {
        return fundData!.portfolio!.exposure[title]
      }
    }, undefined)

    newFundData.portfolio!.exposureHistorical = exposureHistorical

    newFundData.portfolio!.exposure = Object.keys(fundData.portfolio!.exposure)
      .filter((title: string) => title !== exposureKey)
      .reduce<any>(
        (obj, key) => ({
          ...obj,
          [key]: fundData.portfolio!.exposure[key],
        }),
        {}
      )
    return newFundData
  }

  public static transformInterestHedgeExposures(
    fundData: FundData,
    exposureKey: string
  ): FundData {
    if (!(fundData.portfolio && fundData.portfolio.exposure)) return fundData

    const newFundData = Object.assign({}, fundData)

    const region = capitalizeFirstLetter(exposureKey.slice(0, 2))
    newFundData.portfolio![
      `exposure${region}Interest`
    ] = fundData!.portfolio!.exposure[exposureKey]
    newFundData.portfolio!.exposure = Object.keys(fundData.portfolio!.exposure)
      .filter((title: string) => title !== exposureKey)
      .reduce<any>(
        (obj, key) => ({
          ...obj,
          [key]: fundData.portfolio!.exposure[key],
        }),
        {}
      )

    return newFundData
  }

  public static transformReturnsData(fundData: FundData): FundData {
    if (!fundData.returns) {
      return fundData
    }
    if (Object.values(fundData.returns).includes(null)) {
      return fundData
    }
    const returnsData = Object.keys(fundData.returns).reduce<any>(
      (datasets, series) => {
        datasets[series] = Object.keys(fundData.returns[series]).map(date => ({
          date,
          value: fundData.returns[series][date],
        }))
        return datasets
      },
      {}
    )

    fundData.returnsData = returnsData
    return fundData
  }

  public static transformCompoundReturns(fundData: FundData): FundData {
    if (!fundData.performance) return fundData
    const compoundReturns = _.compact(
      Object.keys(fundData.performance).map(seriesName => {
        let performanceData: any = {
          series_name: seriesName,
        }
        performanceData = {
          ...performanceData,
          ...fundData.performance[seriesName],
        }
        if (!fundData.performance[seriesName]) return
        return performanceData
      })
    )
    fundData.compoundReturns = compoundReturns
    return fundData
  }

  public static transformTaxFactors(fundData: FundData): FundData {
    if (!fundData.tax_factors) return fundData
    const taxFactors = Object.keys(fundData.tax_factors).reduce<any>(
      (dataset, year) => {
        Object.keys(fundData.tax_factors[year]).forEach(series => {
          const seriesKey = Object.keys(fundData.series).find(
            key => fundData.series[key].name === series
          )
          if (seriesKey) {
            dataset[seriesKey] = (dataset[seriesKey] || []).concat({
              Series: series,
              Year: year,
              ...fundData.tax_factors[year][series],
            })
          }
        })
        return dataset
      },
      {}
    )

    fundData.taxFactors = taxFactors
    return fundData
  }
  public static transformCalendarReturns(fundData: FundData): FundData {
    if (!fundData.performance_monthly) return fundData
    const calendarReturns = Object.keys(fundData.performance_monthly).reduce(
      (obj, series) => {
        const rawData = fundData.performance_monthly[series]
        const data =
          rawData &&
          Object.keys(rawData).map(year => {
            return {
              year,
              ...rawData[year],
            }
          })
        return {
          ...obj,
          [series]: data,
        }
      },
      {}
    )
    fundData.calendarReturns = calendarReturns
    return fundData
  }

  public static transform(fundData: FundData): FundData {
    fundData = FundData.transformHistoricalExposures(fundData)
    fundData = FundData.transformInterestHedgeExposures(
      fundData,
      "us_interest_rate_hedge"
    )
    fundData = FundData.transformInterestHedgeExposures(
      fundData,
      "canada_interest_rate_hedge"
    )

    fundData = FundData.transformTaxFactors(fundData)
    fundData = FundData.transformReturnsData(fundData)
    fundData = FundData.transformCompoundReturns(fundData)
    fundData = FundData.transformCalendarReturns(fundData)
    return fundData
  }
}

export const fetchSingleFundData = async (id: string, locale: string) => {
  let fundData: any = await fetchEntriesForFund(locale, id.toUpperCase())
  fundData = { code: id, ...fundData }
  const contentfulFundData = await fetchEntriesForContentType("Fund", locale)
  const assetClasses = await fetchEntriesForContentType("Asset Class", locale)
  if (contentfulFundData && assetClasses) {
    const contentfulFund: any = contentfulFundData.find((fundValue: any) => {
      return (
        fundValue.fields.fundCode.toLowerCase() === fundData.code.toLowerCase()
      )
    })
    const assetClass: any = assetClasses.find((assetClassValue: any) => {
      return (
        fundData.asset_categories.indexOf(assetClassValue.fields.className) >= 0
      )
    })
    if (contentfulFund) {
      fundData = { ...fundData, ...contentfulFund.fields }
    }
    if (assetClass) {
      fundData = { ...fundData, ...assetClass.fields }
    }
  }

  fundData = FundData.transform(fundData)

  return fundData
}

export const fetchFundMapData = async () => {
  const data = await fetch(
    `https://purposecloud.s3.amazonaws.com/fund/fund-map.json`
  )
  const json = data.json()
  return json
}
export const fetchEntriesForNAV = async (id: string) => {
  const data = await fetch(
    `https://purposecloud.s3.amazonaws.com/fund/${id}-NAV.json`
  )
  const json = data.json()
  return json
}

export const fetchSingleNAVData = async (id: string) => {
  let navData: any = await fetchEntriesForNAV(id.toUpperCase())
  navData = { code: id, ...navData }
  return navData
}

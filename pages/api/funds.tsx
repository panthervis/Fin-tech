import { NextApiRequest, NextApiResponse } from "next"
import fetch from "node-fetch"
import _ from "underscore"
import { fetchEntriesForContentType } from "../../utils/contentful"

const moveOrder = (array: any[], from: number, to: number) => {
  return array.splice(to, 0, array.splice(from, 1)[0])
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  let apiUrl: string
  if (req.query.locale === "fr-CA") {
    apiUrl = "https://purposecloud.s3.amazonaws.com/fund/list-fr.json"
  } else {
    apiUrl = "https://purposecloud.s3.amazonaws.com/fund/list-en.json"
  }
  let rawFunds: any = await fetch(apiUrl)
  rawFunds = await rawFunds.json()
  const contentfulFundsData: any = await fetchEntriesForContentType(
    "Fund",
    req.query.locale as string
  )
  const assetClassesData = await fetchEntriesForContentType(
    "Asset Class",
    req.query.locale as string
  )
  let funds = Object.keys(rawFunds).map(key => {
    let fundData = rawFunds[key]
    fundData["code"] = key
    const contentfulData = contentfulFundsData.find((fund: FundData) => {
      return fund.fields!.fundCode.toLocaleLowerCase() === key.toLowerCase()
    })
    const assetClasses = assetClassesData.find((assetClassValue: any) => {
      return (
        fundData.asset_categories.indexOf(assetClassValue.fields.className) >= 0
      )
    })
    fundData = {
      ...fundData,
      contentfulFields: contentfulData && contentfulData.fields,
    }
    fundData = {
      ...fundData,
      ...assetClasses.fields,
    }
    return fundData
  })
  if (req.query && req.query.outcome) {
    funds = filterByOutcome(funds, req.query.outcome as string)
  }
  if (req.query && req.query.asset_class) {
    funds = filterByAssetClass(funds, req.query.asset_class as string)
  }
  if (req.query && req.query.region) {
    funds = filterByRegion(funds, req.query.region as string)
  }
  if (req.query && req.query.manager) {
    funds = filterByManager(funds, req.query.manager as string)
  }
  if (
    req.query &&
    !req.query.outcome &&
    !req.query.asset_class &&
    !req.query.region &&
    !req.query.manager
  ) {
    const defaultFundOne = findByTicker(funds, "PID")
    const defaultFundTwo = findByTicker(funds, "RTA")
    const defaultFundThree = findByTicker(funds, "KILO")
    const defaultFundFour = findByTicker(funds, "RPU")
    moveOrder(funds, funds.indexOf(defaultFundFour), 0)
    moveOrder(funds, funds.indexOf(defaultFundThree), 0)
    moveOrder(funds, funds.indexOf(defaultFundTwo), 0)
    moveOrder(funds, funds.indexOf(defaultFundOne), 0)
  }

  res.setHeader("Content-Type", "application/json")
  res.setHeader("Cache-Control", "max-age=3600")
  res.statusCode = 200
  res.end(JSON.stringify(await funds))
}

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

const filterByManager = (funds: any, manager: string) => {
  return _.filter(funds, (fund: any) => {
    return (
      fund.pms
        .map((value: any) => {
          return value.toLowerCase()
        })
        .indexOf(manager.toLowerCase()) > -1 || fund.firm === manager
    )
  })
}

const findByTicker = (funds: any, ticker: string) => {
  return _.find(funds, (fund: any, id: any) => {
    if (_.has(fund, "code")) return fund.code === ticker
    else return id === ticker
  })
}

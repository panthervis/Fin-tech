import { NextApiRequest, NextApiResponse } from "next"
import fetch from "isomorphic-fetch"
import _ from "underscore"
//@ts-ignore
import jsoncsv from "json-csv"

export default async (req: NextApiRequest, res: NextApiResponse) => {
  let apiUrl: string
  if (req.query.locale === "fr-CA") {
    apiUrl = "https://purposecloud.s3.amazonaws.com/fund/list-fr.json"
  } else {
    apiUrl = "https://purposecloud.s3.amazonaws.com/fund/list-en.json"
  }
  let rawFunds: any = await fetch(apiUrl)
  rawFunds = await rawFunds.json()
  let funds = Object.keys(rawFunds).map(key => {
    const fundData = rawFunds[key]
    fundData["code"] = key
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
  res.setHeader("Content-Type", "application/json")
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

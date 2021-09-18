import { NextApiRequest, NextApiResponse } from "next"
import fetch from "node-fetch"
import _ from "underscore"

export default async (req: NextApiRequest, res: NextApiResponse) => {
  let apiUrl: string
  if (req.query.locale === "fr-CA") {
    apiUrl = "https://purposecloud.s3.amazonaws.com/fund/list-fr.json"
  } else {
    apiUrl = "https://purposecloud.s3.amazonaws.com/fund/list-en.json"
  }
  let rawFunds: any = await fetch(apiUrl)
  rawFunds = await rawFunds.json()
  const categories = Object.keys(rawFunds).reduce(
    (accumulator: string[], key) => {
      const fundData = rawFunds[key]
      fundData.asset_categories.forEach((category: string) => {
        if (!(accumulator.indexOf(category) > -1)) {
          accumulator.push(category)
        }
      })
      return accumulator
    },
    []
  )

  res.setHeader("Content-Type", "application/json")
  res.setHeader("Cache-Control", "max-age=3600")
  res.statusCode = 200
  res.end(JSON.stringify(categories))
}

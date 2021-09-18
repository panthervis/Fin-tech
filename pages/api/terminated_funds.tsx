import { NextApiRequest, NextApiResponse } from "next"
import fetch from "node-fetch"
import _ from "underscore"

export default async (req: NextApiRequest, res: NextApiResponse) => {
  let apiUrl: string
  if (req.query.locale === "fr-CA") {
    apiUrl = "https://purposecloud.s3.amazonaws.com/fund/terminated-fr.json"
  } else {
    apiUrl = "https://purposecloud.s3.amazonaws.com/fund/terminated-en.json"
  }
  let rawFunds: any = await fetch(apiUrl)
  rawFunds = await rawFunds.json()
  let funds = Object.keys(rawFunds).map(key => {
    const fundData = rawFunds[key]
    fundData["code"] = key
    return fundData
  })
  res.setHeader("Content-Type", "application/json")
  res.setHeader("Cache-Control", "max-age=3600")
  res.statusCode = 200
  res.end(JSON.stringify(await funds))
}

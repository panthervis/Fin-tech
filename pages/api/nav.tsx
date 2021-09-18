import { NextApiRequest, NextApiResponse } from "next"
import fetch from "node-fetch"
import _ from "underscore"

export default async (req: NextApiRequest, res: NextApiResponse) => {
  let apiUrl = `https://purposecloud.s3.amazonaws.com/fund/${(req.query
    .fundId as string).toUpperCase()}-NAV.json`
  let rawNAV: any = await fetch(apiUrl)
  rawNAV = await rawNAV.json()
  var navs: any = []
  Object.keys(rawNAV[(req.query.seriesId as string).toUpperCase()]).forEach(
    function(date: any) {
      if (rawNAV[(req.query.seriesId as string).toUpperCase()][date]["price"]) {
        navs.push({
          date: date,
          nav:
            rawNAV[(req.query.seriesId as string).toUpperCase()][date]["nav"],
          price:
            rawNAV[(req.query.seriesId as string).toUpperCase()][date]["price"],
          volume:
            rawNAV[(req.query.seriesId as string).toUpperCase()][date]["vol"],
        })
      } else {
        navs.push({
          date: date,
          nav:
            rawNAV[(req.query.seriesId as string).toUpperCase()][date]["nav"],
        })
      }
    }
  )
  res.setHeader("Content-Type", "application/json")
  res.setHeader("Cache-Control", "max-age=3600")
  res.statusCode = 200
  res.end(JSON.stringify(await navs))
}

import jsoncsv from "json-csv"
import { NextApiRequest, NextApiResponse } from "next"
import fetch from "node-fetch"
import _ from "underscore"

import mockedJson from "../../../public/PDF-en.json"

enum ContentType {
  json = "application/json",
  csv = "text/csv",
}

function jsonCollectionToCSV(items: Object[]) {
  return new Promise((resolve, reject) => {
    jsoncsv.csvBuffered(
      items,
      {
        fields: Object.keys(items[0] || {}).map(key => ({
          name: key,
          label: key,
        })),
      },
      function(err: any, csv: any) {
        if (err) return reject(err)
        resolve(csv)
      }
    )
  })
}

interface Series<T> {
  ETF: T
  F: T
  A: T
  XF: T
}

type SeriesKeys = keyof Series<Object[]>

interface Fund {
  distributions: Series<Object[]>
  returns: Series<Object[]>
  compound_returns: Series<Object[]>
}

type FundKeys = keyof Fund

export default async (req: NextApiRequest, res: NextApiResponse) => {
  let apiUrl: string
  if (req.query.locale === "fr-CA") {
    apiUrl = `https://purposecloud.s3.amazonaws.com/fund/${(req.query
      .id as string).toUpperCase()}-fr.json`
  } else {
    apiUrl = `https://purposecloud.s3.amazonaws.com/fund/${(req.query
      .id as string).toUpperCase()}-en.json`
  }
  let rawFunds: any
  try {
    rawFunds = await fetch(apiUrl)
    rawFunds = await rawFunds.json()
  } catch {
    rawFunds = mockedJson
  }

  switch (req.query.contentType) {
    case ContentType.csv:
      rawFunds.tax_factors = Object.keys(rawFunds.tax_factors).reduce<any>(
        (datasets, year) => ({
          ETF: datasets.ETF.concat({
            year,
            ...rawFunds.tax_factors[year]["ETF"],
          }),
          F: datasets.F.concat({ year, ...rawFunds.tax_factors[year]["F"] }),
          A: datasets.A.concat({ year, ...rawFunds.tax_factors[year]["A"] }),
          XF: datasets.XF.concat({ year, ...rawFunds.tax_factors[year]["XF"] }),
        }),
        {
          ETF: [],
          F: [],
          A: [],
          XF: [],
        }
      )

      const compoundReturns = _.compact(
        Object.keys(rawFunds.performance).map(seriesName => {
          let performanceData: any = {
            series_name: seriesName,
          }
          performanceData = {
            ...performanceData,
            ...rawFunds.performance[seriesName],
          }
          if (!rawFunds.performance[seriesName]) return
          return performanceData
        })
      )

      rawFunds.compound_returns = {
        ETF: compoundReturns,
        F: compoundReturns,
        A: compoundReturns,
        XF: compoundReturns,
      }

      res.setHeader("Content-Type", ContentType.csv)
      const series: SeriesKeys = req.query.series as SeriesKeys
      const dataset: FundKeys = req.query.dataset as FundKeys

      const data = (rawFunds as Fund)[dataset][series]
      const csvFundData = await jsonCollectionToCSV(data)
      res.statusCode = 200
      res.end(csvFundData)
      break

    default:
    case ContentType.json:
      res.statusCode = 200
      res.setHeader("Content-Type", "application/json")
      res.setHeader("Cache-Control", "max-age=1200")
      res.end(JSON.stringify(rawFunds))
  }
}

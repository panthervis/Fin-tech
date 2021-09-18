import * as Highcharts from "highcharts"
import HighchartsExporting from "highcharts/modules/exporting"

const patternFill = require("highcharts-pattern-fill")
const barChartBorderRadius = require("./barChartBorderRadius")
const ratingChartRadius = require("./ratingChartRadius")
const columnChartRadius = require("./columnChartBorderRadius")
const sleeveChartRadius = require("./sleevChartBorderRadius")

if (typeof Highcharts === "object") {
  HighchartsExporting(Highcharts)
  barChartBorderRadius(Highcharts)
  ratingChartRadius(Highcharts)
  columnChartRadius(Highcharts)
  patternFill(Highcharts)
  sleeveChartRadius(Highcharts)
}

export default Highcharts

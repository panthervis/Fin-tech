;(function(factory) {
  "use strict"

  if (typeof module === "object" && module.exports) {
    module.exports = factory
  } else {
    factory(Highcharts)
  }
})(function(H) {
  H.wrap(H.seriesTypes.column.prototype, "drawPoints", function(proceed) {
    let seriesIndex = this.index
    this.points.forEach(function(point, i) {
      point.shapeArgs.y -= seriesIndex == 0 ? 0 : 40
      point.shapeArgs.height += 40
    })
    proceed.apply(this, Array.prototype.slice.call(arguments, 1))
  })
})

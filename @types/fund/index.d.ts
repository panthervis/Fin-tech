declare interface FundData {
  fields?: {
    fundCode: string
    fundHeader: string
    fundSubheader: string
    fundBackgroundImage: {
      fields: {
        file: {
          url: string
        }
      }
    }
    fundFeatures: string[]
    similarFundsTickers: string[]
  }
}

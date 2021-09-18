declare interface InvestPageData {
  fields?: {
    headerLineOne: string
    headerLineTwo: string
    bannerBackgroundImage: {
      fields: {
        file: {
          url: string
        }
      }
    }
    filterInvestForTitle: string
    filterAssetClassTitle: string
    filterManagerTitle: string
    filterRegionTitle: string
    filterButtonText: string
    suggestedProduct: string
    showAllProduct: string
    productIndexHeaderLineOne: string
    productIndexHeaderLineTwo: string
    assetClasses: AssetClass[]
    salesTeamHeader: string
    salesTeamSubheader: string
  }
}

declare interface AssetClass {
  fields: {
    className: string
    frenchClassName: string
    shortDescription: string
    themeColor: string
    themeColorWithoutOpacity: string
  }
}

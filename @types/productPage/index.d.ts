declare interface ProductPageData {
  fields?: {
    backToFundsButtonText: string
    bannerBackgroundImage: {
      fields: {
        file: {
          url: string
        }
      }
    }
    corporateClass: string
    corporateClassIcon: {
      fields: {
        file: {
          url: string
        }
      }
    }
    similarFundsTitle: string
  }
}

declare interface ProductData {
  shortDescription: ProductData
  asset_categories: Array<string>
  brochure: string
  category: string
  docs: {
    brochure: string
    prospectus: string
    fund_facts: string
    mrfp: string
    commentaries: string
    financial_statements: string
  }
  featured_asset_category: string
  firm: string
  has_etf: boolean
  keywords: Array<string>
  name: string
  outcome: Array<string>
  pms: Array<string>
  region: Array<string>
  tickers: Array<string>
  tickers_old: Array<string>
  url_name: string
  yield: string | null | undefined
  code: string
}

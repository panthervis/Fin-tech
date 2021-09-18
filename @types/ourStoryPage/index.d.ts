declare interface OurStoryPageData {
  fields?: {
    founderImage: {
      fields: {
        file: {
          url: string
        }
      }
    }
    founderQuote: string
    bannerHeader: string
    bannerBody: OurStoryBannerBody[]
    founderName: string
    founderPosition: string
    principleHeader: string
    principleBody: string
    principles: PurposePrinciple[]
    historyHeader: string
    histories: PurposeHistory[]
    financialGroupHeader: string
    financialGroupSubsidiariesHeader: string
    financialGroupSubsidiaries: PurposeFinancialGroup[]
    financialGroupInvestmentsHeader: string
    financialGroupInvestments: PurposeFinancialGroup[]
    financialGroupBackgroundImage: {
      fields: {
        file: {
          url: string
        }
      }
    }
  }
}

declare interface PurposePrinciple {
  fields: {
    iconImage: {
      fields: {
        file: {
          url: string
        }
      }
    }
    header: string
    body: string
    backgroundImage: {
      fields: {
        file: {
          url: string
        }
      }
    }
    backgroundColor: string
  }
}

declare interface PurposeHistory {
  fields: {
    date: Date
    content: string
  }
}

declare interface PurposeFinancialGroup {
  fields: {
    logoImage: {
      fields: {
        file: {
          url: string
        }
      }
    }
    linkUrl: string
  }
}

declare interface OurStoryBannerBody {
  fields: {
    content: string
  }
}

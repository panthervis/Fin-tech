declare interface CanadiansPageData {
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
    wistiaHashId: string[]
    outcomeHeader: string
    outcomeBody: string
    quickAccessHeader: string
    quickAccessBody: string
    quickAccessBackgroundImage: {
      fields: {
        file: {
          url: string
        }
      }
    }
    quickAccessCtaButtonText: string
    trackRecordHeader: string
    trackRecordBody: string
    trackRecordCtaButtonText: string
    trackRecordBackgroundImage: {
      fields: {
        file: {
          url: string
        }
      }
    }
    advisors_en: string
    advisors_fr: string
    institutions_en: string
    institutions_fr: string
    investors_en: string
    investors_fr: string
  }
}

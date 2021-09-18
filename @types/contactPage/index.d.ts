declare interface ContactPageData {
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
    contactHeader: string
    contactUsSalesNumbers: string[]
    contactUsSalesNumberTitles: string[]
    contactUsCtaButtonText: string
    contactUsFormHeader: string
    mapHeader: string
    headOfficeTitle: string
    headOfficeAddress: string
    openInGoogleMapsText: string
    torontoImages: {
      fields: {
        file: {
          url: string
        }
      }
    }[]
  }
}

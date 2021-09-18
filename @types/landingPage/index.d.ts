declare interface LandingPageData {
  fields?: {
    bannerBackgroundVideo: {
      fields: {
        file: {
          url: string
        }
      }
    }
    bannerButtonText: string
    bannerTitle: string
    exploreProductSubtitle: string
    exploreProductsButtonText: string
    exploreProductsTitle: string
    ourIaSolutionsButtonText: string
    ourIaSolutionsSubtitle: string
    ourIaSolutionsTitle: string
    products: [
      {
        fields: {
          productBackgroundImage: {
            fields: {
              file: {
                url: string
              }
            }
          }
          productTitle: string
        }
      }
    ]
    testimonial: [
      {
        fields: {
          testimonialBackgroundImage: {
            fields: {
              file: {
                url: string
              }
            }
          }
          testimonialWords: string
        }
      }
    ]
  }
}

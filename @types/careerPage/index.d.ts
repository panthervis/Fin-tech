declare interface CareerPageData {
  fields?: {
    header: string
    bannerBodyParagraphs: GeneralParagraph[]
    galleryLeft: CareerGalleryTestimonial
    galleryMiddleImage: {
      fields: {
        file: {
          url
        }
      }
    }
    galleryRight: CareerGalleryTestimonial
  }
}

declare interface CareerGalleryTestimonial {
  fields: {
    imageOne: {
      fields: {
        file: {
          url
        }
      }
    }
    imageTwo: {
      fields: {
        file: {
          url
        }
      }
    }
    imageThree: {
      fields: {
        file: {
          url
        }
      }
    }
    profileImage: {
      fields: {
        file: {
          url
        }
      }
    }
    testimonial: string
    personName: string
    personPosition: string
  }
}

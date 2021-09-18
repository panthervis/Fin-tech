declare interface DisclaimerPageData {
  fields?: {
    header: string
    paragraphs: GeneralParagraph[]
  }
}

declare interface GeneralParagraph {
  fields: {
    content: string
  }
}

declare interface GeneralParagraph {
  fields: {
    content: string
  }
}

declare interface LegalPrivacyItem {
  fields: {
    title: string
    paragraphs: GeneralParagraph[]
  }
}

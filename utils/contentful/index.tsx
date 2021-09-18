import * as contentful from "contentful"

const config = {
  CTF_SPACE_ID: process.env.CTF_SPACE_ID,
  CTF_CDA_TOKEN: process.env.CTF_CDA_TOKEN,
  CTF_CPA_TOKEN: process.env.CTF_CPA_TOKEN,
  CTF_SPACE_ID_TWO: process.env.CTF_SPACE_ID_TWO,
  CTF_CDA_TOKEN_TWO: process.env.CTF_CDA_TOKEN_TWO,
  CTF_CPA_TOKEN_TWO: process.env.CTF_CPA_TOKEN_TWO,
}

export const createClient = () => {
  const options: contentful.CreateClientParams = {
    host: "preview.contentful.com",
    space: config.CTF_SPACE_ID as string,
    accessToken: config.CTF_CPA_TOKEN as string,
  }

  if (process.env.NODE_ENV === "production" && !process.env.STAGING) {
    options.host = "cdn.contentful.com"
    options.accessToken = config.CTF_CDA_TOKEN as string
  }

  return contentful.createClient(options)
}

export const createClientTwo = () => {
  const options: contentful.CreateClientParams = {
    host: "preview.contentful.com",
    space: config.CTF_SPACE_ID_TWO as string,
    accessToken: config.CTF_CPA_TOKEN_TWO as string,
  }

  if (process.env.NODE_ENV === "production" && !process.env.STAGING) {
    options.host = "cdn.contentful.com"
    options.accessToken = config.CTF_CDA_TOKEN_TWO as string
  }

  return contentful.createClient(options)
}

export const fetchEntriesForContentType = async (
  contentType: string | undefined,
  locale: string = "en-CA"
) => {
  let client: contentful.ContentfulClientApi
  if (contentType === "Contact Us Page" || contentType === "Fund") {
    client = createClientTwo()
  } else {
    client = createClient()
  }
  const types = await client.getContentTypes({
    name: contentType,
  })
  const entries = await client.getEntries({
    content_type: types.items[0].sys.id,
    locale,
    include: 2,
  })
  if (entries.items) return entries.items as any[]
  console.log(`Error getting Entries for ${contentType}.`)
  return []
}

export const fetchAllEntriesForContentTypes = async (
  contentTypes: Array<string> = [],
  locale: string = "en-CA"
) => {
  const client: contentful.ContentfulClientApi = createClient()
  const types = await client.getContentTypes()
  const entries = await client.getEntries({
    locale,
    include: 2,
    limit: 1000,
  })

  let desiredContent: any = {}
  types.items.some((typeItem: any) => {
    const name = typeItem.name
    const id = typeItem.sys.id

    if (contentTypes.includes(name)) {
      //if is a page
      var regex = /.* Page$/
      if (regex.test(name)) {
        entries.items.some((entryItem: any) => {
          if (
            entryItem.sys.contentType &&
            entryItem.sys.contentType.sys.id === id
          ) {
            desiredContent[name] = entryItem
            return true
          }
        })
      } else {
        desiredContent[name] = []
        entries.items.some((entryItem: any) => {
          if (
            entryItem.sys.contentType &&
            entryItem.sys.contentType.sys.id === id
          ) {
            desiredContent[name].push(entryItem)
          }
        })
      }
    }
  })

  return desiredContent
}

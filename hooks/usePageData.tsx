import * as React from "react"

import {
  fetchEntriesForContentType,
  fetchAllEntriesForContentTypes,
} from "../utils/contentful"
import LocaleContext from "../components/shared/context/localeContext"

const usePageData = (pageName: string | Array<string>) => {
  const [pageData, setPageData] = React.useState({})
  const localeContext: any = React.useContext(LocaleContext)

  const fetchPageData = async (locale: string) => {
    try {
      let data: any[] = []
      if (typeof pageName === "string") {
        data = await fetchEntriesForContentType(pageName, locale)
      } else {
        data = await fetchAllEntriesForContentTypes(pageName, locale)
      }

      if (data) {
        setPageData(Array.isArray(data) && data.length === 1 ? data[0] : data)
      }
    } catch (error) {
      console.log(`fetch data from contentful is failed, error: ${error}`)
    }
  }

  const getPageData = () => {
    React.useEffect(() => {
      fetchPageData(localeContext.language)
    }, [localeContext.language])
    return pageData
  }

  return { getPageData, fetchPageData }
}

export default usePageData

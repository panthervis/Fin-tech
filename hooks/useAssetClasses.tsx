import * as React from "react"

import { fetchEntriesForContentType } from "../utils/contentful"
import LocaleContext from "../components/shared/context/localeContext"

const useAssetClasses = (pageName: string) => {
  const [assetClasses, setAssetClasses] = React.useState([])
  const localeContext: any = React.useContext(LocaleContext)

  const fetchAssetClasses = async (locale: string) => {
    try {
      const data: any = await fetchEntriesForContentType(pageName, locale)
      if (data) {
        setAssetClasses(data)
      }
    } catch (error) {
      console.log(`fetch data from contentful is failed, error: ${error}`)
    }
  }

  const getAssetClasses = () => {
    React.useEffect(() => {
      fetchAssetClasses(localeContext.language)
    }, [localeContext.language])
    return assetClasses
  }

  return { getAssetClasses, fetchAssetClasses }
}

export default useAssetClasses

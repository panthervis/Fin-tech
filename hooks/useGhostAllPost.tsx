import * as React from "react"

import { fetchAllPosts } from "../components/ghost"
import LocaleContext from "../components/shared/context/localeContext"

const useGhostAllPost = () => {
  const [ghostPosts, setGhostPosts] = React.useState([])
  const localeContext: any = React.useContext(LocaleContext)

  const fetchGhostAllPosts = async (locale: any) => {
    const allPosts = await fetchAllPosts(locale)
    setGhostPosts(allPosts)
  }

  const getGhostAllPosts = () => {
    React.useEffect(() => {
      fetchGhostAllPosts(localeContext.language)
    }, [localeContext.language])
    return ghostPosts
  }

  return { fetchGhostAllPosts, getGhostAllPosts }
}

export default useGhostAllPost

import * as React from "react"

import { fetchPostsByCategory, fetchFeaturedPosts } from "../components/ghost"
import LocaleContext from "../components/shared/context/localeContext"

const useGhostPost = () => {
  const [ghostPosts, setGhostPosts] = React.useState()
  const localeContext: any = React.useContext(LocaleContext)

  const fetchGhostPosts = async (locale: any) => {
    const pressPosts = await fetchPostsByCategory("hash-press", locale)
    const productUpdatesPosts = await fetchPostsByCategory(
      "hash-product-updates",
      locale
    )
    const macroCommentaryPosts = await fetchPostsByCategory(
      "hash-macro-commentary",
      locale
    )
    const opEdPosts = await fetchPostsByCategory("hash-op-ed", locale)
    const featuredPosts = await fetchFeaturedPosts(locale)
    const posts = {
      pressPosts,
      productUpdatesPosts,
      macroCommentaryPosts,
      opEdPosts,
      featuredPosts,
    }
    setGhostPosts(posts)
  }

  const getGhostPosts = () => {
    React.useEffect(() => {
      fetchGhostPosts(localeContext.language)
    }, [localeContext.language])
    return ghostPosts
  }

  return { fetchGhostPosts, getGhostPosts }
}

export default useGhostPost

import { useState, useEffect } from "react"

function useScrolled(offsetTop: number) {
  if (process.browser) {
    let scrollTarget = window
    const [scrolled, setScrolled] = useState()
    useEffect(() => {
      scrollTarget.addEventListener("scroll", handleScrolling)
      return () => {
        scrollTarget.removeEventListener("scroll", handleScrolling)
      }
    })
    const handleScrolling = () => {
      if (scrollTarget.pageYOffset > offsetTop) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }
    return scrolled
  } else {
    return false
  }
}

export default useScrolled

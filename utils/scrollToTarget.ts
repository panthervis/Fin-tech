const scrollToTargetBaseNav = (
  targetElm: HTMLElement | null,
  navbarElm: HTMLElement | null
) => {
  if (targetElm && navbarElm) {
    window.scroll({
      top: targetElm.offsetTop - navbarElm.offsetHeight,
      left: 0,
      behavior: "smooth",
    })
  }
}

export default scrollToTargetBaseNav

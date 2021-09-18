const useScrolledAnimation = (
  ref: HTMLElement | null,
  type: "down" | "up",
  offsetStep: number,
  unit: string,
  animType: string,
  limit: number,
  isHasOpacity?: boolean
) => {
  if (!ref) return
  let pageYOffset = 0
  let step = 0
  let opacity = 1
  let timeout: NodeJS.Timeout
  ref.style.transition = `transform 0.6s, opacity 0.6s ${animType}`
  window.addEventListener("scroll", () => {
    if (timeout) {
      clearTimeout(timeout)
    }
    timeout = setTimeout(() => {
      if (window.pageYOffset === 0) {
        ref.style.transform = `translate(0,0)`
        if (isHasOpacity) {
          ref.style.opacity = "1"
        }
        step = 0
        pageYOffset = 0
      } else if (
        window.pageYOffset > pageYOffset &&
        window.pageYOffset >= 0 &&
        window.pageYOffset <= limit
      ) {
        if (type === "down") {
          step += offsetStep
          step = step >= limit ? limit : step
          if (isHasOpacity) {
            opacity -= 0.1
            opacity = opacity <= 0 ? 0 : opacity
            ref.style.opacity = `${opacity}`
          }
        } else {
          step -= offsetStep
        }

        ref.style.transform = `translate(0px,${step}${unit})`
      } else if (
        window.pageYOffset < pageYOffset &&
        window.pageYOffset >= 0 &&
        window.pageYOffset <= limit
      ) {
        if (type === "down") {
          step -= offsetStep
          step = step <= 0 ? 0 : step
          if (isHasOpacity) {
            opacity += 0.05
            opacity = opacity >= 1 ? 1 : opacity
            ref.style.opacity = `${opacity}`
          }
        } else {
          step += offsetStep
          step = step >= 0 ? 0 : step
        }

        ref.style.transform = `translate(0px,${step}${unit})`
      }
      pageYOffset = window.pageYOffset
    }, 0)
  })
}

export default useScrolledAnimation

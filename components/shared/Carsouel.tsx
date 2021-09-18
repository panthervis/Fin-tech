/** @jsx jsx */ jsx
import { jsx, css } from "@emotion/core"
import * as React from "react"
import cn from "classnames"

declare global {
  interface Window {
    Wistia: any
  }
}

type CarouselProps = {
  activeDotColor?: string
  dotColor?: string
  border?: boolean
  indicatorClassName?: string
  indicatorCss?: any
  containerCss?: any
  dotClassName?: string
  bodyCss?: any
  borderColor?: string
  carouselTimer?: number
  videoIds?: string[]
}

const Carousel: React.FunctionComponent<CarouselProps> = ({
  children,
  indicatorClassName,
  indicatorCss,
  containerCss,
  dotClassName,
  activeDotColor = "bg-gray-1",
  dotColor = "",
  border = true,
  bodyCss,
  borderColor,
  carouselTimer = 1000 * 3,
  videoIds = [],
}) => {
  const [currentIndex, setCurrentIndex] = React.useState(0)
  const [timerId, setTimerId] = React.useState<any>(-1)
  const numberOfChildren = React.Children.count(children)
  const dotClickHandler = (activeItemIndex: number) => {
    setCurrentIndex(activeItemIndex)
    clearInterval(timerId)
  }
  const renderChildren = () => {
    const handleClick = () => dotClickHandler(currentIndex)

    // pause all videos before switching to another child
    if (process.browser && window && "Wistia" in window) {
      videoIds.map((videoId, index) => {
        const video = window.Wistia.api(videoId)
        if (video) {
          if (index === currentIndex) {
            // keep same state
          } else {
            // pause video
            video.pause()
          }
        }
      })
    }

    return React.Children.map(children, (child: any, index) => {
      const className = cn(
        child.props.className,
        index === currentIndex
          ? "active opacity-100 absolute z-10"
          : "invisible opacity-0 absolute"
      )

      return React.cloneElement(child, {
        className,
        onClick: handleClick,
        style: {
          transition: "all 1000ms ease-out",
        },
      })
    })
  }
  React.useEffect(() => {
    let intervalTimerId = setInterval(() => {
      setCurrentIndex(
        prevCurrentIndex => (prevCurrentIndex + 1) % numberOfChildren
      )
    }, carouselTimer)
    setTimerId(intervalTimerId)
    return () => clearInterval(intervalTimerId)
  }, [numberOfChildren])

  return (
    <div
      className="relative h-full"
      css={css`
        min-height: 22rem;
        ${containerCss};
      `}
    >
      <div
        style={{
          display: numberOfChildren > 1 ? "flex" : "none",
        }}
        className={indicatorClassName}
        css={css`
          ${indicatorCss};
          max-height: 1em;
        `}
      >
        {Array(numberOfChildren)
          .fill({})
          .map((_element, index) => {
            return (
              <div
                className={cn(
                  currentIndex === index ? activeDotColor : dotColor,
                  dotClassName,
                  border && currentIndex !== index
                    ? `border ${borderColor}`
                    : ""
                )}
                onClick={(e: any) =>
                  dotClickHandler(parseInt(e.target.getAttribute("data-index")))
                }
                data-index={index}
                key={index}
              />
            )
          })}
      </div>
      <div
        css={css`
          ${bodyCss};
        `}
      >
        {renderChildren()}
      </div>
    </div>
  )
}

export default Carousel

import * as React from "react"
import { Parallax } from "rc-scroll-anim"
import LeftSection from "./exploreOurProduct/LeftSection"
import RightSection from "./exploreOurProduct/RightSection"
import LandingPageDataContext from "./LandingPageDataContext"

const ExploreOurProduct: React.FunctionComponent = () => {
  const landingPageData: LandingPageData = React.useContext(
    LandingPageDataContext
  )
  return (
    <div className="bg-teal-1 md:pt-32">
      <Parallax
        animation={{
          opacity: 1,
          y: 0,
          playScale: [0, 0.7],
        }}
        style={{ transform: "translateY(15%)", opacity: 0 }}
        className="w-full h-full"
      >
        <div className="flex flex-wrap">
          <LeftSection
            landingPageData={landingPageData}
            className="w-1/2 md:w-full bg-teal-1"
          />
          <RightSection
            landingPageData={landingPageData}
            className="w-1/2 md:w-full bg-teal-1"
          />
        </div>
      </Parallax>
    </div>
  )
}

export default ExploreOurProduct

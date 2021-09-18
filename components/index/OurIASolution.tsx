import * as React from "react"

import LeftSection from "./ourIASolution/LeftSection"
import RightSection from "./ourIASolution/RightSection"
import LandingPageDataContext from "./LandingPageDataContext"
import { Parallax } from "rc-scroll-anim"

const OurIASolution: React.FunctionComponent = () => {
  const landingPageData: LandingPageData = React.useContext(
    LandingPageDataContext
  )
  return (
    <div className="bg-white">
      <Parallax
        animation={{
          y: 0,
          playScale: [0, 1],
        }}
        style={{ transform: "translateY(15%)" }}
      >
        <div className="flex flex-wrap" id="ia-solution">
          <LeftSection
            landingPageData={landingPageData}
            className="min-w-0 md:min-w-full w-1/2 md:w-full md:mb-0 bg-white"
          />
          <RightSection
            landingPageData={landingPageData}
            className="min-w-0 md:min-w-full w-1/2 md:w-full"
          />
        </div>
      </Parallax>
    </div>
  )
}

export default OurIASolution

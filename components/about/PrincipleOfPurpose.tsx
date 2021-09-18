import * as React from "react"
/** @jsx jsx */ jsx
import { css, jsx } from "@emotion/core"
import PrincipleCard from "./principleOfPurpose/PrincipleCard"
import AboutPageDataContext from "./AboutPageDataContext"

const PrincipleOfPurpose: React.FunctionComponent = () => {
  const ourStoryPageData: OurStoryPageData = React.useContext(
    AboutPageDataContext
  )
  var imgFormat: any = "jpg"
  var imgSize = 500
  if (process.browser) {
    imgSize = imgSize * window.devicePixelRatio
    if (sessionStorage.getItem("imgFormat") !== null) {
      imgFormat = sessionStorage.getItem("imgFormat")
    }
  }
  return ourStoryPageData.fields ? (
    <div className="flex flex-col items-center mt-20" id="principle">
      <h2
        className="font-tiemposMedium text-center"
        css={css`
          max-width: 15rem;
          font-size: 2rem;
        `}
      >
        {ourStoryPageData.fields.principleHeader}
      </h2>
      <p
        className="font-opensans mt-5 md:px-4 text-center opacity-90"
        css={css`
          max-width: 21.2rem;
        `}
      >
        {ourStoryPageData.fields.principleBody}
      </p>
      <div className="px-20 md:px-0 mt-10 w-full flex flex-wrap">
        {ourStoryPageData.fields.principles.map((principle, index) => (
          <PrincipleCard
            header={principle.fields.header}
            content={principle.fields.body}
            backgroundImageURL={
              principle.fields.backgroundImage.fields.file.url +
              "?fm=" +
              imgFormat +
              "&w=" +
              imgSize
            }
            cardIconURL={principle.fields.iconImage.fields.file.url}
            className="w-1/3"
            key={index}
            index={index}
            customCss={css`
              background-color: ${principle.fields.backgroundColor};
              height: 22em;

              @media screen and (max-width: 942px) {
                width: 100%;
                height: 27em;
              }
              @media only screen and (max-width: 768px) {
                height: 30em;
              }
              @media only screen and (max-width: 425px) {
                height: 32em;
              }
            `}
          />
        ))}
      </div>
    </div>
  ) : null
}

export default PrincipleOfPurpose

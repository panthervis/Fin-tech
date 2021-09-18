import * as React from "react"

/** @jsx jsx */ jsx
import { css, jsx } from "@emotion/core"
import AboutPageDataContext from "./AboutPageDataContext"

const FinancialGroup: React.FunctionComponent = () => {
  const ourStoryPageData: OurStoryPageData = React.useContext(
    AboutPageDataContext
  )
  var imgFormat: any = "jpg"
  var imgSize = 1200
  if (process.browser) {
    imgSize = imgSize * window.devicePixelRatio
    if (sessionStorage.getItem("imgFormat") !== null) {
      imgFormat = sessionStorage.getItem("imgFormat")
    }
  }
  return ourStoryPageData.fields ? (
    <div
      className="pt-48 -mt-20 bg-cover bg-bottom text-white flex flex-col text-center items-center"
      css={css`
        background-image: linear-gradient(
            to bottom,
            rgba(51, 67, 66, 1),
            rgba(51, 67, 66, 0.8) 41%,
            rgba(51, 67, 66, 0.3) 100%
          ),
          url("${ourStoryPageData.fields.financialGroupBackgroundImage.fields
            .file.url +
            "?fm=" +
            imgFormat +
            "&w=" +
            imgSize}");
      `}
    >
      <h2
        className="font-medium font-tiempos"
        css={css`
          max-width: 17rem;
          font-size: 2rem;
          background: linear-gradient(to right bottom, #e3d8b2, #90bcc5 80%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        `}
      >
        {ourStoryPageData.fields.financialGroupHeader}
      </h2>
      <p className="mt-10 font-tiempos font-light italic">
        {ourStoryPageData.fields.financialGroupSubsidiariesHeader}
      </p>
      <div
        className="flex flex-wrap justify-center mx-20 w-full mt-10 px-20 md:px-5 md:justify-start"
        css={css`
          min-height: 164px;
        `}
      >
        {ourStoryPageData.fields.financialGroupSubsidiaries.map(
          (subsidiary, index) => (
            <div className="p-3 w-1/5 mb-3 md:w-1/2" key={index}>
              <a href={subsidiary.fields.linkUrl} target="_blank">
                <div
                  className="bg-no-repeat bg-center bg-contain"
                  css={css`
                      padding-top: 20%;
                      background-image: url("${subsidiary.fields.logoImage.fields.file.url}");
                    `}
                />
              </a>
            </div>
          )
        )}
      </div>
      <p className="font-tiempos font-light italic">
        {ourStoryPageData.fields.financialGroupInvestmentsHeader}
      </p>
      <div
        className="flex flex-wrap justify-center mx-20 w-full mt-10 px-20 md:px-5 md:justify-start"
        css={css`
          min-height: 164px;
        `}
      >
        {ourStoryPageData.fields.financialGroupInvestments.map(
          (investment, index) => (
            <div className="p-3 w-1/5 mb-3 md:w-1/2" key={index}>
              <a href={investment.fields.linkUrl} target="_blank">
                <div
                  className="bg-no-repeat bg-center bg-contain"
                  css={css`
                      padding-top: 20%;
                      background-image: url("${investment.fields.logoImage.fields.file.url}");
                    `}
                />
              </a>
            </div>
          )
        )}
      </div>
    </div>
  ) : null
}

export default FinancialGroup

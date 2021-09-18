import * as React from "react"
/** @jsx jsx */ jsx
import { css, jsx } from "@emotion/core"
import QuoteIcon from "./founderBio/quote.svg"
import AboutPageDataContext from "./AboutPageDataContext"
const FounderBio: React.FunctionComponent = () => {
  const ourStoryPageData: OurStoryPageData = React.useContext(
    AboutPageDataContext
  )
  var imgFormat: any = "jpg"
  var imgSize = 800
  if (process.browser) {
    imgSize = imgSize * window.devicePixelRatio
    if (sessionStorage.getItem("imgFormat") !== null) {
      imgFormat = sessionStorage.getItem("imgFormat")
    }
  }

  const onFadeInFounder = (elm: HTMLElement | null) => {
    if (!elm) return

    setTimeout(() => {
      elm.style.opacity = "1"
      elm.style.marginTop = "-5em"
      elm.style.transition = "all 0.7s ease-in"
    }, 0)
  }

  return ourStoryPageData.fields ? (
    <div className="relative w-full px-20 md:px-5">
      <div
        id="our_founder"
        ref={onFadeInFounder}
        className="flex md:flex-col p-10 bg-gray-8 rounded justify-center opacity-0"
        css={css`
          margin-top: -4em;
        `}
      >
        <div className="font-courierNew w-1/2 md:w-full mr-10 md:mr-0 flex flex-col items-end md:items-center">
          <div
            className="bg-top bg-no-repeat bg-top bg-cover mr-2"
            css={css`
              width: 100%;
              padding-top: 100%;
              background-image: url("${ourStoryPageData.fields.founderImage
                .fields.file.url +
                "?fm=" +
                imgFormat +
                "&w=" +
                imgSize}");
        `}
          ></div>
          <div
            className="p-8 md:px-5 rounded bg-white relative mb-10 shadow-soft"
            css={css`
              margin-top: -70px;
            `}
          >
            <QuoteIcon
              className="absolute"
              css={css`
                top: -1rem;
                left: -1rem;
              `}
            />
            <p
              className="opacity-80 text-xs leading-loose"
              css={css`
                &::first-letter {
                  font-size: 3.7rem;
                  float: left;
                  margin: 0 0.1em 0 0;
                  line-height: 0.8;
                }
              `}
            >
              {ourStoryPageData.fields.founderQuote}
            </p>
          </div>
        </div>
        <div className="font-courierNew w-1/2 md:w-full relative">
          <h2
            className="font-tiemposMedium text-right block mt-8 md:hidden absolute top-0 right-0"
            css={css`
              width: 100%;
              font-size: 2rem;
            `}
          >
            {ourStoryPageData.fields.bannerHeader}
          </h2>
          <h2
            className="font-tiemposMedium text-center hidden md:block"
            css={css`
              font-size: 2rem;
            `}
          >
            {ourStoryPageData.fields.bannerHeader}
          </h2>
          <div
            className="text-xs"
            css={css`
              margin-top: 10rem;
              @media (max-width: 420px) {
                margin-top: 3rem;
              }
            `}
          >
            {ourStoryPageData.fields.bannerBody.map((body, index) => (
              <p className="mb-6 leading-relaxed" key={index}>
                {body.fields.content}
              </p>
            ))}
          </div>
          <div
            className="italic float-right"
            css={css`
              width: 6rem;
            `}
          >
            <p className="font-tiemposMedium text-xl text-left">
              {ourStoryPageData.fields.founderName}
            </p>
            <p className="font-tiempos font-thin text-sm text-left">
              {ourStoryPageData.fields.founderPosition}
            </p>
          </div>
        </div>
      </div>
    </div>
  ) : null
}

export default FounderBio

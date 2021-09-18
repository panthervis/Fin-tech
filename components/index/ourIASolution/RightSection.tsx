import * as React from "react"

/** @jsx jsx */ jsx
import { jsx, css } from "@emotion/core"
import Carousel from "../../shared/Carsouel"
import Button from "../../shared/Button"
import Link from "next/link"

type RightSectionProps = {
  className: any
  landingPageData: LandingPageData
}

const RightSection: React.FunctionComponent<RightSectionProps> = ({
  className,
  landingPageData,
}) => {
  var imgFormat: any = "jpg"
  var imgSize = 1000
  if (process.browser) {
    imgSize = imgSize * window.devicePixelRatio
    if (sessionStorage.getItem("imgFormat") !== null) {
      imgFormat = sessionStorage.getItem("imgFormat")
    }
  }
  return (
    <div className={className + " text-teal-1"}>
      <Carousel
        indicatorClassName="bottom-0 left-0 ml-8 mb-12 flex flex-no-wrap pr-2 absolute z-20"
        indicatorCss={css`
          @media only screen and (max-width: 768px) {
            position: absolute;
            margin: 0;
            padding: 0;
            left: 50%;
            margin-left: -1.5rem;
            bottom: 21%;
          }
        `}
        dotClassName="inline-block cursor-pointer rounded-full w-2 h-2 mr-3"
        bodyCss={css`
          min-height: 36rem;
          @media only screen and (max-width: 768px) {
            min-height: 630px;
          }
        `}
        activeDotColor="bg-teal-1"
        borderColor="border-teal-2"
      >
        {landingPageData &&
          landingPageData.fields &&
          landingPageData.fields.testimonial.map((testimonial, index) => (
            <div
              className="bg-cover w-full h-full flex flex-col items-center md:h-auto"
              css={css`
                transition: opacity 2s;
                background-position: top center;
                background-image: url("${testimonial.fields
                  .testimonialBackgroundImage.fields.file.url +
                  "?fm=" +
                  imgFormat +
                  "&w=" +
                  imgSize +
                  "&q=80"}");
              `}
              key={index}
            >
              <div
                className="w-full h-full flex justify-center relative"
                css={css`
                  background: linear-gradient(
                    0deg,
                    rgba(240, 240, 238, 0) 0%,
                    rgba(240, 240, 238, 0.4) 5%,
                    rgba(240, 240, 238, 0.7) 35%,
                    rgba(240, 240, 238, 0) 60%
                  );
                `}
              >
                <h3
                  className="font-tiempos italic font-normal text-right"
                  css={css`
                    margin-top: 21rem;
                    max-width: 16rem;
                    font-size: 1.3rem;
                  `}
                >
                  {testimonial.fields.testimonialWords}
                </h3>
              </div>
              <Link href="/about#principle">
                <div className="px-20 md:px-12 w-full">
                  <Button
                    className="rounded-sm text-white font-bold text-xs hidden absolute md:static md:my-10 md:block md:mx-auto md:py-4 md:w-2/3 md:text-sm"
                    css={css`
                      background-size: 200% auto;
                      transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
                      background-image: linear-gradient(
                        to right,
                        #dd3e2f 0%,
                        #ca2732 51%,
                        #dd3e2f 100%
                      );
                      &:hover {
                        background-position: right center;
                      }
                      bottom: 6%;
                      @media screen and (max-width: 768px) {
                        margin-left: 0;
                        margin-right: 0;
                        padding-left: 1em;
                        padding-right: 1em;
                        width: 100%;
                      }
                    `}
                  >
                    {landingPageData &&
                      landingPageData.fields &&
                      landingPageData.fields.ourIaSolutionsButtonText}
                  </Button>
                </div>
              </Link>
            </div>
          ))}
      </Carousel>
    </div>
  )
}

export default RightSection

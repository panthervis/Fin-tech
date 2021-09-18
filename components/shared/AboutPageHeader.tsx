/** @jsx jsx */ jsx
import { css, jsx } from "@emotion/core"
import cn from "classnames"
import Link from "next/link"
import * as React from "react"
import Dropdown from "./Dropdown"
import { LocaleConsumer } from "../shared/context/localeContext"

const LogoAnimation: React.FC = () => (
  <div
    className="bg-cover absolute w-full h-full left-0 top-0 -z-100 flex justify-center"
    css={css`
      background-color: #3c4a4b;
    `}
  >
    <video
      autoPlay
      loop
      muted
      playsInline
      className="w-full h-full m-auto md:hidden block"
      css={css`
        object-fit: contain;
        width: 100%;
        height: 15rem;
      `}
    >
      <source src="/pi-animation-v3.mp4" type="video/mp4" />
      <img
        src={require("../../public/purposeLogoColor.png")}
        title="Your browser does not support the <video> tag"
        css={css`
          width: 100%;
          height: 15rem;
          object-fit: contain;
        `}
      />
    </video>
    <img
      className="md:block hidden"
      css={css`
        object-fit: contain;
      `}
      src={require("../../public/purposeLogoColor.png")}
      alt="Purpose Investment"
    />
  </div>
)

type AboutPageHeaderProps = {
  page?: string
}

const options = [
  { value: "about", option: "About" },
  { value: "teams", option: "Our Team" },
  { value: "careers", option: "Careers" },
  { value: "thoughtful?goto=press", option: "Press" },
]

const optionsInFr = [
  { value: "about", option: "Notre histoire" },
  { value: "teams", option: "Équipes" },
  { value: "careers", option: "Travaillez avec nous" },
  { value: "thoughtful?goto=press", option: "Dans l’actualité" },
]

// var imgFormat: any = "png"
// var imgSize = 884
// if (process.browser) {
//   imgSize = imgSize * window.devicePixelRatio
//   if (sessionStorage.getItem("imgFormat") !== null) {
//     if (sessionStorage.getItem("imgFormat") == "webp") {
//       imgFormat = sessionStorage.getItem("imgFormat")
//     }
//   }
// }

const AboutPageHeader: React.FunctionComponent<AboutPageHeaderProps> = ({
  page,
}) => (
  <LocaleConsumer>
    {({ language }: any) => (
      <div className="relative">
        <LogoAnimation />
        <div className="px-24 pb-30 flex flex-col flex-no-wrap items-center md:px-10 w-full">
          <p className="font-tiempos italic font-light text-white opacity-40 pt-40 text-xl pb-24 md:pb-8">
            {language === "en-CA" ? "with" : "avec"}
          </p>
          <div className="flex flex-no-wrap pt-10 relative md:hidden">
            {["about", "teams", "careers", "press"].map((pageName, index) => (
              <div key={index}>
                <Link
                  href={{
                    pathname: pageNameToLinkNameAndUrl(pageName, language).url,
                    query: { goto: pageName },
                  }}
                >
                  <a
                    className={cn(
                      "whitespace-no-wrap text-sm capitalize relative font-opensans mx-8",
                      page === pageName
                        ? "active text-white"
                        : "text-gray-7 cursor-pointer"
                    )}
                    css={css`
                      width: 100%;
                      transition: all 300ms ease-out;
                      &:after,
                      &:before {
                        transition: width 0.5s;
                      }
                      &:after {
                        position: absolute;
                        bottom: -9px;
                        left: 0;
                        right: 0;
                        margin: auto;
                        width: 0%;
                        content: ".";
                        color: transparent;
                        background-image: linear-gradient(
                          to right,
                          #e3d8b2,
                          #90bcc5 70%
                        );
                        height: 1.5px;
                        z-index: 10;
                      }
                      &.active:after,
                      &:hover:after {
                        width: 100%;
                      }
                      &:hover {
                        color: white;
                      }
                    `}
                  >
                    {pageNameToLinkNameAndUrl(pageName, language).linkName}
                  </a>
                </Link>
              </div>
            ))}
          </div>
          <div
            className="hidden my-4 mx-6 md:block md:w-full pt-20"
            css={css`
              max-width: 16.5rem;
            `}
          >
            {language === "en-CA" ? (
              <Dropdown options={options} initialSelectedItem={0} />
            ) : (
              <Dropdown options={optionsInFr} initialSelectedItem={0} />
            )}
          </div>
        </div>
      </div>
    )}
  </LocaleConsumer>
)

type LinkNameAndUrl = {
  linkName: string
  url: string
}

const pageNameToLinkNameAndUrl: (
  pageName: string,
  language: string
) => LinkNameAndUrl = (pageName: string, language: string) => {
  if (pageName === "about") {
    return language === "en-CA"
      ? {
          linkName: "Our Story",
          url: `/${pageName}`,
        }
      : {
          linkName: "Notre histoire",
          url: `/${pageName}`,
        }
  } else if (pageName === "press") {
    return language === "en-CA"
      ? {
          linkName: pageName,
          url: "/thoughtful",
        }
      : {
          linkName: "Dans l’actualité",
          url: "/thoughtful",
        }
  } else if (pageName === "teams") {
    return language === "en-CA"
      ? {
          linkName: "Our Team",
          url: "/teams",
        }
      : {
          linkName: "Équipes",
          url: "/teams",
        }
  } else {
    return language === "en-CA"
      ? {
          linkName: pageName,
          url: `/${pageName}`,
        }
      : {
          linkName: "Travaillez avec nous",
          url: `/${pageName}`,
        }
  }
}

export default AboutPageHeader

const AboutPageContentContainer: React.FC = ({ children }) => (
  <div className="relative">
    <div className="absolute w-full h-16 -z-100" />
    {children}
  </div>
)

export { AboutPageContentContainer }

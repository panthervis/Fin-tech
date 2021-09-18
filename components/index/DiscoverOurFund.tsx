/** @jsx jsx */ jsx
import { jsx, css } from "@emotion/core"
import * as React from "react"
import Link from "next/link"
import { Parallax } from "rc-scroll-anim"
import Button from "../shared/Button"
import DownArrow from "./discoverOurFund/downArrow.svg"
import LandingPageDataContext from "./LandingPageDataContext"
import scrollToTargetBaseNav from "../../utils/scrollToTarget"
const DiscoverOurFund: React.FunctionComponent = () => {
  const landingPageData: LandingPageData = React.useContext(
    LandingPageDataContext
  )

  let isMobile = false
  if (process.browser) {
    isMobile = window.innerWidth <= 812
  }

  return (
    <div
      className="text-left md:text-center h-screen relative md:h-screen overflow-hidden"
      css={css`
        min-height: 26rem;
      `}
    >
      {landingPageData && landingPageData.fields && !isMobile ? (
        <>
          <Parallax
            animation={{
              backgroundColor: "rgba(0,0,0,1)",
              playScale: [1, 2],
            }}
            style={{ backgroundColor: "rgba(0,0,0,0)" }}
            className="absolute -z-10"
            css={css`
              min-width: 100%;
              min-height: 100%;
              width: 100%;
              height: 100vh;
              left: 0;
              top: 0;
            `}
          ></Parallax>
          <video
            className="absolute -z-100"
            autoPlay
            loop
            muted
            playsInline
            css={css`
              min-width: 100%;
              min-height: 100%;
              width: 100%;
              height: 100vh;
              left: 0;
              top: 0;
              object-fit: cover;
              background-color: #000;
            `}
          >
            <source
              src={`${landingPageData.fields.bannerBackgroundVideo.fields.file.url}`}
              type="video/mp4"
            />
            <img
              src={require("../../public/discoverOurFundBg.jpg")}
              title="Your browser does not support the <video> tag"
            ></img>
          </video>
        </>
      ) : (
        <img
          src="/indexBannerBg.jpg"
          className="absolute -z-100"
          css={css`
            min-width: 100%;
            min-height: 100%;
            width: 100%;
            height: 100vh;
            left: 0;
            top: 0;
            object-fit: cover;
            background-color: #000;
          `}
        ></img>
      )}
      <Parallax
        animation={{
          opacity: 0,
          y: "20%",
          playScale: [1, 1.8],
        }}
        style={{ transform: "translateY(0px)", opacity: 1 }}
      >
        <h1
          className="text-white font-tiemposMedium pl-20 pr-48 md:pl-0 md:pr-0 md:text-center md:mx-auto"
          css={css`
            padding-top: 15rem;
            max-width: 49rem;
            line-height: 4rem;
            @media (max-width: 768px) {
              padding-top: 10rem;
              font-size: 3rem;
              line-height: 3.5rem;
            }
            @media (max-width: 812px) and (orientation: landscape) {
              padding-top: 5rem;
              font-size: 2.5rem;
              line-height: 3.5rem;
            }
            @media (max-width: 320px) {
              padding-top: 10rem;
              font-size: 2.2rem;
              line-height: 3rem;
            }
          `}
        >
          {landingPageData &&
            landingPageData.fields &&
            landingPageData.fields.bannerTitle}
        </h1>
        <Link href="/invest">
          <div className="px-20 md:px-12 w-full">
            <Button
              className="text-xs font-opensans font-bold ml-20 mt-6 bg-cover md:mx-auto mb-20 md:mt-20"
              css={css`
                margin-left: 0;
                margin-right: 0;
                color: #334342;
                background-color: #fff;
                transition: all 300ms ease-out;
                &:hover {
                  transform: translateY(-2px);
                  box-shadow: 0px 8px 20px rgba(0, 0, 0, 0.25);
                }
                @media (max-width: 320px) {
                  margin-top: 20px;
                }
                @media screen and (max-width: 768px) {
                  width: 100%;
                }
              `}
            >
              {landingPageData &&
                landingPageData.fields &&
                landingPageData.fields.bannerButtonText}
            </Button>
          </div>
        </Link>
        {process.browser && window && window.innerWidth <= 768 && (
          <DownArrow
            className="absolute left-1/2 cursor-pointer"
            css={css`
              margin-left: -5px;
              bottom: 24px;
              @media (max-width: 768px) {
                bottom: 50px;
              }
              @media (max-width: 320px) {
                bottom: 30px;
              }
              animation: bounce 5s infinite;
              @keyframes bounce {
                0%,
                20%,
                50%,
                80%,
                100% {
                  transform: translateY(0);
                }
                40% {
                  transform: translateY(-15px);
                }
                60% {
                  transform: translateY(-7px);
                }
              }
            `}
            onClick={() => {
              const targetSection = document.getElementById("ia-solution")
              const navbarScrolledElm = document.getElementsByTagName("nav")[1]
              scrollToTargetBaseNav(targetSection, navbarScrolledElm)
            }}
          />
        )}
      </Parallax>
    </div>
  )
}

export default DiscoverOurFund

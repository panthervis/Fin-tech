/** @jsx jsx */ jsx
import { css, jsx } from "@emotion/core"
import * as React from "react"
import Button from "../../shared/Button"
import Link from "next/link"
import cn from "classnames"

type LeftSectionProps = {
  className: any
  landingPageData: LandingPageData
}

const LeftSection: React.FunctionComponent<LeftSectionProps> = ({
  className,
  landingPageData,
}) => {
  return (
    <div className={cn(className, "py-12 px-20 md:px-12")}>
      <h2
        className="text-transparent font-tiempos leading-snug text-white"
        css={css`
          max-width: 15rem;
          background: linear-gradient(to bottom right, #e3d8b2, #90bcc5 71%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        `}
      >
        {landingPageData.fields && landingPageData.fields.exploreProductsTitle}
      </h2>
      <p
        className="text-white my-5 font-opensans"
        css={css`
          max-width: 15rem;
        `}
      >
        {landingPageData &&
          landingPageData.fields &&
          landingPageData.fields.exploreProductSubtitle}
      </p>
      <Link href="/invest">
        <Button
          className="border-white font-opensans text-white mt-6 border"
          css={css`
            @media only screen and (max-width: 768px) {
              padding-left: 1rem;
              padding-right: 1rem;
            }
            @media screen and (max-width: 768px) {
              width: 100%;
            }
            transition: all 300ms ease-out;
            &:hover {
              transform: translateY(-2px);
              box-shadow: 0px 8px 20px rgba(0, 0, 0, 0.25);
            }
          `}
        >
          {landingPageData &&
            landingPageData.fields &&
            landingPageData.fields.exploreProductsButtonText}
        </Button>
      </Link>
    </div>
  )
}

export default LeftSection

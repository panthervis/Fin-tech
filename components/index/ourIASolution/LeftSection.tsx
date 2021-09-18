/** @jsx jsx */ jsx
import { css, jsx } from "@emotion/core"
import * as React from "react"
import Link from "next/link"
import Button from "../../shared/Button"

type LeftSectionProps = {
  className: any
  landingPageData: LandingPageData
}

const LeftSection: React.FunctionComponent<LeftSectionProps> = ({
  className,
  landingPageData,
}) => {
  return (
    <div
      className={
        className +
        " py-20 md:py-10 px-20 md:px-12 flex flex-col justify-center items-start"
      }
    >
      <h2
        className="font-tiemposMedium leading-snug"
        css={css`
          max-width: 18rem;
        `}
      >
        {landingPageData &&
          landingPageData.fields &&
          landingPageData.fields.ourIaSolutionsTitle}
      </h2>
      <p
        className="font-opensans opacity-90 my-5"
        css={css`
          max-width: 14rem;
        `}
      >
        {landingPageData &&
          landingPageData.fields &&
          landingPageData.fields.ourIaSolutionsSubtitle}
      </p>
      <Link href="/about#principle">
        <Button
          className="rounded-sm bg-teal-5 text-white font-bold text-xs md:hidden px-8 py-2 md:px-10 font-opensans"
          css={css`
            transition: all 300ms ease-out;
            &:hover {
              background-color: #7bacb5;
              transform: translateY(-2px);
              box-shadow: 0px 8px 20px rgba(0, 0, 0, 0.15);
            }
          `}
        >
          {landingPageData &&
            landingPageData.fields &&
            landingPageData.fields.ourIaSolutionsButtonText}
        </Button>
      </Link>
    </div>
  )
}

export default LeftSection

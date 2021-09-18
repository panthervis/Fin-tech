/** @jsx jsx */ jsx
import { jsx, css } from "@emotion/core"
import * as React from "react"
import cn from "classnames"
import Link from "next/link"
import Dropdown from "./Dropdown"

type LegalPageHeaderProps = {
  page?: string
  header?: string
  sublinks?: boolean
  children?: React.ReactElement
}

const options = [
  { value: "privacy", option: "Privacy" },
  { value: "legal", option: "Legal" },
  { value: "disclaimer", option: "Disclaimer" },
]

const LegalPageHeader: React.FunctionComponent<LegalPageHeaderProps> = ({
  page,
  header,
  sublinks = true,
  children,
}) => {
  return (
    <div className="bg-teal-1 text-white px-24 pb-10 sm:px-4">
      <div
        className="flex flex-no-wrap pt-32 relative md:hidden"
        css={
          sublinks
            ? css`
                width: 10.375rem;
                &:after {
                  position: absolute;
                  bottom: -9px;
                  left: 0;
                  right: 0;
                  margin: auto;
                  width: 100%;
                  content: ".";
                  color: transparent;
                  background: #848d8d;
                  height: 1px;
                  z-index: 9;
                  @media only screen and (max-width: 640px) {
                    width: 100%;
                  }
                }
              `
            : css`
                width: 10.375rem;
              `
        }
      >
        {sublinks
          ? ["privacy", "legal", "disclaimer"].map((pageName, index) => (
              <Link href={`/${pageName}`} key={index}>
                <a
                  className={cn(
                    "text-xs mr-5 capitalize  relative",
                    page === pageName
                      ? "active text-white"
                      : "text-gray-3 cursor-pointer"
                  )}
                  css={css`
                    transition: width 0.5s;
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
                      background: white;
                      height: 1px;
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
                  {pageName}
                </a>
              </Link>
            ))
          : null}
      </div>
      <div
        className={`hidden md:block md:h-8 ${
          page === "search" ? "md:h-24" : "md:h-8"
        }`}
      ></div>
      {header && (
        <p
          className="font-tiempos mt-5 md:mx-6 md:mt-32"
          css={css`
            font-size: 3.75rem;
            line-height: 1.1;
            max-width: 20rem;
            @media only screen and (max-width: 768px) {
              font-size: 2.5rem;
              line-height: 1.5;
              max-width: 16rem;
            }
          `}
        >
          {header}
        </p>
      )}
      {page !== "search" && (
        <div className="hidden my-4 mx-6 md:block">
          <Dropdown options={options} />
        </div>
      )}
      {children}
    </div>
  )
}

export default LegalPageHeader

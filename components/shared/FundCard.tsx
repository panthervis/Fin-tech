/** @jsx jsx */ jsx
import { jsx, css } from "@emotion/core"
import * as React from "react"
import DownloadButton from "../shared/DownloadButton"
import Button from "../shared/Button"
import Link from "next/link"
import ReactMarkdown from "react-markdown"

type FundWrapperProps = {
  fund: any
  showActionBtn: boolean
  children: React.ReactElement
}

const FundWrapper: React.FunctionComponent<FundWrapperProps> = ({
  fund,
  showActionBtn,
  children,
}) => {
  if (!showActionBtn) {
    return /^http/.test(fund.url_name) ? (
      <a className="cursor-pointer" href={fund.url_name}>
        {children}
      </a>
    ) : (
      <span className="cursor-pointer">
        <Link href={`/funds/${fund.url_name}`}>{children}</Link>
      </span>
    )
  } else {
    return children
  }
}

type CardProps = {
  fund: any
  language?: any
  showActionBtn?: boolean
}

const FundCard: React.FunctionComponent<CardProps> = ({
  fund,
  language,
  showActionBtn = true,
}) => {
  return (
    <div
      className="p-2 md:w-full"
      css={css`
        width: 100%;
        align-self: stretch;
        @media only screen and (min-width: 768px) {
          width: 33%;
        }
      `}
    >
      <FundWrapper fund={fund} showActionBtn={showActionBtn}>
        <div
          className="p-4 h-full rounded bg-white shadow-blur relative"
          css={css`
            min-height: 10rem;
          `}
        >
          <p
            className="font-tiempos"
            css={css`
              font-size: 0.67rem;
            `}
          >
            {fund.name}
          </p>
          <p
            className="mt-1 text-gray-18"
            css={css`
              font-size: 0.625rem;
            `}
          >
            <ReactMarkdown
              source={
                fund.contentfulFields && fund.contentfulFields.fundSubheader
              }
              disallowedTypes={["paragraph", "link"]}
              unwrapDisallowed={true}
            />
          </p>
          <div
            className="flex items-center absolute"
            css={css`
              bottom: 0.825rem;
            `}
          >
            {fund.yield && (
              <div className="p-1 bg-green-6 rounded-sm text-green-7 text-3xs">
                {`${fund.yield}%`}
              </div>
            )}
            {fund.brochure ? (
              <a href={fund.brochure} target="_blank">
                <DownloadButton
                  xs
                  iconURL="/downloadArrowGreen.svg"
                  color="green-5"
                >
                  Brochure
                </DownloadButton>
              </a>
            ) : (
              ""
            )}
            {showActionBtn && (
              <>
                {/^http/.test(fund.url_name) ? (
                  <a href={fund.url_name}>
                    <Button
                      className="text-sm color-teal-1 relative bg-white border-1 border-transparent font-bold"
                      css={css`
                        background-size: 200% auto;
                        transition: all 0.5s cubic-bezier(0.25, 0.8, 0.25, 1);
                        background-image: linear-gradient(
                            rgba(255, 255, 255, 0),
                            rgba(255, 255, 255, 0)
                          ),
                          linear-gradient(
                            101deg,
                            #e2d8b2,
                            #98d3e7 51%,
                            #e2d8b2 100%
                          );
                        background-origin: border-box;
                        background-clip: content-box, border-box;
                        box-shadow: 2px 1000px 1px #fff inset;
                        &:hover {
                          background-position: right center;
                        }
                      `}
                      xs
                    >
                      {language === "en-CA" ? "View" : "Afficher"}
                    </Button>
                  </a>
                ) : (
                  <Link href={`/funds/${fund.url_name}`}>
                    <Button
                      className="text-sm color-teal-1 relative bg-white border-1 border-transparent font-bold"
                      css={css`
                        background-size: 200% auto;
                        transition: all 0.5s cubic-bezier(0.25, 0.8, 0.25, 1);
                        background-image: linear-gradient(
                            rgba(255, 255, 255, 0),
                            rgba(255, 255, 255, 0)
                          ),
                          linear-gradient(
                            101deg,
                            #e2d8b2,
                            #98d3e7 51%,
                            #e2d8b2 100%
                          );
                        background-origin: border-box;
                        background-clip: content-box, border-box;
                        box-shadow: 2px 1000px 1px #fff inset;
                        &:hover {
                          background-position: right center;
                        }
                      `}
                      xs
                    >
                      {language === "en-CA" ? "View" : "Afficher"}
                    </Button>
                  </Link>
                )}
              </>
            )}
          </div>
        </div>
      </FundWrapper>
    </div>
  )
}

export default FundCard

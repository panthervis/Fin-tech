/** @jsx jsx */ jsx
import { jsx, css } from "@emotion/core"
import * as React from "react"
import ReactMarkdown from "react-markdown"
import { ClipLoader } from "react-spinners"

import DownloadButton from "../../shared/DownloadButton"
import Link from "next/link"
import Button from "../../shared/Button"

type CardProps = {
  fund: any
  language: any
  loading: boolean
}

const FundCard: React.FunctionComponent<CardProps> = ({
  fund,
  language,
  loading,
}) => {
  var imgFormat: any = "jpg"
  if (process.browser) {
    if (sessionStorage.getItem("imgFormat") !== null) {
      imgFormat = sessionStorage.getItem("imgFormat")
    }
  }

  return (
    <Link href={`/funds/${fund.url_name}`}>
      <div
        className="p-2 sm-only:w-full md-only:w-full lg-only:w-1/2 xl-only:w-1/2 w-1/2 cursor-pointer"
        css={css`
          align-self: stretch;
        `}
      >
        {loading ? (
          <div
            className={`px-5 pt-10 pb-6 h-full text-white rounded-lg shadow-blur relative bg-center bg-cover bg-no-repeat`}
            css={css`
              background-color: #546968;
              color: transparent;
            `}
          >
            <div
              className="w-full h-full flex justify-center items-center absolute"
              css={css`
                left: 0;
                top: 0;
              `}
            >
              <ClipLoader size={50} color={"white"} />
            </div>
            <h4 className="font-tiempos w-6/7">{fund.name}</h4>
            <p className="text-xs mt-1 w-5/7">
              <ReactMarkdown
                source={
                  fund.contentfulFields && fund.contentfulFields.fundSubheader
                }
                disallowedTypes={["paragraph", "link"]}
                unwrapDisallowed={true}
              />
            </p>
            <div
              css={css`
                height: 3.6rem;
              `}
            ></div>
            <div
              className="flex mt-5 items-center absolute"
              css={css`
                bottom: 1.1rem;
              `}
            >
              <div
                css={css`
                  font-size: 0.625rem;
                `}
                className="ml-4"
              >
                <p className="font-tiempos font-light italic">
                  — {language === "en-CA" ? "Managed by" : "Géré par"}
                </p>
                <p>{fund.pms[0] || fund.firm}</p>
              </div>
            </div>
          </div>
        ) : (
          <div
            className={`px-5 pt-10 sm:pt-5 lg:pt-5 pb-6 h-full text-white rounded-lg shadow-blur relative bg-center bg-cover bg-no-repeat`}
            css={css`
            transition: all 300ms ease-out;
            background-image:
            linear-gradient(
                ${fund.themeColor},
                ${fund.themeColor}
              ),
              url("${fund.contentfulFields &&
                fund.contentfulFields.fundBackgroundImage &&
                fund.contentfulFields.fundBackgroundImage.fields.file.url +
                  "?fm=" +
                  imgFormat +
                  "&w=600"}");
            &:hover {
              transform: scale(1.02);
            }
          `}
          >
            <h4 className="font-tiempos w-6/7">{fund.name}</h4>
            <p className="text-xs mt-1 w-5/7 sm:w-auto lg:w-auto sm:mb-4">
              <ReactMarkdown
                source={
                  fund.contentfulFields && fund.contentfulFields.fundSubheader
                }
                disallowedTypes={["paragraph", "link"]}
                unwrapDisallowed={true}
              />
            </p>
            <div
              css={css`
                height: 3.6rem;
              `}
              className="sm:m-2"
            ></div>
            <div
              className="sm:flex-wrap flex mt-5 items-center absolute"
              css={css`
                bottom: 1.1rem;
              `}
            >
              {fund.yield && (
                <Button
                  xs
                  className="bg-gray-23 flex-col justify-center sm:p-0 sm:mr-4 p-1 mr-4 sm:w-auto"
                >
                  <div className="text-3xs">YIELD</div>
                  <div className="text-3xs">{`${fund.yield}%`}</div>
                </Button>
              )}
              {fund.brochure ? (
                <a
                  className={fund.yield && "sm:w-auto sm:p-0 sm:mr-0"}
                  href={fund.brochure}
                  target="_self"
                >
                  <DownloadButton
                    sm
                    color="teal-1"
                    iconURL="/downloadArrow.svg"
                    onClick={(event: Event) => {
                      event.stopPropagation()
                    }}
                  >
                    Brochure
                  </DownloadButton>
                </a>
              ) : (
                ""
              )}
              <div
                css={css`
                  font-size: 0.625rem;
                `}
                className="sm:w-full sm:mt-2 sm:ml-0 ml-4"
              >
                <p className="font-tiempos font-light italic">
                  — {language === "en-CA" ? "Managed by" : "Géré par"}
                </p>
                <p>{fund.pms[0] || fund.firm}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </Link>
  )
}

export default FundCard

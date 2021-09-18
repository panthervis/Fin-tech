import * as React from "react"

/** @jsx jsx */ jsx
import { css, jsx } from "@emotion/core"
import dynamic from "next/dynamic"
import _ from "underscore"
import AboutPageDataContext from "./AboutPageDataContext"
import moment from "moment"
const RSC = dynamic(import("react-scrollbars-custom"))

const History: React.FunctionComponent = () => {
  const ourStoryPageData: OurStoryPageData = React.useContext(
    AboutPageDataContext
  )
  return ourStoryPageData.fields ? (
    <div
      className="px-20 md:px-5 mt-20 md:hidden"
      css={css`
        width: 100%;
        height: 26.5rem;
      `}
    >
      <RSC
        css={css`
          height: 26.58rem;
          & .ScrollbarsCustom-Wrapper {
            height: 100%;
            width: 100%;
          }
          & .ScrollbarsCustom-TrackY {
            position: absolute;
            overflow: hidden;
            border-radius: 4px;
            background: #737681;
            user-select: none;
            width: 10px;
            height: calc(100% - 30%);
            top: 15%;
            right: 3.2rem;
          }
          & .ScrollbarsCustom-ThumbY {
            touch-action: none;
            cursor: pointer;
            border-radius: 4px;
            background: white;
            width: 100%;
            height: 41.7391px;
            transform: translateY(0px);
          }
        `}
        noDefaultStyles={true}
      >
        <div className="flex flex-no-wrap bg-gray-14 relative">
          <div className="w-2/7">
            <div
              className="absolute h-full top-0 left-2/7"
              css={css`
                width: 8.5px;
                background-image: linear-gradient(to bottom, #e3d8b2, #9bcbd5);
              `}
            ></div>
          </div>
          <div className="w-5/7 p-10">
            <h2
              className="font-tiemposMedium"
              css={css`
                padding-top: 0.6rem;
                font-size: 2rem;
              `}
            >
              {ourStoryPageData.fields.historyHeader}
            </h2>
            {ourStoryPageData.fields.histories.map((history, index) => (
              <div
                className="mt-10 text-xs flex flex-no-wrap text-transparent w-full"
                key={index}
              >
                <div>{moment(history.fields.date).format("MMM DD, YYYY")}</div>
                <div>{history.fields.content}</div>
              </div>
            ))}
            <div
              className="absolute left-0 mt-10 w-full"
              css={css`
                top: 3.375rem;
                @media only screen and (max-width: 977px) {
                  top: 5rem;
                }
              `}
            >
              {_.sortBy(ourStoryPageData.fields.histories, history => {
                return new Date(history.fields.date).getTime() * -1
              }).map((history, index) => (
                <div
                  className="mt-10 text-xs flex flex-no-wrap w-full items-center relative"
                  key={index}
                >
                  <div className="text-white w-2/7 text-right pr-16 font-tiempos italic">
                    {moment(history.fields.date).format("MMMM D, YYYY")}
                  </div>
                  <div
                    className="bg-white border border-gray-15 rounded-full absolute left-2/7"
                    css={css`
                      width: 2.41rem;
                      height: 2.41rem;
                      border-width: 0.53rem;
                      background-clip: content-box;
                      margin-left: -1.01rem;
                    `}
                  ></div>
                  <div
                    className="w-5/7 px-10 font-opensans opacity-90"
                    css={css`
                      padding-right: 7rem;
                    `}
                  >
                    {history.fields.content}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </RSC>
    </div>
  ) : null
}

export default History

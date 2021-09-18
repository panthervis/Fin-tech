/** @jsx jsx */ jsx
import { css, jsx } from "@emotion/core"
import * as React from "react"
import { Transition, animated, Spring } from "react-spring/renderprops.cjs"
import CloseIcon from "./teamModal/close.svg"
import LeftArrowTeam from "./teamModal/leftArrowTeam.svg"
import RightArrowTeam from "./teamModal/rightArrowTeam.svg"
import Oval from "./teamModal/Oval.svg"
import cn from "classnames"
import _ from "underscore"
import FundListContext from "../../../product/FundListContext"
import FundAccordion from "./FundAccordion"

type TeamModalProps = {
  teamMember: TeamMember
  showNavigation: boolean
  goToPrev?: () => void
  goToNext?: () => void
  isModalOpen: boolean
  closeModal: () => void
}

const TeamModal: React.FunctionComponent<TeamModalProps> = ({
  teamMember,
  isModalOpen,
  closeModal,
  showNavigation,
  goToNext = () => {},
  goToPrev = () => {},
}) => {
  var imgFormat: any = "jpg"
  if (process.browser) {
    if (sessionStorage.getItem("imgFormat") !== null) {
      imgFormat = sessionStorage.getItem("imgFormat")
    }
  }
  if (teamMember && teamMember.fields && teamMember.fields.email) {
    const allFundsData: any = React.useContext(FundListContext)
    var fundList: any = []
    _.each(allFundsData, function(fund: any) {
      _.each(fund.pm_emails, function(email) {
        if (email == teamMember.fields.email) {
          fundList.push({ name: fund.name, link: fund.url_name })
        }
      })
    })
  }

  return teamMember && teamMember.fields ? (
    <Transition
      native
      items={isModalOpen}
      from={{ opacity: 0 }}
      enter={{ opacity: 1 }}
      leave={{ opacity: 0 }}
      config={{ duration: 500 }}
    >
      {show =>
        show &&
        (props => (
          <animated.div
            style={props}
            className={cn(
              "w-screen h-screen flex lg:block px-20 fixed top-0 left-0 z-50 bg-white lg:p-0 text-teal-1"
            )}
            css={css`
              html,
              body {
                overflow: hidden;
              }
              @media (max-width: 920px) {
                overflow: auto;
              }
            `}
          >
            <CloseIcon
              className="absolute cursor-pointer"
              onClick={() => closeModal()}
              css={css`
                top: 2rem;
                left: 5rem;
                @media (max-width: 420px) {
                  top: 2rem;
                  left: 2rem;
                }
              `}
            />
            <div
              className="w-1/2 bg-contain bg-bottom bg-no-repeat mr-20 mt-20 lg:w-full lg:h-full"
              css={css`
                    background-image: url("${teamMember.fields.profileImage
                      .fields.file.url +
                      "?fm=" +
                      imgFormat}");
          @media (max-width: 920px) {
            display: block;
            height: 300px;
          }
          @media (max-width: 420px) {
            display: block;
            height: 250px;
          }
        `}
            ></div>
            <div className="w-1/2 bg-gray-8 pt-20 lg:pt-8 px-10 overflow-y-auto lg:w-full">
              <Spring
                from={{
                  transform: "translateY(200px)",
                }}
                to={{ transform: "translateY(0px)" }}
                delay={200}
              >
                {props => (
                  <div style={props}>
                    <h3
                      className="font-tiemposMedium"
                      css={css`
                        font-size: 1.83rem;
                      `}
                    >
                      {teamMember.fields.name}
                    </h3>
                    <p className="italic font-tiempos font-light mt-2 leading-tight">
                      {teamMember.fields.title}
                    </p>
                    <div className="mb-5">
                      {teamMember.fields.hasOwnProperty("phoneNumber") && (
                        <a
                          className="text-xs font-tiempos font-light tracking-wider"
                          href={
                            "tel:+1" +
                            teamMember.fields.phoneNumber.replace(/[^0-9]/g, "")
                          }
                        >
                          {teamMember.fields.phoneNumber}
                        </a>
                      )}
                    </div>
                    {teamMember.fields.description.map((content, index) => (
                      <div
                        className="text-xs font-opensans opacity-90 my-2 flex flex-no-wrap"
                        key={index}
                      >
                        <span className="mr-2 mt-1">
                          <Oval />
                        </span>
                        {content}
                      </div>
                    ))}
                    <p className="font-tiempos italic text-2xl mt-5">
                      <span
                        className="text-3xl align-middle"
                        css={css`
                          line-height: 0;
                        `}
                      >
                        "
                      </span>
                      {teamMember.fields.quote}
                      <span
                        className="text-3xl align-middle"
                        css={css`
                          line-height: 0;
                        `}
                      >
                        "
                      </span>
                    </p>
                    {fundList && fundList.length > 0 && (
                      <div>
                        <FundAccordion fundList={fundList} />
                      </div>
                    )}
                    {showNavigation && (
                      <div className="flex flex-no-wrap justify-end mt-3">
                        <LeftArrowTeam
                          className="-mr-8 hover:cursor-pointer"
                          onClick={() => goToPrev()}
                        />
                        <RightArrowTeam
                          className="hover:cursor-pointer"
                          onClick={() => goToNext()}
                        />
                      </div>
                    )}
                  </div>
                )}
              </Spring>
            </div>
          </animated.div>
        ))
      }
    </Transition>
  ) : null
}

export default TeamModal

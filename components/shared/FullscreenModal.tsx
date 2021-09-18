/** @jsx jsx */ jsx
import { css, jsx } from "@emotion/core"
import * as React from "react"
//import {Stickyroll} from '@stickyroll/stickyroll';
import cn from "classnames"

import CloseIcon from "../teams/teams/teamCarousel/teamModal/close.svg"
import LeftArrow from "../teams/teams/teamCarousel/teamModal/leftArrowTeam.svg"
import RightArrow from "../teams/teams/teamCarousel/teamModal/rightArrowTeam.svg"

type FullscreenModal = {
  showNavigation?: boolean
  goToPrev?: () => void
  goToNext?: () => void
  isModalOpen: boolean
  closeModal: () => void
  style?: any
  ref?: any
}

const FullscreenModal: React.FunctionComponent<FullscreenModal> = ({
  children,
  isModalOpen,
  closeModal,
  showNavigation = false,
  goToNext = () => {},
  goToPrev = () => {},
  ref,
  style = {},
}) => {
  return isModalOpen && children ? (
    <div
      className={cn(
        "w-screen flex fixed top-0 left-0 z-50 bg-white lg:p-0 text-teal-1"
      )}
      css={css`
        height: 500vh;
        html,
        body {
          overflow: hidden;
        }
        @media (max-width: 920px) {
          overflow: auto;
        }
      `}
      ref={ref}
      style={style}
    >
      <CloseIcon
        className="absolute cursor-pointer"
        onClick={() => closeModal()}
        css={css`
          top: 2rem;
          left: 5rem;
          z-index: 10;
          @media (max-width: 420px) {
            top: 2rem;
            left: 2rem;
          }
        `}
      />
      {children}
      {showNavigation && (
        <div className="flex flex-no-wrap justify-end mt-3">
          <LeftArrow className="-mr-8" onClick={() => goToPrev()} />
          <RightArrow onClick={() => goToNext()} />
        </div>
      )}
    </div>
  ) : null
}

export default FullscreenModal

/** @jsx jsx */ jsx
import { css, jsx } from "@emotion/core"
import * as React from "react"
import Slider from "react-slick"
import Button from "../../shared/Button"
import DividerBlock from "./teamCarousel/DividerBlock"

type TeamCarouselProps = {
  teamName: string
  team: Team
  setCurrentMember: React.Dispatch<any>
  setIsModalOpen: React.Dispatch<any>
}

const TeamCarousel = React.forwardRef(
  (
    { teamName, team, setCurrentMember, setIsModalOpen }: TeamCarouselProps,
    ref:
      | string
      | ((instance: Slider | null) => void)
      | React.RefObject<Slider>
      | null
      | undefined
  ) => {
    const sliderSettings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 4,
      centerPadding: "60px",
      initialSlide: 0,
      className: "center",
      centerMode: true,
      responsive: [
        {
          breakpoint: 1280,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
          },
        },
        {
          breakpoint: 640,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          },
        },
      ],
    }
    const teamMembers = team.fields.members

    var imgFormat: any = "jpg"
    var imgSize = 426

    if (process.browser) {
      imgSize = imgSize * window.devicePixelRatio
      if (sessionStorage.getItem("imgFormat") !== null) {
        imgFormat = sessionStorage.getItem("imgFormat")
      }
    }

    return (
      <div
        className="mt-12"
        id={team.fields.teamName
          .toLowerCase()
          .split(" ")
          .join("-")}
      >
        <h2 className="text-3xl font-tiemposMedium text-center mb-8">
          {teamName}
        </h2>
        <div>
          <Slider ref={ref} {...sliderSettings}>
            {teamMembers.map((teamMember, index) => (
              <div
                className="outline-none relative"
                key={index}
                onMouseEnter={() => console.log("hover")}
                // css={css`
                //   &:hover .bg-image-2 {
                //     opacity: 1;
                //   }
                // `}
              >
                {/* background images */}
                <div
                  className="bg-image-1 absolute bg-bottom h-full w-full -z-100 left-0 top-0"
                  css={css`
                background-image: url("${teamMember.fields.profileImage.fields
                  .file.url +
                  "?w=" +
                  imgSize +
                  "&fm=" +
                  imgFormat +
                  "&q=80"}");
                background-repeat: no-repeat;
                background-size: contain;
                z-index: -100;
              `}
                />
                {teamMember.fields.secondaryProfileImage && (
                  <div
                    className="bg-image-2 absolute bg-bottom h-full w-full left-0 top-0"
                    css={css`
                background-image: url("${teamMember.fields.secondaryProfileImage.fields.file.url}");
                background-repeat: no-repeat;
                background-size: contain;
                z-index: -99;
                opacity: 0;
                transition: all 300ms;
              `}
                  />
                )}

                <div
                  className="flex flex-col justify-end items-center"
                  css={css`
                    height: 426px;
                  `}
                >
                  <Button
                    className="text-3xs border bg-white font-bold sm:text-lg"
                    xs
                    onClick={() => {
                      setCurrentMember({
                        member: teamMember,
                        teamName,
                        index,
                      })
                      setIsModalOpen(true)
                    }}
                  >
                    {teamMember.fields.name}
                  </Button>
                  <p
                    className="font-tiempos italic font-light text-center text-xs text-white mb-6 mt-3 sm:text-base"
                    css={css`
                      width: 60%;
                      text-shadow: 0px 0px 4px #000;
                    `}
                  >
                    {teamMember.fields.position}
                  </p>
                </div>
              </div>
            ))}
          </Slider>
        </div>
        <DividerBlockWithOrder order={team.fields.order} />
      </div>
    )
  }
)

type DividerBlockWithOrderProps = {
  order: number
}

const DividerBlockWithOrder: React.FunctionComponent<DividerBlockWithOrderProps> = ({
  order,
}) => {
  if (order % 3 === 0) {
    return <DividerBlock colorOne="#451C6B" colorTwo="#93C1D0" />
  } else if (order % 2 === 0) {
    return <DividerBlock colorOne="#0F7161" colorTwo="#94C2D1" />
  } else {
    return <DividerBlock colorOne="#11397F" colorTwo="#37C0E8" />
  }
}

export default TeamCarousel

/** @jsx jsx */ jsx
import { jsx, css } from "@emotion/core"
import * as React from "react"
import Slider from "react-slick"
import Button from "../shared/Button"
import InvestPageDataContext from "./InvestPageDataContext"
import TeamPageDataProvider from "../teams/TeamPageDataContext"
import LocaleContext from "../shared/context/localeContext"

const SalesTeam: React.FunctionComponent = () => {
  const locale: any = React.useContext(LocaleContext)
  const investPageData: InvestPageData = React.useContext(InvestPageDataContext)
  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
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
  const teamPageData: any = React.useContext(TeamPageDataProvider)
  let teamMembers: TeamMember[] = []
  if (teamPageData.fields && teamPageData.fields.teams) {
    const salesTeam = teamPageData.fields.teams.find((team: Team) => {
      return (
        team.fields.teamName === "Sales" || team.fields.teamName === "Ventes"
      )
    })
    if (salesTeam) {
      teamMembers = salesTeam.fields.members
    }
  }
  var imgFormat: any = "jpg"
  var imgSize = 308
  if (process.browser) {
    imgSize = imgSize * window.devicePixelRatio
    if (sessionStorage.getItem("imgFormat") !== null) {
      imgFormat = sessionStorage.getItem("imgFormat")
    }
  }

  return (
    <div>
      <h3 className="font-tiempos italic font-light text-red-4 text-center mt-6">
        {investPageData.fields && investPageData.fields.salesTeamHeader}
      </h3>
      <p
        className="font-tiemposMedium text-center"
        css={css`
          font-size: 1.83rem;
        `}
      >
        {investPageData.fields && investPageData.fields.salesTeamSubheader}
      </p>
      {teamMembers.length > 0 && (
        <Slider {...sliderSettings}>
          {teamMembers.map((teamMember, index) => (
            <div className="outline-none" key={index}>
              <div
                className="bg-bottom flex flex-col justify-end items-center"
                key={index}
                css={css`
                background-image: url("${teamMember.fields &&
                  teamMember.fields.profileImage.fields.file.url +
                    "?fm=" +
                    imgFormat +
                    "&w=" +
                    imgSize}");
                background-repeat: no-repeat;
                background-size: contain;
                height: 426px;
              `}
              >
                <p className="text-sm text-center mb-12">
                  <a
                    href={`mailto:${teamMember.fields &&
                      teamMember.fields
                        .email}?Subject=Question%20for%20the%20Sales%20Team&body=Hello ${teamMember.fields &&
                      teamMember.fields.name.split(" ")[0]},%0d%0a%0d%0a
I’ve got a question about:`}
                    target="_top"
                  >
                    <Button className="text-3xs border bg-white font-bold" xs>
                      {locale.language === "en-CA" ? "Ask " : "Demandez à "}
                      {teamMember.fields &&
                        teamMember.fields.name.split(" ")[0]}
                    </Button>
                  </a>
                </p>
              </div>
            </div>
          ))}
        </Slider>
      )}
    </div>
  )
}

export default SalesTeam

import * as React from "react"

import TeamCarousel from "./teams/TeamCarousel"
import FilterSection from "./teams/FilterSection"
import TeamModal from "./teams/teamCarousel/TeamModal"
import TeamPageDataContext from "./TeamPageDataContext"
import scrollToTargetBaseNav from "../../utils/scrollToTarget"

const getParameterByName = (name: string, url?: string) => {
  if (!url) url = window.location.href
  name = name.replace(/[\[\]]/g, "\\$&")
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
    results = regex.exec(url)
  if (!results) return null
  if (!results[2]) return ""
  return decodeURIComponent(results[2].replace(/\+/g, " "))
}

const Teams: React.FunctionComponent = () => {
  const teamPageData: TeamPageData = React.useContext(TeamPageDataContext)
  const [currentMember, setCurrentMember] = React.useState()
  const [isModalOpen, setIsModalOpen] = React.useState(false)
  const setIsModalOpenAndBodyScroll = (value: boolean) => {
    setIsModalOpen(value)
    if (process.browser && document) {
      document.body.style.overflow = value ? "hidden" : "auto"
    }
  }
  const sliders: any = {}
  const goTo = (option: string) => {
    if (currentMember && teamPageData.fields) {
      const team = teamPageData.fields.teams.filter(team => {
        return team.fields.teamName === currentMember.teamName
      })
      if (team.length > 0) {
        let targetIndex: number
        if (option === "next") {
          targetIndex = currentMember.index + 1
          if (targetIndex > team[0].fields.members.length - 1) {
            targetIndex = 0
          }
        } else {
          targetIndex = currentMember.index - 1
          if (targetIndex < 0) {
            targetIndex = team[0].fields.members.length - 1
          }
        }
        const nextMember = team[0].fields.members[targetIndex]
        setCurrentMember({
          member: nextMember,
          index: targetIndex,
          teamName: currentMember.teamName,
        })
      }
    }
  }
  if (teamPageData && teamPageData.fields) {
    teamPageData.fields.teams = teamPageData.fields.teams.sort((a, b) => {
      return a.fields.order < b.fields.order ? -1 : 1
    })
  }
  React.useEffect(() => {
    const timeout = setTimeout(() => {
      const teamName = getParameterByName("team")
      if (teamName) {
        const targetSection = document.getElementById(teamName)
        const navbarScrolledElm = document.getElementsByTagName("nav")[1]
        scrollToTargetBaseNav(targetSection, navbarScrolledElm)
      }
    }, 500)
    return () => clearTimeout(timeout)
  }, [])
  return teamPageData && teamPageData.fields ? (
    <React.Fragment>
      <FilterSection teams={teamPageData.fields.teams} sliders={sliders} />
      <div>
        {teamPageData.fields.teams.map((team, index) => (
          <TeamCarousel
            teamName={team.fields.teamName}
            key={index}
            team={team}
            ref={(slider: any) => {
              sliders[team.fields.order] = slider
            }}
            setCurrentMember={setCurrentMember}
            setIsModalOpen={setIsModalOpenAndBodyScroll}
          ></TeamCarousel>
        ))}
      </div>
      <TeamModal
        teamMember={currentMember && currentMember.member}
        isModalOpen={isModalOpen}
        closeModal={() => {
          setIsModalOpenAndBodyScroll(false)
        }}
        showNavigation={true}
        goToNext={() => goTo("next")}
        goToPrev={() => goTo("prev")}
      />
    </React.Fragment>
  ) : null
}

export default Teams

/** @jsx jsx */ jsx
import { css, jsx } from "@emotion/core"
import * as React from "react"
import Button from "../../shared/Button"
import Autocomplete from "react-autocomplete"
import cn from "classnames"
import SearchIcon from "./filterSection/search.svg"
import scrollToTargetBaseNav from "../../../utils/scrollToTarget"

type FilterSectionProps = {
  teams: Team[]
  sliders: any[]
}

const FilterSection: React.FunctionComponent<FilterSectionProps> = ({
  teams,
  sliders,
}) => {
  const teamNames = teams.map(team => {
    return team.fields.teamName
  })
  const items = teams.reduce((accumulator: any, team) => {
    return accumulator.concat(
      team.fields.members.map((member, index) => {
        return {
          teamOrder: team.fields.order,
          teamName: team.fields.teamName,
          memberName: member.fields.name,
          index,
        }
      })
    )
  }, [])
  const [searchValue, setSearchValue] = React.useState("")
  return (
    <div
      css={css`
        margin-top: -2rem;
      `}
      ref={ref => {
        if (!ref) return
        setTimeout(() => {
          ref.style.opacity = "1"
          ref.style.marginTop = "-3.1rem"
          ref.style.transition = "all 0.7s ease-in"
        }, 0)
      }}
      className="w-full px-20 xl-only:px-0 lg-only:px-0 md:px-0 absolute w-full opacity-0"
    >
      <div className="flex md:flex-col p-10 bg-gray-8 rounded justify-center items-center -mt-20">
        {teamNames.map((teamName, index) => (
          <Button
            className="bg-gray-11 whitespace-no-wrap hover:bg-gray-12 text-center my-2 mx-4 sm:hidden md:hidden"
            css={css`
              transition: all 300ms ease-out;
            `}
            onClick={() => {
              const targetSection = document.getElementById(
                teamName
                  .toLowerCase()
                  .split(" ")
                  .join("-")
              )
              const navbarScrolledElm = document.getElementsByTagName("nav")[1]
              scrollToTargetBaseNav(targetSection, navbarScrolledElm)
            }}
            sm
            key={index}
          >
            {teamName}
          </Button>
        ))}
        <Autocomplete
          items={items}
          getItemValue={item => item.memberName}
          value={searchValue}
          renderItem={(item, isHighlighted) => (
            <div className={cn("p-2", isHighlighted ? "bg-gray-1" : "")}>
              {item.memberName}
            </div>
          )}
          onChange={e => setSearchValue(e.target.value)}
          onSelect={value => {
            setSearchValue(value)
            const target = items.filter((item: any) => {
              return item.memberName === value
            })[0]
            const targetSlider = sliders[target.teamOrder]
            const targetSection = document.getElementById(
              target.teamName
                .toLowerCase()
                .split(" ")
                .join("-")
            )
            if (targetSection) {
              setTimeout(() => {
                const navbarScrolledElm = document.getElementsByTagName(
                  "nav"
                )[1]
                scrollToTargetBaseNav(targetSection, navbarScrolledElm)
              }, 1000 * 0.5)
            }
            targetSlider.slickGoTo(target.index)
          }}
          shouldItemRender={(item, value) =>
            item.memberName.toLowerCase().indexOf(value.toLowerCase()) > -1
          }
          menuStyle={{
            borderRadius: "0.125rem",
            boxShadow: "0 2px 12px rgba(0, 0, 0, 0.1)",
            background: "rgba(255, 255, 255, 0.9)",
            padding: "2px 0",
            fontSize: "0.75rem",
            position: "absolute",
            overflow: "auto",
            maxHeight: "10rem",
            top: "2.5rem",
            left: 0,
            zIndex: 100,
          }}
          inputProps={{
            className:
              " p-2 pl-8 text-xs md:text-xl outline-none bg-gray-8 border-gray-13 border rounded",
          }}
          wrapperProps={{
            className: "relative  mx-4",
          }}
          renderInput={(props: any) => {
            return (
              <div className="relative">
                <SearchIcon
                  className="absolute ml-2 w-1/6 "
                  css={css`
                    top: 50%;
                    margin-top: -9px;
                    margin-left: 0.8rem;
                  `}
                />
                <input {...props} placeholder="Search Teams" />
              </div>
            )
          }}
        />
      </div>
    </div>
  )
}

export default FilterSection

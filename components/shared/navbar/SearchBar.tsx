/** @jsx jsx */ jsx
import * as React from "react"
import { jsx, css } from "@emotion/core"
import Router from "next/router"
import Link from "next/link"
import SearchIcon from "./search.svg"
import CloseIcon from "./close.svg"
import LocaleContext, { LocaleConsumer } from "../context/localeContext"
import TeamPageDataContext from "../../teams/TeamPageDataContext"
import FundListContext from "../../product/FundListContext"
import StoryListDataContext from "../../search/StoryListDataContext"
import {
  getFilteredProducts,
  getFilteredStories,
  getFilteredTeamMembers,
  groupAllPagesData,
  getFilteredPages,
} from "../../search/helper"
import useDebouncedCallback from "../../../hooks/useDebouncedCallback"
import Products from "../../search/Products"
import TeamMembers from "../../search/TeamMembers"
import Stories from "../../search/Stories"
import AboutPageDataContext from "../../about/AboutPageDataContext"
import LandingPageDataContext from "../../index/LandingPageDataContext"
import CanadiansPageDataContext from "../../canadians/CanadiansPageDataContext"
import CareerPageDataContext from "../../careers/CareerPageDataContext"
import DisclaimerPageDataContext from "../../disclaimer/DisclaimerPageDataContext"
import PrivacyPageDataContext from "../../privacy/PrivacyPageDataContext"
import LegalPageDataContext from "../../legal/LegalPageDataContext"
import Pages from "../../search/Pages"
import {
  EventEmitterProvider,
  eventEmitter,
  LocalEventAction,
} from "../../../utils/eventEmitter"
import { useEventEmitter } from "../../../utils/useEventEmitter"

type SearchInputProps = {
  defaultValue: any
  onChange: any
  inputClasses?: string
  iconCss?: any
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void
}

export const SearchInput: React.FunctionComponent<SearchInputProps> = ({
  defaultValue,
  onChange,
  inputClasses = "",
  iconCss = "",
  onKeyDown,
}) => {
  const [value, setValue] = React.useState(defaultValue)

  return (
    <LocaleConsumer>
      {({ language }: any) => (
        <div className="relative max-w-md w-full">
          <input
            id="searchInput"
            type="text"
            autoFocus
            autoComplete="off"
            placeholder={
              language === "en-CA"
                ? "funds, managers, asset class"
                : "fonds, gestionnaires, catégorie d’actifs"
            }
            className={`text-black-0 font-opensans text-md w-full md:w-11/12 pb-3 border-b border-gray-10 focus:outline-none bg-transparent ${inputClasses}`}
            value={value}
            onChange={e => {
              setValue(e.target.value)
              onChange(e)
            }}
            onKeyDown={onKeyDown}
          />
          <button
            className="absolute right-0 bottom-0 cursor-pointer pb-3 md:hidden"
            type="submit"
          >
            <SearchIcon className="w-5" css={iconCss} />
          </button>
        </div>
      )}
    </LocaleConsumer>
  )
}

type SearchBarProps = {
  onClose?: any
}

const SearchBar: React.FunctionComponent<SearchBarProps> = ({
  onClose = () => {},
}) => {
  // debounced search value
  const [searchInput, setSearchInput] = React.useState("")

  // actual search value
  const [actualSearchInput, setActualSearchInput] = React.useState("")

  const locale: any = React.useContext(LocaleContext)
  const language = locale.language
  const teamPageData: TeamPageData = React.useContext(TeamPageDataContext)
  const allFundsData: any = React.useContext(FundListContext)
  const allStories: Array<Post> = React.useContext(StoryListDataContext)
  const aboutPage: OurStoryPageData = React.useContext(AboutPageDataContext)
  const landingPage: LandingPageData = React.useContext(LandingPageDataContext)
  const canadiansPage: CanadiansPageData = React.useContext(
    CanadiansPageDataContext
  )
  const careersPage: CareerPageData = React.useContext(CareerPageDataContext)
  const disclaimerPage: DisclaimerPageData = React.useContext(
    DisclaimerPageDataContext
  )
  const privacyPage: PrivacyPageData = React.useContext(PrivacyPageDataContext)
  const legalPage: LegalPageData = React.useContext(LegalPageDataContext)

  const allPages = groupAllPagesData({
    language,
    aboutPage,
    landingPage,
    canadiansPage,
    careersPage,
    disclaimerPage,
    privacyPage,
    legalPage,
  })

  // filtered team members
  const filteredTeamMembers = searchInput
    ? getFilteredTeamMembers({
        teamPageData,
        searchInput,
      })
    : []

  // filter projects
  const filteredProducts = searchInput
    ? getFilteredProducts({
        allFunds: allFundsData,
        searchInput,
      })
    : []

  // filter stories
  const filteredStories = searchInput
    ? getFilteredStories({
        allStories,
        searchInput,
      })
    : []

  // filter pages
  const filteredPages = searchInput
    ? getFilteredPages({
        allPages,
        searchInput,
      })
    : []

  // on change debounced
  const onChangeDebounced = useDebouncedCallback(
    value => setSearchInput(value),
    500
  )

  const maxResultsToShow: number = 3

  const totalResults =
    filteredTeamMembers.length +
    filteredProducts.length +
    filteredStories.length +
    filteredPages.length

  let resultsShowing: {
    [key: string]: number
  } = {
    total: 0,
    team: 0,
    products: 0,
    stories: 0,
    pages: 0,
  }

  const groupedResults = [
    { items: filteredProducts, key: "products" },
    { items: filteredTeamMembers, key: "team" },
    { items: filteredStories, key: "stories" },
    { items: filteredPages, key: "pages" },
  ]

  for (let i = 0; i < maxResultsToShow; i++) {
    for (let j = 0; j < groupedResults.length; j++) {
      if (groupedResults[j].items.length > i) {
        resultsShowing.total += 1
        resultsShowing[groupedResults[j].key] += 1
      }

      if (resultsShowing.total === maxResultsToShow) break
    }
    if (resultsShowing.total === maxResultsToShow) break
  }

  const getSuggestedKeys = () => {
    const keys: string[] = []
    filteredProducts.slice(0, resultsShowing.products).forEach(v => {
      keys.push(v.url_name)
    })
    filteredTeamMembers.slice(0, resultsShowing.team).forEach(v => {
      keys.push(v.sys.id)
    })
    filteredStories.slice(0, resultsShowing.stories).forEach(v => {
      keys.push(v.url)
    })
    filteredPages.slice(0, resultsShowing.pages).forEach(v => {
      keys.push(v[v.key].url)
    })
    return keys
  }

  const suggestKeys = getSuggestedKeys()
  let currentIndex = -1

  const emitSuggestSearchEvent = () => {
    useEventEmitter(
      LocalEventAction.ACTIVE_SUGGEST_SEARCH,
      suggestKeys[currentIndex],
      100
    )
  }

  const emitSubmitSearchEvent = () => {
    useEventEmitter(
      LocalEventAction.SUBMIT_SUGGEST_SEARCH,
      suggestKeys[currentIndex],
      500
    )
  }

  React.useEffect(() => {
    if (suggestKeys.length > 0) {
      eventEmitter.emit(
        LocalEventAction.ACTIVE_SUGGEST_SEARCH,
        suggestKeys[currentIndex]
      )
    }
  }, [JSON.stringify(suggestKeys)])
  return (
    <EventEmitterProvider>
      <div className="flex flex-col absolute w-full bg-white top-0 left-0 z-10 px-20 md:px-6">
        <div className="flex py-6 flex-row items-center">
          <form
            className="flex flex-col w-4/5 md:w-10/12"
            onSubmit={e => {
              e.preventDefault()
              e.stopPropagation()

              if (currentIndex === -1) {
                Router.push(`/search?q=${actualSearchInput}`)
              } else {
                emitSubmitSearchEvent()
              }
            }}
          >
            <label
              htmlFor="searchInput"
              className="text-teal-1 text-md italic font-tiempos font-hairline"
            >
              {language === "en-CA"
                ? "What are you looking for?"
                : "Que cherchez-vous?"}
            </label>
            <SearchInput
              defaultValue={searchInput}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setActualSearchInput(e.target.value)
                onChangeDebounced(e.target.value)
              }}
              onKeyDown={e => {
                if (e.key === "ArrowDown") {
                  if (currentIndex >= maxResultsToShow - 1) {
                    currentIndex = -1
                  } else {
                    currentIndex++
                  }
                  emitSuggestSearchEvent()
                } else if (e.key === "ArrowUp") {
                  if (currentIndex <= -1) {
                    currentIndex = maxResultsToShow - 1
                  } else {
                    currentIndex--
                  }
                  emitSuggestSearchEvent()
                }
              }}
            />
          </form>
          <button onClick={() => onClose()} className="cursor-pointer md:ml-2">
            <CloseIcon />
          </button>
        </div>
        {searchInput && (
          <>
            <div
              className="max-h-1/2-screen overflow-auto"
              css={css`
                max-width: 32rem;
              `}
            >
              {resultsShowing.products > 0 && (
                <Products
                  products={filteredProducts.slice(0, resultsShowing.products)}
                  showHeading={false}
                  condensed={true}
                />
              )}
              {resultsShowing.team > 0 && (
                <TeamMembers
                  teamMembers={filteredTeamMembers.slice(
                    0,
                    resultsShowing.team
                  )}
                  showHeading={false}
                  condensed={true}
                />
              )}
              {resultsShowing.stories > 0 && (
                <Stories
                  stories={filteredStories.slice(0, resultsShowing.stories)}
                  showHeading={false}
                  condensed={true}
                />
              )}
              {resultsShowing.pages > 0 && (
                <Pages
                  pages={filteredPages.slice(0, resultsShowing.pages)}
                  showHeading={false}
                  condensed={true}
                />
              )}
            </div>
            {totalResults - resultsShowing.total > 0 && (
              <Link href={`/search?q=${searchInput}`}>
                <div className="text-teal-8 font-opensans text-sm py-2 cursor-pointer">
                  {totalResults - resultsShowing.total} other results, show all
                </div>
              </Link>
            )}
          </>
        )}
      </div>
    </EventEmitterProvider>
  )
}

export default SearchBar

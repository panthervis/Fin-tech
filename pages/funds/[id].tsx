/** @jsx jsx */ jsx
import { jsx, css } from "@emotion/core"
import * as React from "react"
import Link from "next/link"
import { useRouter } from "next/router"
import Layout from "../../components/shared/Layout"
import Modal from "../../components/shared/Modal"
import cn from "classnames"
import Overview from "../../components/product/Overview"
import PortfolioBreakdown from "../../components/product/PortfolioBreakdown"
import PerformanceAndDistribution from "../../components/product/PerformanceAndDistribution"
import Button from "../../components/shared/Button"
import _ from "underscore"
import Documents from "../../components/product/Documents"
import FundStories from "../../components/product/FundStories"
import { FundDataProvider } from "../../components/product/FundDataContext"
import { NextPage, NextPageContext } from "next"
import { parseCookies } from "../../utils/parseCookies"
import { fetchSingleFundData, fetchFundMapData } from "../../utils/fund"
import LocaleContext from "../../components/shared/context/localeContext"
import BannerSection from "../../components/product/BannerSection"
import Dropdown from "../../components/shared/Dropdown"
import { formatOptions } from "../../utils/helpers"
import { createNewEvent } from "../../utils/createEvent"
import TeamPageDataProvider from "../../components/teams/TeamPageDataContext"
import StoryListDataContext from "../../components/search/StoryListDataContext"

const TabOption: React.FunctionComponent<any> = ({
  children,
  active,
  onClick,
}) => (
  <div
    className={cn(
      "px-3 py-2 text-2xs bold relative cursor-pointer mr-5 text-gray-6 text-center font-bold whitespace-no-wrap",
      active ? "active" : ""
    )}
    onClick={onClick}
    css={css`
      transition: width 0.5s;
      &:after,
      &:before {
        transition: width 0.5s;
      }
      &:after {
        position: absolute;
        bottom: -1px;
        left: 0;
        right: 0;
        margin: auto;
        width: 0%;
        content: ".";
        color: transparent;
        background: #334342;
        height: 1px;
        z-index: 10;
      }
      &.active {
        color: #334342;
      }
      &.active:after,
      &:hover:after {
        width: 80%;
      }
    `}
  >
    {children}
  </div>
)

const sortSeries = (seriesNames: string[]) => {
  const etf = _.filter(seriesNames, seriesName => {
    return seriesName.match(/ETF/) !== null
  })
  const rest = _.reject(seriesNames, seriesName => {
    return seriesName.match(/ETF/) !== null
  })
  return etf.concat(rest)
}

const ProductContainer: React.FunctionComponent<any> = ({ serverFundData }) => {
  // product page data
  const teamPageData: any = React.useContext(TeamPageDataProvider)
  const [
    offeringMemorandumRequired,
    setOfferingMemorandumRequired,
  ] = React.useState(false) // For Offering Memorandum Gate
  const locale: any = React.useContext(LocaleContext)
  const router: any = useRouter()

  React.useEffect(() => {
    const windowPathnameWithQuery =
      window.location.pathname + window.location.search
    const routerPathnameWithQuery = router.pathname + window.location.search
    router.push(routerPathnameWithQuery, windowPathnameWithQuery, {})
  }, [locale.language])

  const allStories: Array<Post> = React.useContext(StoryListDataContext)
  var filteredStories: Array<Post> = []
  _.each(allStories, function(post) {
    _.each(post.tags, function(tag) {
      if (tag.name.toUpperCase() == serverFundData.code) {
        filteredStories.push(post)
      }
    })
  })

  let tabs = [
    "Overview",
    "Portfolio Breakdown",
    "Performance & Distributions",
    "Documents",
  ]
  let frTabs = [
    "Vue d'ensemble",
    "Répartition du portefeuille",
    "Rendement et distribuitions",
    "Documents",
  ]
  if (
    serverFundData &&
    serverFundData.portfolio &&
    (!serverFundData.portfolio.exposure ||
      Object.keys(serverFundData.portfolio.exposure).length === 0) &&
    !serverFundData.portfolio.exposureCaInterest &&
    !serverFundData.portfolio.exposureHistorical &&
    !serverFundData.portfolio.exposureUsInterest &&
    (!serverFundData.portfolio.holdings ||
      (serverFundData.portfolio.holdings["Holding Breakdown"] &&
        serverFundData.portfolio.holdings["Holding Breakdown"].length === 0)) &&
    (!serverFundData.portfolio.pie || serverFundData.portfolio.pie.length === 0)
  ) {
    tabs = ["Overview", "Performance & Distributions", "Documents"]
    frTabs = ["Vue d'ensemble", "Rendement et distribuitions", "Documents"]
  }

  if (filteredStories.length > 0) {
    tabs.push("News & Updates")
    frTabs.push("Nouvelles mise à jour")
  }

  const [currentTab, setCurrentTab] = React.useState(tabs[0])
  const seriesNames = serverFundData
    ? sortSeries(Object.keys(serverFundData && serverFundData.details))
    : []
  // currentSeries for Portfolio Breakdown and Performance
  const [currentSeries, setCurrentSeries] = React.useState()
  // selectedSeries for Overview details
  const [selectedSeries, setSelectedSeries] = React.useState()

  const [isSeriesOptionOpen, setIsSeriesOptionOpen] = React.useState(false)
  React.useEffect(() => {
    if (!currentSeries) {
      setCurrentSeries(seriesNames[0])
    }
  }, [seriesNames])
  React.useEffect(() => {
    if (process.browser && window) {
      window.dispatchEvent(createNewEvent("resize"))
    }
  }, [currentTab])

  // Offering Memorandum Check
  // First check fund for OM flag
  const omRequired: boolean =
    _.has(serverFundData, "om") && serverFundData.om === true ? true : false
  // Next check series for "(OM)" in name
  const seriesOMRequired: boolean =
    serverFundData &&
    selectedSeries &&
    serverFundData.series[selectedSeries].name.includes("(OM)")
  React.useEffect(() => {
    setOfferingMemorandumRequired(omRequired || seriesOMRequired)
  }, [omRequired, seriesOMRequired])

  // team members
  let allTeamMembers: Array<TeamMember> | Array<any> = []
  let pmsTeamMembers: Array<TeamMember> | Array<any> = []

  // ref
  const tabRef: React.RefObject<HTMLInputElement> = React.useRef(null)
  const mobileTabRef: React.RefObject<HTMLInputElement> = React.useRef(null)

  // scroll to ref
  const scrollToRef = () => {
    if (process.browser && window) {
      if (
        tabRef &&
        tabRef.current &&
        window.getComputedStyle(tabRef.current).display !== "none"
      ) {
        // desktop
        window.scrollTo(0, tabRef.current.offsetTop - 100)
      } else if (
        mobileTabRef &&
        mobileTabRef.current &&
        window.getComputedStyle(mobileTabRef.current).display !== "none"
      ) {
        // mobile
        window.scrollTo(0, mobileTabRef.current.offsetTop - 92)
      }
    }
  }

  if (serverFundData && teamPageData.fields && teamPageData.fields.teams) {
    // flat all team members
    teamPageData.fields.teams.map((team: any) => {
      team.fields.members.map((member: TeamMember) => {
        allTeamMembers.push(member)
      })
    })

    // find team members
    if (allTeamMembers && serverFundData.pms && serverFundData.pms.length > 0) {
      pmsTeamMembers = serverFundData.pms.map((pms: any) => {
        return allTeamMembers.find(
          (member: TeamMember) =>
            member.fields.email &&
            pms.email &&
            member.fields.email
              .trim()
              .toLowerCase()
              .includes(pms.email.trim().toLowerCase())
        )
      })
    }
  }

  return (
    <FundDataProvider value={serverFundData}>
      <Modal display={offeringMemorandumRequired}>
        <div className="flex justify-between items-center pb-3 text-xl">
          <p className="font-tiemposMedium">
            {locale.language === "en-CA"
              ? "Are you an Accredited Investor?"
              : "Êtes-vous un investisseur qualifié?"}
          </p>
        </div>

        {locale.language === "en-CA" ? (
          <>
            <p>
              Securities law restricts the sale of this product to Accredited
              Investors only. There are a number of ways investors may qualify
              as an accredited investor.
            </p>
            <br />
            <p>
              Please consult with your financial advisor to determine if you
              qualify.
            </p>
          </>
        ) : (
          <>
            <p>
              Le droit des valeurs mobilières limite la vente de ce produit aux
              seuls investisseurs qualifiés. Les investisseurs peuvent être
              considérés comme un investisseur qualifié de plusieurs manières.
            </p>
            <br />
            <p>
              Veuillez consulter votre conseiller financier pour déterminer
              votre admissibilité.
            </p>
          </>
        )}
        <div className="flex justify-end pt-2 mt-2">
          <Link href="/invest">
            <Button
              sm
              className="rounded-sm mr-2 hover:bg-gray-200"
              css={css`
                background-size: 200% auto;
                transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
                &:hover {
                  background-position: right center;
                }
              `}
            >
              {locale.language === "en-CA" ? "No" : "Non"}
            </Button>
          </Link>
          <Button
            sm
            className="rounded-sm text-white"
            onClick={() => setOfferingMemorandumRequired(false)}
            css={css`
              background-size: 200% auto;
              transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
              background-image: linear-gradient(
                to right,
                #dd3e2f 0%,
                #ca2732 51%,
                #dd3e2f 100%
              );
              &:hover {
                background-position: right center;
              }
            `}
          >
            {locale.language === "en-CA" ? "Yes" : "Oui"}
          </Button>
        </div>
      </Modal>

      <BannerSection
        offeringMemorandumRequired={offeringMemorandumRequired}
        setOfferingMemorandumRequired={setOfferingMemorandumRequired}
      />
      {offeringMemorandumRequired === false || seriesOMRequired === true ? (
        <>
          <div
            className="px-20 md:px-5"
            css={css`
              border-bottom: 1px solid #d6d6d6;
            `}
          >
            <div className="mt-5 flex items-end sm:flex-wrap">
              <div ref={tabRef} className="flex items-end sm:hidden">
                {tabs.map((tab, index) => (
                  <TabOption
                    active={currentTab === tab}
                    onClick={() => {
                      setCurrentTab(tab)
                      scrollToRef()
                    }}
                    key={index}
                  >
                    {locale.language === "en-CA" ? tab : frTabs[index]}
                  </TabOption>
                ))}
              </div>
              <div ref={mobileTabRef} className="hidden mb-5 w-full sm:block">
                {locale.language === "en-CA" ? (
                  <Dropdown
                    onChange={(selected: any) => {
                      scrollToRef()
                      return tabs && setCurrentTab(tabs[selected])
                    }}
                    categories={tabs}
                    options={formatOptions(tabs)}
                    initialSelectedItem={0}
                  />
                ) : (
                  <Dropdown
                    onChange={(selected: any) => {
                      scrollToRef()
                      return tabs && setCurrentTab(tabs[selected])
                    }}
                    categories={frTabs}
                    options={formatOptions(frTabs)}
                    initialSelectedItem={0}
                  />
                )}
              </div>

              {currentTab === "Performance & Distributions" && (
                <div className="flex items-center mb-2 sm:w-full">
                  {seriesNames.slice(0, 2).map((seriesName, index) => {
                    const name = seriesName.match(/ETF/)
                      ? seriesName
                      : `Series ${seriesName}`
                    return (
                      <Button
                        key={index}
                        xs
                        className={cn(
                          "border border-gray-1 mr-2 h-6",
                          seriesName === currentSeries ? "active" : ""
                        )}
                        css={css`
                          white-space: nowrap;
                          &.active {
                            border-color: transparent;
                            background-color: rgba(144, 188, 197, 0.34);
                          }
                        `}
                        onClick={() => {
                          setCurrentSeries(seriesName)
                        }}
                      >
                        {name}
                      </Button>
                    )
                  })}
                  {seriesNames.length > 2 && (
                    <div className="h-6 flex items-center relative">
                      <Button
                        xs
                        className="border border-gray-1 mr-2 h-6"
                        onClick={() => {
                          setIsSeriesOptionOpen(!isSeriesOptionOpen)
                        }}
                        css={css`
                          white-space: nowrap;
                        `}
                      >
                        {locale.language === "en-CA" ? "Other" : "Autre"}{" "}
                        &#9662;
                      </Button>
                      <div
                        className={cn(
                          "flex flex-col absolute border border-gray-1 rounded",
                          isSeriesOptionOpen ? "" : "hidden"
                        )}
                        css={css`
                          top: 2rem;
                          z-index: 1000;
                          overflow: hidden;
                          background: white;
                        `}
                      >
                        {seriesNames.slice(2).map((seriesName, index) => {
                          const name = seriesName.match(/ETF/)
                            ? seriesName
                            : `Series ${seriesName}`
                          return (
                            <li
                              key={index}
                              className={cn(
                                "list-none text-3xs px-2 py-1 z-20 cursor-pointer",
                                seriesName === currentSeries ? "active" : ""
                              )}
                              css={css`
                                min-width: 5rem;
                                &.active,
                                &:hover {
                                  background: rgba(144, 188, 197, 0.34);
                                }
                              `}
                              onClick={() => {
                                setCurrentSeries(seriesName)
                                setIsSeriesOptionOpen(false)
                              }}
                            >
                              {name}
                            </li>
                          )
                        })}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
          <Overview
            pmsTeamMembers={pmsTeamMembers}
            fundData={serverFundData}
            isHidden={currentTab !== "Overview"}
            setSelectedSeries={setSelectedSeries}
            selectedSeries={selectedSeries}
          />
          <PortfolioBreakdown
            fundData={serverFundData}
            isHidden={currentTab !== "Portfolio Breakdown"}
          />
          <PerformanceAndDistribution
            fundData={serverFundData}
            isHidden={currentTab !== "Performance & Distributions"}
            currentSeries={currentSeries}
          />
          <Documents
            fundData={serverFundData}
            isHidden={currentTab !== "Documents"}
          />
          {filteredStories && (
            <FundStories
              stories={filteredStories}
              isHidden={currentTab !== "News & Updates"}
            />
          )}
        </>
      ) : null}
    </FundDataProvider>
  )
}

type ProductPageProps = {
  fundDataFromServer: any
}

const Product: NextPage<ProductPageProps> = ({ fundDataFromServer }) => {
  return (
    <Layout
      title={fundDataFromServer.metaTitle}
      description={fundDataFromServer.metaDescription}
      image={fundDataFromServer.fundBackgroundImage.fields.file.url}
      url={"https://www.purposeinvest.com/funds/" + fundDataFromServer.url_name}
    >
      <ProductContainer serverFundData={fundDataFromServer} />
    </Layout>
  )
}

Product.getInitialProps = async (ctx: NextPageContext) => {
  const cookie = parseCookies(ctx.req)
  const fundMap = await fetchFundMapData()
  let id = fundMap[ctx.query.id.toString()]
    ? fundMap[ctx.query.id.toString()]
    : ctx.query.id.toString().toUpperCase()
  const result = await fetchSingleFundData(
    id as string,
    cookie.locale || "en-CA"
  )
  return {
    initialLocale: cookie.locale,
    fundDataFromServer: result,
  }
}

export default Product

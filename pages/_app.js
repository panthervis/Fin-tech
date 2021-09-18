import cookies from "js-cookie"
import React from "react"
import { PageTransition } from "next-page-transitions"
import usePageData from "../hooks/usePageData"
import useFundData from "../hooks/useFund"
import useGhostAllPost from "../hooks/useGhostAllPost"
import { TeamPageDataProvider } from "../components/teams/TeamPageDataContext"
import { FundListProvider } from "../components/product/FundListContext"
import { StoryListDataProvider } from "../components/search/StoryListDataContext"
import { LocaleProvider } from "../components/shared/context/localeContext"
import { AboutPageDataProvider } from "../components/about/AboutPageDataContext"
import { LandingPageDataProvider } from "../components/index/LandingPageDataContext"
import { CanadiansPageDataProvider } from "../components/canadians/CanadiansPageDataContext"
import { CareerPageDataProvider } from "../components/careers/CareerPageDataContext"
import { DisclaimerPageDataProvider } from "../components/disclaimer/DisclaimerPageDataContext"
import { PrivacyPageDataProvider } from "../components/privacy/PrivacyPageDataContext"
import { LegalPageDataProvider } from "../components/legal/LegalPageDataContext"
import { ThoughtfulPageDataProvider } from "../components/thoughtful/ThoughtfulPageDataContext"
import { InvestPageDataProvider } from "../components/invest/InvestPageDataContext"
import { AssetClassProvider } from "../components/invest/AssetClassContext"
import "../components/shared/layout/index.css"

const transitionTimeInMs = 500

const PageTransitionContainer = ({ children, transition }) => {
  if (transition) {
    return (
      <>
        <PageTransition
          timeout={transitionTimeInMs}
          classNames="page-transition"
          skipInitialTransition={false}
          monkeyPatchScrolling={true}
        >
          {children}
        </PageTransition>
        <style jsx global>{`
          .page-transition-enter {
            opacity: 0;
          }
          .page-transition-enter-active {
            opacity: 1;
            transition: opacity ${transitionTimeInMs}ms ease-in-out;
          }
          .page-transition-exit {
            opacity: 1;
          }
          .page-transition-exit-active {
            opacity: 0;
            transition: opacity ${transitionTimeInMs}ms ease-in-out;
          }
        `}</style>
      </>
    )
  }

  return children
}

const DataProviders = ({ children }) => {
  // get all funds
  const Fund = useFundData()
  const allFundsData = Fund.getFundData()

  // get stories
  const { getGhostAllPosts } = useGhostAllPost()
  const allStories = getGhostAllPosts()

  const teamPageName = "Team Page"
  const storyPageName = "Our Story Page"
  const landingPageName = "Landing Page"
  const canadiansPageName = "Canadians Page"
  const careerPageName = "Career Page"
  const disclaimerPageName = "Disclaimer Page"
  const privacyPageName = "Privacy Page"
  const legalPageName = "Legal Page"
  const thoughtfulPageName = "Thoughtful Page"
  const investPageName = "Invest Page"
  const assetClassName = "Asset Class"

  // get contenful all page data
  const { getPageData: getAllPagesData } = usePageData([
    teamPageName,
    storyPageName,
    landingPageName,
    canadiansPageName,
    careerPageName,
    disclaimerPageName,
    privacyPageName,
    legalPageName,
    thoughtfulPageName,
    investPageName,
    assetClassName,
  ])

  const allPagesData = getAllPagesData()

  const teamPageData = allPagesData[teamPageName] || {}

  const thoughtfulPageData = allPagesData[thoughtfulPageName] || {}

  const investPageData = allPagesData[investPageName] || {}
  const assetClassData = allPagesData[assetClassName] || {}

  // story page data - about page
  const ourStoryPageData = allPagesData[storyPageName] || {}

  // landing page data
  const landingPageData = allPagesData[landingPageName] || {}

  // candians page
  const canadiansPageData = allPagesData[canadiansPageName] || {}

  // candians page
  const careersPageData = allPagesData[careerPageName] || {}

  // disclaimer page
  const disclaimerPageData = allPagesData[disclaimerPageName] || {}

  // privacy
  const privacyPageData = allPagesData[privacyPageName] || {}

  // legal
  const legalPageData = allPagesData[legalPageName] || {}

  return (
    <AssetClassProvider value={assetClassData}>
      <TeamPageDataProvider value={teamPageData}>
        <ThoughtfulPageDataProvider value={thoughtfulPageData}>
          <InvestPageDataProvider value={investPageData}>
            <FundListProvider value={allFundsData}>
              <StoryListDataProvider value={allStories}>
                <LandingPageDataProvider value={landingPageData}>
                  <AboutPageDataProvider value={ourStoryPageData}>
                    <CanadiansPageDataProvider value={canadiansPageData}>
                      <CareerPageDataProvider value={careersPageData}>
                        <DisclaimerPageDataProvider value={disclaimerPageData}>
                          <PrivacyPageDataProvider value={privacyPageData}>
                            <LegalPageDataProvider value={legalPageData}>
                              {children}
                            </LegalPageDataProvider>
                          </PrivacyPageDataProvider>
                        </DisclaimerPageDataProvider>
                      </CareerPageDataProvider>
                    </CanadiansPageDataProvider>
                  </AboutPageDataProvider>
                </LandingPageDataProvider>
              </StoryListDataProvider>
            </FundListProvider>
          </InvestPageDataProvider>
        </ThoughtfulPageDataProvider>
      </TeamPageDataProvider>
    </AssetClassProvider>
  )
}

let history = ""
const noTransitionsRoutes = [
  ["/about", "/teams", "/careers"],
  ["/privacy", "/legal", "/disclaimer"],
]

const MyApp = ({ Component, pageProps, router }) => {
  const [currentLocale, setCurrentLocale] = React.useState(
    (pageProps && pageProps.initialLocale) || defaultLocale()
  )

  // new path
  const newPathName = router.pathname

  // should do page transition
  let transition = history !== newPathName

  // overwrite page transition
  noTransitionsRoutes.some(noTransitionsRoute => {
    if (
      noTransitionsRoute.includes(newPathName) &&
      noTransitionsRoute.includes(history)
    ) {
      transition = false
      return true
    }
  })

  // update history
  history = newPathName

  React.useEffect(() => {
    cookies.set("locale", currentLocale)
  }, [currentLocale])

  return (
    <LocaleProvider
      value={{
        language: currentLocale,
        setLanguage: setCurrentLocale,
      }}
    >
      <DataProviders>
        {/* <PageTransitionContainer transition={transition}> */}
        <Component {...pageProps} />
        {/* </PageTransitionContainer> */}
      </DataProviders>
    </LocaleProvider>
  )
}

const defaultLocale = () => {
  if (process.browser && navigator.languages) {
    return navigator.languages[0].match(/fr/) ? "fr-CA" : "en-CA"
  } else {
    return "en-CA"
  }
}

// Only uncomment this method if you have blocking data requirements for
// every single page in your application. This disables the ability to
// perform automatic static optimization, causing every page in your app to
// be server-side rendered.
//
// MyApp.getInitialProps = async (appContext) => {
//   // calls page's `getInitialProps` and fills `appProps.pageProps`
//   const appProps = await App.getInitialProps(appContext);
//
//   return { ...appProps }
// }

export default MyApp

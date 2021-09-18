import { NextPage, NextPageContext } from "next"
import * as React from "react"

import FinancialGroup from "../components/about/FinancialGroup"
import FounderBio from "../components/about/FounderBio"
import History from "../components/about/History"
import PrincipleOfPurpose from "../components/about/PrincipleOfPurpose"
import AboutPageHeader, {
  AboutPageContentContainer,
} from "../components/shared/AboutPageHeader"
import Layout from "../components/shared/Layout"
import { parseCookies } from "../utils/parseCookies"

const AboutPageContainer: React.FunctionComponent<any> = () => {
  return (
    <>
      <AboutPageHeader page="about" />
      <AboutPageContentContainer>
        <FounderBio />
        <PrincipleOfPurpose />
        <History />
        <FinancialGroup />
      </AboutPageContentContainer>
    </>
  )
}

type AboutPageProps = {}

const AboutPage: NextPage<AboutPageProps> = () => {
  return (
    <Layout
      title="At Purpose Investments we create success for investors like you"
      description="Our principles live at the heart of everything we do. Together they guide how we build the firm where thoughtful Canadians invest — find out more."
    >
      <AboutPageContainer />
    </Layout>
  )
}

AboutPage.getInitialProps = async (ctx: NextPageContext) => {
  const cookie = parseCookies(ctx.req)
  return {
    initialLocale: cookie.locale,
  }
}

export default AboutPage

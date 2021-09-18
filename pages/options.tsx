import { NextPage, NextPageContext } from "next"
import * as React from "react"

import Layout from "../components/shared/Layout"
import { parseCookies } from "../utils/parseCookies"

import HowTobuy from "../components/options/HowToBuy"
import IncomeStrategies from "../components/options/IncomeStrategies"
import QnA from "../components/options/QnA"
import YiedlFundTabs from "../components/options/YieldFundTabs"

const OptionsPageContainer = () => {
  return (
    <div>
      <IncomeStrategies />
      <YiedlFundTabs />
      <HowTobuy />
      <QnA />
    </div>
  )
}

type OPtionsPageProps = {}

const OptionsPage: NextPage<OPtionsPageProps> = () => {
  return (
    <Layout
      title="Options writing | Equity Income | Alternatives | Purpose Investments"
      description="Purpose Enhanced Premium Yield Fund &amp; Purpose Premium Yield Fund, take advantage of market volatility to generate income through options writing—Learn more."
      image="https://images.ctfassets.net/jedpjsv2glq1/3y7XMEFtfMW42zVJvHY3RX/23b076b9154f4be6163af468c4991752/Put_Options_-_Thumbnail.png"
    >
      <OptionsPageContainer />
    </Layout>
  )
}

OptionsPage.getInitialProps = async (ctx: NextPageContext) => {
  const cookie = parseCookies(ctx.req)
  return {
    initialLocale: cookie.locale,
  }
}

export default OptionsPage

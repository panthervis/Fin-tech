import * as React from "react"
import { NextPage, NextPageContext } from "next"

import Layout from "../components/shared/Layout"
import FundAwards from "../components/fund-awards"
import { parseCookies } from "../utils/parseCookies"

const FundAwardsPageContainer = () => {
  return (
    <div>
      <FundAwards />
    </div>
  )
}

type FundAwardsPageProps = {}

const FundAwardsPage: NextPage<FundAwardsPageProps> = () => (
  <Layout>
    <FundAwardsPageContainer />
  </Layout>
)

FundAwardsPage.getInitialProps = async (ctx: NextPageContext) => {
  const cookie = parseCookies(ctx.req)
  return {
    initialLocale: cookie.locale,
  }
}

export default FundAwardsPage

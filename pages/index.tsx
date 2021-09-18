import { NextPage, NextPageContext } from "next"
import * as React from "react"

import DiscoverOurFund from "../components/index/DiscoverOurFund"
import ExploreOurProduct from "../components/index/ExploreOurProduct"
import OurIASolution from "../components/index/OurIASolution"
import Layout from "../components/shared/Layout"
import { parseCookies } from "../utils/parseCookies"

type IndexPageContainerProps = {}

const IndexPageContainer: React.FunctionComponent<IndexPageContainerProps> = () => {
  return (
    <>
      <DiscoverOurFund />
      <OurIASolution />
      <ExploreOurProduct />
    </>
  )
}

type IndexPageProps = {}

const IndexPage: NextPage<IndexPageProps> = () => (
  <Layout description="Build a resilient portfolio with our optimized investment strategies, including alternative investments, that are risk managed to meet your financial goals.">
    <IndexPageContainer />
  </Layout>
)

IndexPage.getInitialProps = async (ctx: NextPageContext) => {
  const cookie = parseCookies(ctx.req)
  return {
    initialLocale: cookie.locale,
  }
}

export default IndexPage

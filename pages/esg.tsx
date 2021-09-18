import { NextPage, NextPageContext } from "next"
import * as React from "react"

import Layout from "../components/shared/Layout"
import ApproachToEsg from "../components/esg/ApproachToEsg"
import { parseCookies } from "../utils/parseCookies"

const EsgPageContainer = () => {
  return (
    <div>
      <ApproachToEsg />
    </div>
  )
}

type EsgPageProps = {}

const EsgPage: NextPage<EsgPageProps> = () => {
  return (
    <Layout
      title="What is ESG socially responsible investing | Purpose Investments"
      description="Responsible investing has always been one of our core principles, ESG provides important insights to the future outcomes of investments – find out how."
    >
      <EsgPageContainer />
    </Layout>
  )
}

EsgPage.getInitialProps = async (ctx: NextPageContext) => {
  const cookie = parseCookies(ctx.req)
  return {
    initialLocale: cookie.locale,
  }
}

export default EsgPage

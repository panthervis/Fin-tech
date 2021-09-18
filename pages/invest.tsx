import * as React from "react"
import { NextPage, NextPageContext } from "next"
import { useRouter } from "next/router"

import { FundDataProvider } from "../components/invest/FundDataContext"
import FundsFilter from "../components/invest/FundsFilter"
import ProductIndex from "../components/invest/ProductIndex"
import SalesTeam from "../components/invest/SalesTeam"
import { FundFilterProvider } from "../components/shared/context/fundFilterContext"
import LocaleContext from "../components/shared/context/localeContext"
import Layout from "../components/shared/Layout"
import { fetchEntriesForFunds } from "../utils/fund"
import { parseCookies } from "../utils/parseCookies"

const InvestPageContainer: React.FunctionComponent<any> = ({
  fundsDataFromServer,
}) => {
  const [isShowAllFunds, setIsShowAllFunds] = React.useState(false) //isShowAllFunds

  const locale: any = React.useContext(LocaleContext)
  const router: any = useRouter()

  React.useEffect(() => {
    router.push(router.pathname, window.location.pathname, {})
  }, [locale.language])

  return (
    <FundDataProvider
      value={{
        filteredFunds: fundsDataFromServer,
        allFunds: fundsDataFromServer,
      }}
    >
      <FundsFilter setIsShowAllFunds={setIsShowAllFunds} />
      <ProductIndex
        isShowAllFunds={isShowAllFunds}
        setIsShowAllFunds={setIsShowAllFunds}
      />
      <SalesTeam />
    </FundDataProvider>
  )
}

type InvestPageProps = {
  fundsDataFromServer: any
}

const InvestPage: NextPage<InvestPageProps> = ({ fundsDataFromServer }) => {
  const [filter, setFilter] = React.useState({})
  return (
    <FundFilterProvider
      value={{
        filter,
        setFilter,
      }}
    >
      <Layout
        title="Active Fixed Income | Equity | Alternatives | Cash | Purpose Invest"
        description="Our funds are optimized for specific goals. We offer a full range of Cash, Active Fixed income &amp; Equity income, Alternative Strategies and Balanced Portfolios."
      >
        <InvestPageContainer fundsDataFromServer={fundsDataFromServer} />
      </Layout>
    </FundFilterProvider>
  )
}

InvestPage.getInitialProps = async (ctx: NextPageContext) => {
  const cookie = parseCookies(ctx.req)
  const fundsDataFromServer = await fetchEntriesForFunds(cookie.locale, {
    outcome: "",
    assetClass: "",
    region: "",
    manager: "",
  })

  return {
    initialLocale: cookie.locale,
    fundsDataFromServer,
  }
}

export default InvestPage

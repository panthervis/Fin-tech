import { NextPage, NextPageContext } from "next"
import * as React from "react"
import Layout from "../components/shared/Layout"
import LegalPageHeader from "../components/shared/LegalPageHeader"
import TerminatedFundsTable from "../components/terminatedFunds/TermindatedFundsTable"
import useTerminatedFundData from "../hooks/useTerminatedFund"
import { parseCookies } from "../utils/parseCookies"
import { fetchEntriesForTerminatedFunds } from "../utils/fund"
import LocaleContext from "../components/shared/context/localeContext"

const TerminatedFundsContainer: React.FunctionComponent<any> = ({
  terminvatedFundsDataFromServer,
}) => {
  const { getTerminatedFundData } = useTerminatedFundData()
  const fundData = getTerminatedFundData()
  const data =
    process.browser && fundData ? fundData : terminvatedFundsDataFromServer
  const locale: any = React.useContext(LocaleContext)
  const [header, setHeader] = React.useState()
  React.useEffect(() => {
    setHeader(
      locale.language === "fr-CA" ? "Fonds résiliés" : "Terminated Funds"
    )
  }, [locale.language])
  return (
    <React.Fragment>
      <LegalPageHeader
        page="terminated-funds"
        header={header}
        sublinks={false}
      />
      <div className="px-24 py-20">
        <TerminatedFundsTable funds={data} />
      </div>
    </React.Fragment>
  )
}

type TerminvatedFundsProps = {
  terminvatedFundsDataFromServer: any
}

const TerminatedFunds: NextPage<TerminvatedFundsProps> = ({
  terminvatedFundsDataFromServer,
}) => {
  return (
    <Layout>
      <TerminatedFundsContainer
        terminvatedFundsDataFromServer={terminvatedFundsDataFromServer}
      />
    </Layout>
  )
}

TerminatedFunds.getInitialProps = async (ctx: NextPageContext) => {
  const cookie = parseCookies(ctx.req)
  const result = await fetchEntriesForTerminatedFunds(cookie.language)
  let terminvatedFundsDataFromServer: any
  if (result) terminvatedFundsDataFromServer = result
  return {
    initialLocale: cookie.locale,
    terminvatedFundsDataFromServer,
  }
}

export default TerminatedFunds

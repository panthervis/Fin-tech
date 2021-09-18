import * as React from "react"

import LocaleContext from "../components/shared/context/localeContext"
import { fetchEntriesForTerminatedFunds } from "../utils/fund"

const useTerminatedFundData = () => {
  const [fundData, setFundData] = React.useState([])
  const localeContext: any = React.useContext(LocaleContext)

  const fetchTerminatedFundData = async () => {
    const data = await fetchEntriesForTerminatedFunds(
      localeContext.language ? localeContext.language : "en-CA"
    )
    setFundData(data)
  }

  const getTerminatedFundData = () => {
    React.useEffect(() => {
      fetchTerminatedFundData()
    }, [localeContext.language])
    return fundData
  }

  return { getTerminatedFundData, fetchTerminatedFundData }
}

export default useTerminatedFundData

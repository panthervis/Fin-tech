import React from "react"
import { fetchEntriesForPfic } from "../utils/fetchPfic"

const useTaxFormData = () => {
  const [taxFormData, setTaxFormData] = React.useState()
  const fetchTaxFormData = async () => {
    let data = await fetchEntriesForPfic()
    setTaxFormData(data)
  }

  const getTaxFormData = () => {
    React.useEffect(() => {
      fetchTaxFormData()
    }, [])
    return taxFormData
  }
  return { getTaxFormData }
}

export default useTaxFormData

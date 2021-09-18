import React from "react"

const FundDataContext = React.createContext({})

export const FundDataProvider = FundDataContext.Provider
export const FundDataConsumer = FundDataContext.Consumer
export default FundDataContext

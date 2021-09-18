import React from "react"

const FundFilterContext = React.createContext({})

export const FundFilterProvider = FundFilterContext.Provider
export const FundFilterConsumer = FundFilterContext.Consumer
export default FundFilterContext

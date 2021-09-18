import React from "react"

const InvestPageDataContext = React.createContext({})

export const InvestPageDataProvider = InvestPageDataContext.Provider
export const InvestPageDataConsumer = InvestPageDataContext.Consumer
export default InvestPageDataContext

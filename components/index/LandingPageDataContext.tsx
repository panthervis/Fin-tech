import React from "react"

const LandingPageDataContext = React.createContext({})

export const LandingPageDataProvider = LandingPageDataContext.Provider
export const LandingPageDataConsumer = LandingPageDataContext.Consumer
export default LandingPageDataContext

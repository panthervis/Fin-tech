import React from "react"

const TeamPageDataContext = React.createContext({})

export const TeamPageDataProvider = TeamPageDataContext.Provider
export const TeamPageDataConsumer = TeamPageDataContext.Consumer
export default TeamPageDataContext

import React from "react"

const AboutPageDataContext = React.createContext({})

export const AboutPageDataProvider = AboutPageDataContext.Provider
export const AboutPageDataConsumer = AboutPageDataContext.Consumer
export default AboutPageDataContext

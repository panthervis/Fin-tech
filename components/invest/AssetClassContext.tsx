import React from "react"

const AssetClassContext = React.createContext({})

export const AssetClassProvider = AssetClassContext.Provider
export const AssetClassConsumer = AssetClassContext.Consumer
export default AssetClassContext

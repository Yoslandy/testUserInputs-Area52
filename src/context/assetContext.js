import { createContext, useContext, useState } from 'react'

export const AssetContext = createContext()

export const AssetProvider = ({ children }) => {
  const [asset, setAsset] = useState(null)
  const [modelId, setModelId] = useState(null)

  return (
    <AssetContext.Provider value={{ asset, setAsset, modelId, setModelId }}>{children}</AssetContext.Provider>
  )
}

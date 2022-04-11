import { View, Text } from 'react-native'
import React from 'react'
import { AssetProvider } from './assetContext'
import { ChartProvider } from './chartContext'

const MainContextProvider = ({ children }) => {
  return (
    <AssetProvider>
      <ChartProvider>{children}</ChartProvider>
    </AssetProvider>
  )
}

export default MainContextProvider

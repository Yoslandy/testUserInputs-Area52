import axios from 'axios'
import { createContext, useContext, useState } from 'react'
import { URL_GET_PROPERTIES } from '../resources/urls/urls'

export const AssetContext = createContext()

export const AssetProvider = ({ children }) => {
  const [asset, setAsset] = useState(null)
  const [modelId, setModelId] = useState(null)
  const [measurements, set_Measurements] = useState(null)
  const [attributes, set_Attributes] = useState(null)
  const [metrics, set_Metrics] = useState(null)
  const [transforms, set_Transforms] = useState(null)
  const [loading, set_Loading] = useState(false)

  const getProperties = (body) => {
    set_Loading(true)
    try {
      axios
        .post(URL_GET_PROPERTIES, body)
        .then((res) => {
          const data = res.data.data
          let auxMeasurements = []
          let auxAttributes = []
          let auxMetrics = []
          let auxTransform = []
          for (let i = 0; i < data.length; i++) {
            const element = data[i]
            if (element.propertyType === 'measurement') auxMeasurements.push(element)
            if (element.propertyType === 'attribute') auxAttributes.push(element)
            if (element.propertyType === 'metric') auxMetrics.push(element)
            if (element.propertyType === 'transform') auxTransform.push(element)
          }
          set_Measurements(auxMeasurements)
          set_Attributes(auxAttributes)
          set_Metrics(auxMetrics)
          set_Transforms(auxTransform)
          set_Loading(false)
        })
        .catch((error) => {
          console.log(error.message)
          set_Loading(false)
        })
    } catch (error) {
      console.log(error)
      set_Loading(false)
    }
  }

  return (
    <AssetContext.Provider
      value={{
        asset,
        setAsset,
        modelId,
        setModelId,
        measurements,
        attributes,
        metrics,
        transforms,
        set_Measurements,
        set_Attributes,
        set_Metrics,
        set_Transforms,
        getProperties,
        loading,
      }}
    >
      {children}
    </AssetContext.Provider>
  )
}

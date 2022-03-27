import React, { useCallback, useContext, useEffect, useState } from 'react'
import { View, Text, ActivityIndicator, ScrollView, StyleSheet } from 'react-native'
import axios from 'axios'
import { useFocusEffect } from '@react-navigation/native'

import Metrics from './measurementsComp/metrics'
import { URL_GET_PROPERTIES } from '../../resources/urls/urls'
import Transform from './measurementsComp/transform'
import MyCollapsible from '../../resources/hook/myCollapsible'
import { AssetContext } from '../../context/assetContext'

const Unmodifiable = ({ navigation, route }) => {
  const { asset, modelId } = useContext(AssetContext)

  const [data, set_Data] = useState([])
  const [metrics, set_Metrics] = useState([])
  const [transforms, set_Transforms] = useState([])
  const [loadingForm, setLoadingForm] = useState(false)

  const body = { assetId: asset.id, modelId: modelId }

  /* useEffect(() => {
    getProperties(body)
  }, []) */

  useEffect(() => {
    updateProperties()
  }, [data])

  useFocusEffect(
    useCallback(() => {
      getProperties(body)
    }, [])
  )

  const updateProperties = () => {
    let auxMetrics = []
    let auxTransform = []
    for (let i = 0; i < data.length; i++) {
      const element = data[i]
      if (element.propertyType === 'metric') auxMetrics.push(element)
      if (element.propertyType === 'transform') auxTransform.push(element)
    }
    set_Metrics(auxMetrics)
    set_Transforms(auxTransform)
  }

  const getProperties = (body) => {
    setLoadingForm(true)
    try {
      axios
        .post(URL_GET_PROPERTIES, body)
        .then((res) => {
          set_Data(res.data.data)
          setLoadingForm(false)
        })
        .catch((error) => {
          console.log(error.message)
          setLoadingForm(false)
        })
    } catch (error) {
      console.log(error)
      setLoadingForm(false)
    }
  }

  return (
    <>
      {loadingForm ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size={'large'} color={'#517fa4'} />
        </View>
      ) : (
        <ScrollView>
          <View>
            <Text style={{ alignSelf: 'center', marginVertical: 10 }}>Asset Name: {asset.name}</Text>
            <MyCollapsible text="Transforms">
              <Transform data={transforms} asset={asset} />
            </MyCollapsible>
            <MyCollapsible text="Metrics">
              <Metrics data={metrics} asset={asset} />
            </MyCollapsible>
          </View>
        </ScrollView>
      )}
    </>
  )
}

export default Unmodifiable

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#ccc',
    padding: 10,
  },
  headerText: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '500',
  },
  /* content: {
    padding: 20,
    backgroundColor: '#fff',
  }, */
})

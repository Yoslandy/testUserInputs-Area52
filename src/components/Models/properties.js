import React, { useCallback, useContext, useEffect, useState } from 'react'
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  StyleSheet,
} from 'react-native'
import { Badge, /* Input, */ ListItem } from 'react-native-elements'
import axios from 'axios'
/* import { SimpleAccordion } from 'react-native-simple-accordion'; */
import Collapsible from 'react-native-collapsible'

import Measurement from './measurementsComp/measurement'
import Attribute from './measurementsComp/attributes'
import Metrics from './measurementsComp/metrics'

import { URL_GET_PROPERTIES } from '../../resources/urls/urls'
import Transform from './measurementsComp/transform'
import MyCollapsible from '../../resources/hook/myCollapsible'
import { AssetContext } from '../../context/assetContext'
import { useFocusEffect } from '@react-navigation/native'
import MyScollView from '../../resources/hook/myKeyboard'

const Modifiable = ({ navigation, route }) => {
  /* const { asset, modelId } = route.params */
  const { asset, modelId } = useContext(AssetContext)
  //console.log(asset, modelId)

  const [data, set_Data] = useState([])
  const [measurements, set_Measurements] = useState([])
  const [attributes, set_Attributes] = useState([])
  const [loadingForm, setLoadingForm] = useState(false)

  const body = { assetId: asset.id, modelId: modelId }

  /* useEffect(() => {
    getProperties(body)
  }, []) */

  useFocusEffect(
    useCallback(() => {
      getProperties(body)
    }, [])
  )

  useEffect(() => {
    updateProperties()
  }, [data])

  const updateProperties = () => {
    let auxMeasurements = []
    let auxAttributes = []
    for (let i = 0; i < data.length; i++) {
      const element = data[i]
      if (element.propertyType === 'measurement') auxMeasurements.push(element)
      if (element.propertyType === 'attribute') auxAttributes.push(element)
    }
    set_Measurements(auxMeasurements)
    set_Attributes(auxAttributes)
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
        <MyScollView>
          <View>
            <Text style={{ alignSelf: 'center', marginVertical: 10 }}>Asset Name: {asset.name}</Text>
            <MyCollapsible text="Attributes">
              <Attribute data={attributes} body={body} asset={asset} />
            </MyCollapsible>
            <View style={{ marginTop: 10 }}>
              <View style={styles.header}>
                <Text style={styles.headerText}>Measurements</Text>
              </View>
              <Measurement data={measurements} asset={asset} body={body} />
            </View>
          </View>
        </MyScollView>
      )}
    </>
  )
}

export default Modifiable

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

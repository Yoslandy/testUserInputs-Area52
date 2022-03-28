import React, { useCallback, useContext } from 'react'
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native'
import { useFocusEffect } from '@react-navigation/native'

import Measurement from './measurementsComp/measurement'
import Attribute from './measurementsComp/attributes'
import MyCollapsible from '../../resources/hook/myCollapsible'
import { AssetContext } from '../../context/assetContext'
import MyScollView from '../../resources/hook/myKeyboard'

const Modifiable = () => {
  const { asset, modelId, getProperties, measurements, attributes } = useContext(AssetContext)

  const body = { assetId: asset.id, modelId: modelId }

  useFocusEffect(
    useCallback(() => {
      getProperties(body)
    }, [])
  )

  return (
    <>
      {!measurements || !attributes ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size={'large'} color={'#517fa4'} />
        </View>
      ) : (
        <MyScollView>
          <View>
            <Text style={{ alignSelf: 'center', marginVertical: 10 }}>Asset Name: {asset.name}</Text>
            <MyCollapsible text="Attributes">
              <Attribute />
            </MyCollapsible>
            <View style={{ marginTop: 10 }}>
              <View style={styles.header}>
                <Text style={styles.headerText}>Measurements</Text>
              </View>
              <Measurement />
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
})

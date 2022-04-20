import React, { useCallback, useContext } from 'react'
import { View, Text, ActivityIndicator, ScrollView } from 'react-native'
import { useFocusEffect } from '@react-navigation/native'

import Metrics from './measurementsComp/metrics'
import Transform from './measurementsComp/transform'
import MyCollapsible from '../../resources/hook/myCollapsible'
import { AssetContext } from '../../context/assetContext'

const Unmodifiable = () => {
  const { asset, modelId, getProperties, metrics, transforms } = useContext(AssetContext)

  const body = { assetId: asset.id, modelId: modelId }

  useFocusEffect(
    useCallback(() => {
      getProperties(body)
    }, [])
  )

  return (
    <>
      {!metrics || !transforms ? (
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

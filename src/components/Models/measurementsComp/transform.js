import React, { useContext, useEffect, useState } from 'react'
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native'
import { ListItem } from 'react-native-elements'

import MyInputsInteger from '../../../resources/hook/inputsAndSave/myInputsInteger'
import MyInputsDoubles from '../../../resources/hook/inputsAndSave/myInputsDoubles'
import MyInputsBoolean from '../../../resources/hook/inputsAndSave/myInputsBoolean'
import { round } from '../../../resources/hook/methods/methods'
import { AssetContext } from '../../../context/assetContext'

const Transform = ({}) => {
  const { transforms, loading } = useContext(AssetContext)

  const renderItem = (item, index) => (
    <ListItem bottomDivider key={index}>
      <ListItem.Content>
        <ListItem.Title>{item.name}</ListItem.Title>
        {/* <ListItem.Subtitle>{textValue + ' ' + (item.unit ? item.unit : '')}</ListItem.Subtitle> */}
      </ListItem.Content>
      {loading ? (
        <ActivityIndicator size="small" color={'black'} />
      ) : (
        <Text>{round(Object.values(item.propertyValue.value)[0], 1)}</Text>
      )}
    </ListItem>
  )

  return <>{transforms.map((item, index) => renderItem(item, index))}</>
}

export default Transform

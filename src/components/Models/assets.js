import React, { useContext, useEffect, useState } from 'react'
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native'
import axios from 'axios'
import { Badge, /* Input, */ ListItem } from 'react-native-elements'
import { URL_GET_ASSET } from '../../resources/urls/urls'
import { AssetContext } from '../../context/assetContext'

const Assets = ({ navigation, route }) => {
  const { model } = route.params
  const [data, set_Data] = useState(null)
  const [loadingForm, setLoadingForm] = useState(false)
  const { setAsset, setModelId } = useContext(AssetContext)

  useEffect(() => {
    const body = {
      assetModelId: model.id,
    }
    getAssets(body)
  }, [])

  const getAssets = (body) => {
    setLoadingForm(true)
    try {
      axios
        .post(URL_GET_ASSET, body)
        .then((res) => {
          /* console.log(res.data.data); */
          set_Data(res.data.data)
          /* setAsset(res.data.data)
          setModelId(model.id) */
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

  const renderItem = ({ item, index }) => (
    <TouchableOpacity
      onPress={() => {
        setAsset(item)
        setModelId(model.id)
        navigation.navigate('measurementsStackScreen')
      }}
    >
      <ListItem bottomDivider>
        <Badge
          value={Object.keys(item.assetProperties).length}
          status="success"
          badgeStyle={{ height: 22, width: 22, borderRadius: 22 }}
        />
        <ListItem.Content>
          <ListItem.Title /* style={styles.textTitle} */>{item.name}</ListItem.Title>
        </ListItem.Content>

        <ListItem.Chevron></ListItem.Chevron>
      </ListItem>
    </TouchableOpacity>
  )

  return (
    <>
      {loadingForm ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size={'large'} color={'#517fa4'} />
        </View>
      ) : (
        <>
          <Text style={{ alignSelf: 'center', marginVertical: 10 }}>Model name: {model.name}</Text>
          <FlatList keyExtractor={(item, index) => index.toString()} data={data} renderItem={renderItem} />
        </>
      )}
    </>
  )
}

export default Assets

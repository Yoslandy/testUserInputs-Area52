import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { Badge, /* Input, */ ListItem } from 'react-native-elements';

const Assets = ({ navigation, route }) => {
  const { assets, modelName } = route.params;
  const [data, set_Data] = useState(assets);

  /* console.log(assets); */

  const renderItem = ({ item, index }) => (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('measurementsStackScreen', {
          assetProperties: item.assetProperties,
          assetName: item.name,
        });
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
          {/* <ListItem.Subtitle style={styles.textSubTitle}>
            {item.address.city}
          </ListItem.Subtitle> */}
        </ListItem.Content>
        {/* <Icon
                    name='pencil-outline'
                    size={height * 0.035}
                    color={myColors.BLUE_SECUNDARY}
                    onPress={() => { navigation.navigate('EditClientScreen', { clientId: item.uid }) }}
                /> */}
        {/* {deleting.flag && index === deleting.index ?
                    <ActivityIndicator color={myColors.DANGER} />
                    :
                    <Icon
                        name='trash-can-outline'
                        size={height * 0.035}
                        color={myColors.DANGER}
                        onPress={() => deleteCl(item.uid, item.name, index)}
                    />
                } */}
        <ListItem.Chevron></ListItem.Chevron>
      </ListItem>
    </TouchableOpacity>
  );

  return (
    <View>
      <Text style={{ alignSelf: 'center', marginVertical: 10 }}>Model name: {modelName}</Text>
      <FlatList
        keyExtractor={(item, index) => index.toString() /* item.uid */}
        data={data}
        renderItem={renderItem}
      />
    </View>
  );
};

export default Assets;

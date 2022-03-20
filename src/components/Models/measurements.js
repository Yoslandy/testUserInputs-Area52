import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Badge, /* Input, */ ListItem } from 'react-native-elements';

import MyInputsInteger from '../../resources/hook/inputs/myInputsInteger';
import MyInputsDoubles from '../../resources/hook/inputs/myInputsDoubles';
import MyInputsBoolean from '../../resources/hook/inputs/myInputsBoolean';

const Measurements = ({ navigation, route }) => {
  const { assetProperties, assetName } = route.params;
  const [data, set_Data] = useState(assetProperties);

  const renderItem = ({ item, index }) => (
    <ListItem bottomDivider>
      <ListItem.Content>
        <ListItem.Title /* style={styles.textTitle} */>{item.name}</ListItem.Title>
        <ListItem.Subtitle /* style={styles.textSubTitle} */>{item.unit}</ListItem.Subtitle>
      </ListItem.Content>

      {item.dataType === 'INTEGER' ? (
        <MyInputsInteger assetName={assetName} item={item} />
      ) : item.dataType === 'DOUBLE' ? (
        <MyInputsDoubles assetName={assetName} item={item} />
      ) : item.dataType === 'BOOLEAN' ? (
        <MyInputsBoolean assetName={assetName} item={item} />
      ) : (
        <Text>NON</Text>
      )}

      {/* <ListItem.Chevron></ListItem.Chevron> */}
    </ListItem>
    /* </TouchableOpacity> */
  );

  return (
    <View>
      <Text style={{ alignSelf: 'center', marginVertical: 10 }}>Asset Name: {assetName}</Text>
      <FlatList
        keyExtractor={(item, index) => index.toString() /* item.uid */}
        data={data}
        renderItem={renderItem}
      />
    </View>
  );
};

export default Measurements;

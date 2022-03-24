import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { ListItem } from 'react-native-elements';

import MyInputsInteger from '../../../resources/hook/inputsAndSave/myInputsInteger';
import MyInputsDoubles from '../../../resources/hook/inputsAndSave/myInputsDoubles';
import MyInputsBoolean from '../../../resources/hook/inputsAndSave/myInputsBoolean';
import { round } from '../../../resources/hook/methods/methods';

const Transform = ({ data, asset }) => {
  const [mydata, setData] = useState([]);

  useEffect(() => {
    setData(data);
  }, []);

  const renderItem = ({ item, index }) => (
    <ListItem bottomDivider>
      <ListItem.Content>
        <ListItem.Title>{item.name}</ListItem.Title>
        {/* <ListItem.Subtitle>{textValue + ' ' + (item.unit ? item.unit : '')}</ListItem.Subtitle> */}
      </ListItem.Content>
      <Text>{round(Object.values(item.propertyValue.value)[0], 1)}</Text>
    </ListItem>
  );

  return <FlatList keyExtractor={(item, index) => index.toString()} data={mydata} renderItem={renderItem} />;
};

export default Transform;

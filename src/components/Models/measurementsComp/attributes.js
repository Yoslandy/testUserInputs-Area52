import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { ListItem } from 'react-native-elements';

import MyInputsInteger from '../../../resources/hook/inputsAndSave/myInputsInteger';
import MyInputsDoubles from '../../../resources/hook/inputsAndSave/myInputsDoubles';
import MyInputsBoolean from '../../../resources/hook/inputsAndSave/myInputsBoolean';

const Attribute = ({ data, asset }) => {
  const [mydata, setData] = useState([]);

  useEffect(() => {
    setData(data);
  }, []);

  const renderItem = ({ item, index }) => (
    <ListItem bottomDivider>
      {item.dataType === 'INTEGER' ? (
        <MyInputsInteger item={item} asset={asset} />
      ) : item.dataType === 'DOUBLE' ? (
        <MyInputsDoubles item={item} asset={asset} />
      ) : item.dataType === 'BOOLEAN' ? (
        <MyInputsBoolean item={item} asset={asset} />
      ) : (
        <Text>NON</Text>
      )}
    </ListItem>
  );

  return <FlatList keyExtractor={(item, index) => index.toString()} data={mydata} renderItem={renderItem} />;
};

export default Attribute;

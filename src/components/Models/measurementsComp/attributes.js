import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { ListItem } from 'react-native-elements';

import MyInputsInteger from '../../../resources/hook/inputsAndSave/myInputsInteger';
import MyInputsDoubles from '../../../resources/hook/inputsAndSave/myInputsDoubles';
import MyInputsBoolean from '../../../resources/hook/inputsAndSave/myInputsBoolean';
import MyCollapsible from '../../../resources/hook/myCollapsible';

const Attribute = ({ data, asset }) => {
  const [mydata, setData] = useState([]);

  useEffect(() => {
    setData(data);
  }, []);

  const renderItem = (item, index) => (
    <ListItem bottomDivider key={index}>
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

  return <>{mydata.map((item, index) => renderItem(item, index))}</>;
};

export default Attribute;

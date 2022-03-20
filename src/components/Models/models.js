import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { Badge, /* Input, */ ListItem } from 'react-native-elements';

const Models = ({ navigation }) => {
  const [data, set_Data] = useState(null);
  const [loadingForm, setLoadingForm] = useState(false);

  useEffect(() => {
    getModels();
  }, []);

  const getModels = () => {
    setLoadingForm(true);
    console.log('models');
    try {
      axios
        .get('https://29wmfdhs0g.execute-api.us-east-1.amazonaws.com/v1/testpythonpostmanrest')
        .then((res) => {
          /* console.log(res.data.data); */
          set_Data(res.data.data);
          setLoadingForm(false);
        })
        .catch((error) => {
          console.log('error');
        });
    } catch (error) {
      console.log(error);
      setLoadingForm(false);
    }
  };

  const renderItem = ({ item, index }) => (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('assetsStackScreen', { assets: item.assets, modelName: item.name });
      }}
    >
      <ListItem bottomDivider>
        <Badge
          value={Object.keys(item.assets).length}
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
    <View style={{ marginTop: 10 }}>
      {/* <Text>Models</Text> */}
      <FlatList
        keyExtractor={(item, index) => index.toString() /* item.uid */}
        data={data}
        renderItem={renderItem}
      />
    </View>
  );
};

export default Models;

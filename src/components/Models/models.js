import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { Badge, /* Input, */ ListItem } from 'react-native-elements';
import { URL_GET_MODELS } from '../../resources/urls/urls';

const Models = ({ navigation }) => {
  const [data, set_Data] = useState(null);
  const [loadingForm, setLoadingForm] = useState(false);

  useEffect(() => {
    getModels();
  }, []);

  const getModels = () => {
    setLoadingForm(true);
    try {
      axios
        .post(URL_GET_MODELS)
        .then((res) => {
          set_Data(res.data.data);
          setLoadingForm(false);
        })
        .catch((error) => {
          console.log(error.message);
          setLoadingForm(false);
        });
    } catch (error) {
      console.log(error);
      setLoadingForm(false);
    }
  };

  const renderItem = ({ item, index }) => (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('assetsStackScreen', { model: item });
      }}
    >
      <ListItem bottomDivider>
        <Badge
          value={Object.keys(item.assets).length}
          status="success"
          badgeStyle={{ height: 22, width: 22, borderRadius: 22 }}
        />
        <ListItem.Content>
          <ListItem.Title>{item.name}</ListItem.Title>
        </ListItem.Content>
        <ListItem.Chevron></ListItem.Chevron>
      </ListItem>
    </TouchableOpacity>
  );

  return (
    <>
      {loadingForm ? (
        <ActivityIndicator size={'large'} />
      ) : (
        <View style={{ marginTop: 10 }}>
          <FlatList keyExtractor={(item, index) => index.toString()} data={data} renderItem={renderItem} />
        </View>
      )}
    </>
  );
};

export default Models;

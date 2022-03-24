import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Dimensions, TextInput, ActivityIndicator } from 'react-native';
import { TextInputMask } from 'react-native-masked-text';
import { useFormik } from 'formik';
import axios from 'axios';
import * as Yup from 'yup';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { ListItem, Switch } from 'react-native-elements';
import dayjs from 'dayjs';
import { createEvent, getValueType } from '../methods/methods';
import { URL_SAVE_MEASUREMENTS } from '../../urls/urls';

const { width, height } = Dimensions.get('window');

export default InputsBoolean = ({ asset, item, ...rest }) => {
  const [loading, setLoading] = useState(false);
  const [textValue, setTextValue] = useState(Object.values(item.propertyValue.value)[0]);

  const initialValues = {
    value: textValue,
  };

  /* useEffect(() => {
    formik.setValues({
      value: textValue,
    })
  }, [textValue]); */

  const getData = (assetId, propertyId) => {
    const params = {
      assetId: assetId,
      propertyId: [propertyId],
    };
    try {
      axios
        .post('https://29wmfdhs0g.execute-api.us-east-1.amazonaws.com/v1/usergetvalues', params)
        .then((res) => {
          setTextValue(Object.values(res.data.body[0].value)[0]);
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
        });
    } catch (error) {
      console.log(error.message);
      setLoading(false);
    }
  };

  const onSubmit = () => {
    try {
      setLoading(true);
      const type = getValueType(item.dataType);
      const value = formik.values.value;
      const event = createEvent(asset.id, item.id, value, type);
      axios
        .post(URL_SAVE_MEASUREMENTS, event)
        .then((res) => {
          //console.log(res.data);
          formik.handleReset();
          getData(asset.id, item.id);
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
        });
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const formik = useFormik({
    initialValues,
    onSubmit,
  });

  return (
    <View style={styles.wrapper}>
      <ListItem.Content>
        <ListItem.Title>{item.name}</ListItem.Title>
        <ListItem.Subtitle>{textValue + ' ' + (item.unit ? item.unit : '')}</ListItem.Subtitle>
      </ListItem.Content>
      <Switch
        value={formik.values.value}
        onValueChange={(value) => formik.setValues({ value: value })}
        style={{ marginRight: 10, width: 60 }}
      />

      {loading ? (
        <ActivityIndicator color={'green'} size={height * 0.045} />
      ) : (
        <Icon
          name="content-save-settings"
          size={height * 0.045}
          color={'green'}
          onPress={() => formik.handleSubmit()}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputContainerProfile: {
    paddingHorizontal: 8,
    width: 70,
    borderWidth: 1,
    borderRadius: 6,
    marginRight: 8,
  },
  inputProfile: {
    paddingHorizontal: 5,
    fontSize: 17,
    height: height * 0.055,
  },
});

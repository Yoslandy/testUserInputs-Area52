import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native';
import { Badge, Icon, Button, ListItem } from 'react-native-elements';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import dayjs from 'dayjs';
import axios from 'axios';

import NormalInputDouble from '../../../resources/hook/inputs/normalInputDouble';
import NormalInputInteger from '../../../resources/hook/inputs/normalInputInteger';
import NormalInputBoolean from '../../../resources/hook/inputs/normalInputBoolean';
import { URL_GET_PROPERTIES, URL_SAVE_MEASUREMENTS } from '../../../resources/urls/urls';

const Measurement = ({ data, asset, body }) => {
  const [mydata, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [initialValues, setInitialValues] = useState({});
  const [propertyIds, setPropertyIds] = useState([]);
  const [propertyTypes, setPropertyTypes] = useState([]);

  useEffect(() => {
    setData(data);
    defineinitialValues();
  }, []);

  const validationSchema = Yup.object({
    /* weight: Yup.string().required('The Field is Required!...'),
    crate_count: Yup.string().required('The Field is Required!...'),
    temperature: Yup.string().required('The Field is Required!...'), */
  });

  const updateLabels = () => {
    try {
      axios
        .post(URL_GET_PROPERTIES, body)
        .then((res) => {
          const data = res.data.data;
          let auxMeasurements = [];
          for (let i = 0; i < data.length; i++) {
            const element = data[i];
            if (element.propertyType === 'measurement') auxMeasurements.push(element);
          }
          setData(auxMeasurements);
        })
        .catch((error) => {
          console.log(error.message);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmit = () => {
    const event = defineEventOut();
    try {
      setLoading(true);
      axios
        .post(URL_SAVE_MEASUREMENTS, event)
        .then((res) => {
          console.log('Enviado');
          setLoading(false);
          updateLabels();
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
    validationSchema,
  });

  const defineinitialValues = () => {
    for (let i = 0; i < data.length; i++) {
      const element = data[i];
      let elemetType = Object.keys(element.propertyValue.value)[0];
      initialValues[element.id] =
        elemetType === 'doubleValue' || elemetType === 'integerValue'
          ? parseFloat(Object.values(element.propertyValue.value)[0])
          : Object.values(element.propertyValue.value)[0];
      propertyIds.push(element.id);
      propertyTypes.push(Object.keys(element.propertyValue.value)[0]);
    }
  };

  const defineEventOut = () => {
    const event = {
      assetId: asset.id,
      propertyId: propertyIds,
      Timestamp: dayjs().format('YYYY-MM-DDTHH:mm:ss[Z]'),
      Values: formik.values,
      ValueType: propertyTypes,
    };
    return event;
  };

  const handleChangeIntFloat = (value, id) => {
    const newVal = parseFloat(value);
    formik.setValues({
      ...formik.values,
      [id]: newVal,
    });
  };

  const renderItem = ({ item, index }) => (
    <ListItem bottomDivider>
      <ListItem.Content>
        <ListItem.Title>{item.name}</ListItem.Title>
        <ListItem.Subtitle>
          {Object.values(item.propertyValue.value)[0] + ' ' + (item.unit ? item.unit : '')}
        </ListItem.Subtitle>
      </ListItem.Content>

      {item.dataType === 'INTEGER' ? (
        <NormalInputInteger
          value={Object.values(formik.values)[index]}
          onChangeText={(value) => {
            handleChangeIntFloat(value, item.id);
          }}
        />
      ) : item.dataType === 'DOUBLE' ? (
        <NormalInputDouble
          value={Object.values(formik.values)[index]}
          onChangeText={(value) => {
            handleChangeIntFloat(value, item.id);
          }}
        />
      ) : item.dataType === 'BOOLEAN' ? (
        <NormalInputBoolean
          value={Object.values(formik.values)[index]}
          onValueChange={(value) => {
            formik.setValues({
              ...formik.values,
              [item.id]: value,
            });
          }}
        />
      ) : (
        <Text>NON</Text>
      )}
    </ListItem>
  );

  return (
    <>
      <FlatList keyExtractor={(item, index) => index.toString()} data={mydata} renderItem={renderItem} />
      <Button
        title={loading ? 'SENDING' : 'SEND'}
        icon={
          loading ? (
            <ActivityIndicator size="small" color={'white'} style={{ marginRight: 10 }} />
          ) : (
            {
              name: loading ? 'other' : 'home',
              type: 'material-community',
              size: 20,
              color: 'white',
            }
          )
        }
        iconContainerStyle={{ marginRight: 10 }}
        titleStyle={{ fontWeight: '700' }}
        buttonStyle={styles.buttonStyle}
        containerStyle={styles.containerStyle}
        onPress={loading ? () => {} : () => formik.handleSubmit()}
      />
    </>
  );
};

export default Measurement;

const styles = StyleSheet.create({
  buttonStyle: {
    backgroundColor: 'rgba(90, 154, 230, 1)',
    borderColor: 'transparent',
    borderWidth: 0,
    borderRadius: 30,
  },
  containerStyle: {
    alignSelf: 'center',
    width: '90%',
    marginVertical: 25,
  },
});

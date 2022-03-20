import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Dimensions, ActivityIndicator } from 'react-native';
import { TextInputMask } from 'react-native-masked-text';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import dayjs from 'dayjs';
import axios from 'axios';

const { width, height } = Dimensions.get('window');

export default InputsDoubles = ({ assetName, item, ...rest }) => {
  const [loading, setLoading] = useState(false);

  const initialValues = {
    value: 0,
  };

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    setLoading(true);
    try {
      axios
        .post('https://29wmfdhs0g.execute-api.us-east-1.amazonaws.com/v1/usergetvalues', {
          propertyAlias: [item.alias],
        })
        .then((res) => {
          formik.setValues({
            value: Object.values(res.data.body[0].value)[0],
          });
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error.message);
      setLoading(false);
    }
  };

  const onSubmit = () => {
    try {
      setLoading(true);
      const measurementName = item.alias.replace(assetName + '/', '');
      const event = {
        AssetName: assetName,
        Timestamp: dayjs().format('YYYY-MM-DDTHH:mm:ss[Z]'),
        Values: {
          [measurementName]: parseFloat(formik.values.value),
        },
        ValueType: ['doubleValue'],
      };
      /* console.log(event); */

      fetch('https://29wmfdhs0g.execute-api.us-east-1.amazonaws.com/v1/userinputsrestapi', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(event),
      })
        .then((response) => response.json())
        .then((json) => {
          /* console.log(json); */
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
      <TextInputMask
        type={'money'}
        placeholder={'00.0'}
        options={{
          precision: 1,
          separator: '.',
          unit: '',
          suffixUnit: '',
        }}
        value={formik.values.value}
        onChangeText={formik.handleChange('value')}
        maxLength={5}
        textAlign="right"
        style={[styles.inputContainerProfile, styles.inputProfile]}
        {...rest}
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

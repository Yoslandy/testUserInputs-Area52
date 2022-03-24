import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Dimensions, ActivityIndicator } from 'react-native';
import { TextInputMask } from 'react-native-masked-text';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import dayjs from 'dayjs';
import axios from 'axios';
import { createEvent, getValueType } from '../methods/methods';
import { ListItem } from 'react-native-elements';

const { width, height } = Dimensions.get('window');

export default NormalInputDouble = ({ /* asset, item, */ value, ...rest }) => {
  const [loading, setLoading] = useState(false);

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
        value={value}
        //onChangeText={formik.handleChange('value')}
        maxLength={5}
        textAlign="right"
        style={[styles.inputContainerProfile, styles.inputProfile]}
        {...rest}
      />
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

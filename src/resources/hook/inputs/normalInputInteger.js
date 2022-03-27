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

export default NormalInputInteger = ({ value, ...rest }) => {
  const [loading, setLoading] = useState(false);

  return (
    <View style={styles.wrapper}>
      <TextInputMask
        type={'only-numbers'}
        placeholder={'0'}
        value={value}
        maxLength={3}
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
    //backgroundColor: 'blue',
  },
  inputProfile: {
    paddingHorizontal: 5,
    fontSize: 17,
    height: height * 0.055,
  },
});

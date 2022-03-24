import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Dimensions, ActivityIndicator } from 'react-native';
import { TextInputMask } from 'react-native-masked-text';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import dayjs from 'dayjs';
import axios from 'axios';
import { createEvent, getValueType } from '../methods/methods';
import { ListItem, Switch } from 'react-native-elements';

const { width, height } = Dimensions.get('window');

export default NormalInputBoolean = ({ value, ...rest }) => {
  const [loading, setLoading] = useState(false);

  return (
    <View style={styles.wrapper}>
      <Switch
        value={value}
        //onValueChange={(value) => formik.setValues({ value: value })}
        style={{ marginRight: 10, width: 60 }}
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

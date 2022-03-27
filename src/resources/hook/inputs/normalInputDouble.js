import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Dimensions, ActivityIndicator } from 'react-native';
import { TextInputMask } from 'react-native-masked-text';

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
    //backgroundColor: 'yellow',
  },
  inputProfile: {
    paddingHorizontal: 5,
    fontSize: 17,
    height: height * 0.055,
  },
});

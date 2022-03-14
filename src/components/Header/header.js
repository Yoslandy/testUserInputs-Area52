import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Header } from 'react-native-elements';
import { Auth } from 'aws-amplify';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const HeaderComponent = () => {
  const signOut = async () => {
    try {
      await Auth.signOut({ global: true });
    } catch (error) {
      console.log('error signing out: ', error);
    }
  };

  return (
    <Header
      /* centerComponent={
        <View style={styles.viewStyle}>
          <Text style={styles.textStyle}>Add Values</Text>
        </View>
      } */
      rightComponent={
        <View style={styles.viewStyle}>
          <Icon name={'logout'} color="white" size={30} onPress={signOut} />
        </View>
      }
      /* containerStyle={{
        justifyContent: 'center',
        alignItems: 'center',
      }} */
    />
  );
};

export default HeaderComponent;

const styles = StyleSheet.create({
  viewStyle: {
    marginTop: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textStyle: {
    color: 'white',
    fontSize: 22,
    textTransform: 'uppercase',
  },
});

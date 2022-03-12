import { View, Text, Button } from 'react-native';
import React from 'react';
import { Auth } from 'aws-amplify';

const Home = () => {
  const signOut = async () => {
    try {
      await Auth.signOut({ global: true });
    } catch (error) {
      console.log('error signing out: ', error);
    }
  };

  return (
    <View>
      <Text>Home</Text>
      <Button onPress={signOut} title="Sign Out" />
    </View>
  );
};

export default Home;

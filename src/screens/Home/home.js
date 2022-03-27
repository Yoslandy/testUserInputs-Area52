import { View, Text, Button, StyleSheet, ScrollView } from 'react-native';
import React from 'react';
import CardAddValues from '../../components/Home/cardAddValues';
import HeaderComponent from '../../components/Header/header';

const Home = () => {
  return (
    <>
      {/* <HeaderComponent /> */}
      <ScrollView>
        <View style={styles.container}>
          <Text>Other Components</Text>
        </View>
        {/* {<CardAddValues />} */}
      </ScrollView>
    </>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    /* backgroundColor: '#fff', */
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
  },
});

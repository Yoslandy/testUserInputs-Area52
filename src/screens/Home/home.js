import { View, Text, Button, StyleSheet, ScrollView } from 'react-native';
import React from 'react';
import CardAddValues from '../../components/Home/cardAddValues';

const Home = () => {
  return (
    <ScrollView>
      <View style={styles.container}>
        <CardAddValues />
      </View>
    </ScrollView>
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
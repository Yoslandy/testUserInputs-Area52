import { View, Text, Button, StyleSheet, ScrollView } from 'react-native'
import React from 'react'
import CardAddValues from '../../components/Home/cardAddValues'
import HeaderComponent from '../../components/Header/header'
import ChartLine from '../../components/Home/chartLine'
import ChartBar from '../../components/Home/chartBar'
import ChartContribution from '../../components/Home/chartContribution'

const Home = () => {
  return (
    <>
      {/* <HeaderComponent /> */}
      <ScrollView>
        <View style={styles.container}>
          {/* <Text>Other Components</Text> */}
          <ChartLine />
          {/* <ChartBar /> */}
          {/* <ChartContribution /> */}
        </View>
        {/* {<CardAddValues />} */}
      </ScrollView>
    </>
  )
}

export default Home

const styles = StyleSheet.create({
  container: {
    flex: 1,
    /* backgroundColor: '#fff', */
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
  },
})

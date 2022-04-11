import { View, StyleSheet, ScrollView, ActivityIndicator, Text } from 'react-native'
import React, { useContext } from 'react'
import { ChartContext } from '../../context/chartContext'
import ChartVictoryScatter from '../../components/Home3/chartVictoryScatter'
import ChartVictoryArea from '../../components/Home3/chartVictoryArea'
import ChartVictoryHistograma from '../../components/Home3/chartVictoryHistograma'
import ChartVictoryState from '../../components/Home3/chartVictoryState'

const Home3 = () => {
  const { loading, getValues } = useContext(ChartContext)
  return (
    <ScrollView>
      <View style={styles.container}>
        <Text>Using 10 Random Records every 2 seconds</Text>
        <View style={{ marginBottom: 5 }}>
          <ChartVictoryState />
        </View>
        <View style={{ marginBottom: 5 }}>
          <ChartVictoryArea />
        </View>
        <View style={{ marginBottom: 5 }}>
          <ChartVictoryHistograma />
        </View>
        <View style={{ marginBottom: 5 }}>
          <ChartVictoryScatter />
        </View>
      </View>
    </ScrollView>
  )
}

export default Home3

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
  },
  buttonStyle: {
    backgroundColor: 'rgba(90, 154, 230, 1)',
    borderColor: 'transparent',
    borderWidth: 0,
    borderRadius: 30,
  },
  containerStyle: {
    alignSelf: 'center',
    width: '90%',
    marginVertical: 25,
  },
})

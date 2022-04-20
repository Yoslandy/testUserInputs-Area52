import { View, Text, Dimensions, ActivityIndicator, StyleSheet } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { LineChart } from 'react-native-chart-kit'
import { ChartContext } from '../../context/chartContext'

const ChartLine = () => {
  const { labelsData, chartData, getValues } = useContext(ChartContext)

  useEffect(() => {
    getValues()
  }, [])

  //console.log(labelsData)

  return (
    <View>
      {Object.keys(chartData).length === 0 ? (
        <ActivityIndicator size="small" color={'#e26a00'} style={{ marginRight: 10 }} />
      ) : (
        <LineChart
          data={{
            labels: labelsData,
            datasets: [
              {
                data: chartData,
              },
            ],
          }}
          width={Dimensions.get('window').width} // from react-native
          height={250}
          /* yAxisLabel="$"
        yAxisSuffix="k" */
          yAxisInterval={1} // optional, defaults to 1
          verticalLabelRotation={30}
          xLabelsOffset={-10}
          chartConfig={{
            backgroundColor: '#e26a00',
            backgroundGradientFrom: '#fb8c00',
            backgroundGradientTo: '#ffa726',
            decimalPlaces: 2, // optional, defaults to 2dp
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 16,
            },
            propsForDots: {
              r: '4',
              strokeWidth: '2',
              stroke: '#ffa726',
            },
          }}
          bezier
          style={{
            marginVertical: 8,
            borderRadius: 16,
          }}
        />
      )}
    </View>
  )
}

export default ChartLine

/* const styles = StyleSheet.create({
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
}) */

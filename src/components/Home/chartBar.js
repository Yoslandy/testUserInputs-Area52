import { View, Text, Dimensions } from 'react-native'
import React from 'react'
import { BarChart } from 'react-native-chart-kit'

const screenWidth = Dimensions.get('window').width

const ChartBar = () => {
  const chartConfig = {
    backgroundColor: '#e26a00',
    backgroundGradientFrom: '#fb8c00',
    /* backgroundGradientFromOpacity: 0, */
    backgroundGradientTo: '#ffa726',
    /* backgroundGradientToOpacity: 0.5, */
    withVerticalLabels: false,
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    /* strokeWidth: 2, */ // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false, // optional
  }

  const data = {
    labels: ['January', '', '', '', '', 'June'],
    datasets: [
      {
        data: [20, 45, 28, 80, 99, 43, 80, 99, 43, 99, 43, 80, 99, 43],
      },
    ],
  }

  return (
    <View>
      <BarChart
        paddingRight={15}
        style={{
          marginVertical: 8,
          borderRadius: 16,
          /* paddingRight: 5, */
        }}
        data={data}
        width={screenWidth}
        height={220}
        /* yAxisLabel="$" */
        chartConfig={chartConfig}
        showValuesOnTopOfBars={true}
        /* verticalLabelRotation={30} */
      />
    </View>
  )
}

export default ChartBar

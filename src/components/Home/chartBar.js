import { View, Text, Dimensions, ActivityIndicator } from 'react-native'
import React, { useContext, useEffect } from 'react'
import { BarChart } from 'react-native-chart-kit'
import { ChartContext } from '../../context/chartContext'

const screenWidth = Dimensions.get('window').width

const ChartBar = () => {
  const { labelsData, chartData, getValues } = useContext(ChartContext)

  useEffect(() => {
    getValues()
  }, [])

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
    labels: labelsData,
    datasets: [
      {
        data: chartData,
      },
    ],
  }

  return (
    <View>
      {Object.keys(chartData).length === 0 ? (
        <ActivityIndicator size="small" color={'#e26a00'} style={{ marginRight: 10 }} />
      ) : (
        <BarChart
          paddingRight={15}
          style={{
            marginVertical: 8,
            borderRadius: 16,
            /* paddingRight: 5, */
          }}
          verticalLabelRotation={90}
          data={data}
          width={screenWidth}
          height={280}
          xLabelsOffset={-15}
          /* yAxisLabel="$" */
          chartConfig={chartConfig}
          showValuesOnTopOfBars={true}
          /* verticalLabelRotation={30} */
        />
      )}
    </View>
  )
}

export default ChartBar

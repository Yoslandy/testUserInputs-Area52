import { View, Text, Dimensions } from 'react-native'
import React from 'react'
import { ContributionGraph } from 'react-native-chart-kit'

const ChartContribution = () => {
  return (
    <View>
      <ContributionGraph
        values={[
          { date: '2019-01-02', count: 1 },
          { date: '2019-01-02', count: 2 },
          { date: '2019-01-02', count: 3 },
          { date: '2019-01-02', count: 4 },
          { date: '2019-01-02', count: 5 },
          { date: '2019-01-02', count: 2 },
          { date: '2019-01-02', count: 3 },
          { date: '2019-03-01', count: 2 },
          { date: '2019-04-02', count: 4 },
          { date: '2019-03-05', count: 10 },
          { date: '2019-02-30', count: 4 },
        ]}
        endDate={new Date('2019-04-01')}
        numDays={105}
        width={Dimensions.get('window').width - 16}
        height={220}
        /* horizontal={false} */
        onDayPress={(value) => {
          console.log(value)
        }}
        showOutOfRangeDays={true}
        chartConfig={{
          backgroundColor: '#1cc910',
          backgroundGradientFrom: '#eff3ff',
          backgroundGradientTo: '#efefef',
          decimalPlaces: 2,
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          style: {
            borderRadius: 16,
          },
        }}
      />
    </View>
  )
}

export default ChartContribution

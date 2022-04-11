import { View, Text, Dimensions, ActivityIndicator, StyleSheet } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { ChartContext } from '../../context/chartContext'
import { VictoryChart, VictoryScatter, VictoryAxis, VictoryVoronoiContainer } from 'victory-native'

const ChartVictoryScatter = () => {
  const { valuesByHourData, getValues } = useContext(ChartContext)

  useEffect(() => {
    getValues()
  }, [])

  return (
    <View>
      {valuesByHourData.length === 0 ? (
        <ActivityIndicator size="small" color={'#e26a00'} style={{ marginRight: 10 }} />
      ) : (
        <View style={{ backgroundColor: '#181B1F' }}>
          <Text style={{ color: '#aaa', alignSelf: 'center', top: 10 }}>
            Received Signal Strength Indicator
          </Text>
          <View style={{ top: 20, left: 30, flexDirection: 'row', alignItems: 'center' }}>
            <View style={{ height: 6, width: 15, backgroundColor: '#55a54d', marginRight: 5 }}></View>
            <Text style={{ color: '#aaa' }}>RSSI</Text>
          </View>
          <VictoryChart
            domainPadding={{ x: [5, 0], y: [10, 10] }}
            height={200}
            containerComponent={
              <VictoryVoronoiContainer
                labels={({ datum }) => `${datum.value}`}
                style={{ top: 0, left: 10 }}
              />
            }
          >
            <VictoryScatter
              animate
              data={valuesByHourData}
              x="timestamp"
              y="value"
              style={{ data: { fill: '#55a54d' } }}
            />
            <VictoryAxis
              crossAxis
              /* tickCount={5} */
              fixLabelOverlap={true}
              style={{
                axis: { stroke: '#aaa' },
                axisLabel: { fontSize: 15, padding: 30 },
                grid: { stroke: '#aaa', strokeOpacity: 0.2 },
                ticks: { stroke: '#aaa', size: 5 },
                tickLabels: { fill: '#aaa' },
              }}
            />
            <VictoryAxis
              dependentAxis
              /* tickCount={7} */
              style={{
                axis: { stroke: '#aaa' },
                axisLabel: { fontSize: 20, padding: 30 },
                grid: { stroke: '#aaa', strokeOpacity: 0.2 },
                ticks: { stroke: '#aaa', size: 5 },
                tickLabels: { fill: '#aaa' },
              }}
            />
          </VictoryChart>
        </View>
      )}
    </View>
  )
}

export default ChartVictoryScatter

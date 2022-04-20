import { View, Text, Dimensions, ActivityIndicator, StyleSheet } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { ChartContext } from '../../context/chartContext'
import {
  VictoryChart,
  VictoryLabel,
  VictoryAxis,
  VictoryArea,
  VictoryCursorContainer,
  LineSegment,
  VictoryHistogram,
  VictoryBar,
  VictoryStack,
  VictoryLine,
} from 'victory-native'

const ChartVictoryState = () => {
  const { valuesByHourData, randomArrayData, chartData } = useContext(ChartContext)
  /* const [histogramData, set_HistogramData] = useState([])
  useEffect(() => {
    let data = []
    for (let i = 0; i < chartData.length; i++) {
      const value = chartData[i].value
      data.push({ x: value })
    }
    set_HistogramData(data)
  }, [chartData]) */

  return (
    <View>
      {valuesByHourData.length === 0 ? (
        <ActivityIndicator size="small" color={'#e26a00'} style={{ marginRight: 10 }} />
      ) : (
        <View style={{ backgroundColor: '#181B1F' }}>
          <Text style={{ color: '#aaa', alignSelf: 'center', top: 10, fontSize: 18 }}>State</Text>
          <View style={{ top: 20, left: 30, flexDirection: 'row', alignItems: 'center' }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 10 }}>
              <View style={{ height: 6, width: 15, backgroundColor: '#55a54d', marginRight: 5 }}></View>
              <Text style={{ color: '#aaa' }}>Running</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 10 }}>
              <View style={{ height: 6, width: 15, backgroundColor: '#B13B4A', marginRight: 5 }}></View>
              <Text style={{ color: '#aaa' }}>Shutdown</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View style={{ height: 6, width: 15, backgroundColor: '#1F60C4', marginRight: 5 }}></View>
              <Text style={{ color: '#aaa' }}>Washmode</Text>
            </View>
          </View>

          <VictoryChart domainPadding={{ x: [13, 12], y: 10 }} height={140}>
            <VictoryBar
              /* animate */

              barRatio={1.3}
              data={valuesByHourData}
              x="timestamp"
              y="valueState"
              y0={2}
              style={{
                data: {
                  fill: ({ datum }) =>
                    datum.value >= 50
                      ? '#55a54d'
                      : datum.value < 50 && datum.value > 10
                      ? '#B13B4A'
                      : '#1F60C4',
                },
              }}
            />
            <VictoryAxis
              crossAxis
              fixLabelOverlap={true}
              style={{
                axis: { stroke: '#aaa' },
                /* grid: { stroke: '#aaa', strokeOpacity: 0.1 }, */
                ticks: { stroke: '#aaa', size: 5 },
                tickLabels: { fill: '#aaa' },
              }}
            />
            {/* <VictoryAxis
              dependentAxis
              style={{
                axis: { stroke: '#aaa' },
                axisLabel: { fontSize: 20, padding: 40, fill: '#aaa' },
                grid: { stroke: '#aaa', strokeOpacity: 0.2 },
                ticks: { stroke: '#aaa', size: 5 },
                tickLabels: { fill: '#aaa' },
              }}
            /> */}
          </VictoryChart>
        </View>
      )}
    </View>
  )
}

export default ChartVictoryState

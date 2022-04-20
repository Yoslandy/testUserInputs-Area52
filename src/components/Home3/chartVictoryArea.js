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
} from 'victory-native'

const ChartVictoryArea = () => {
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
          <Text style={{ color: '#aaa', alignSelf: 'center', top: 10, fontSize: 18 }}>Productivity</Text>
          <View style={{ top: 20, left: 30, flexDirection: 'row', alignItems: 'center' }}>
            <View style={{ height: 6, width: 15, backgroundColor: '#1F60C4', marginRight: 5 }}></View>
            <Text style={{ color: '#aaa' }}>Total</Text>
          </View>
          <VictoryChart
            domainPadding={{ x: [5, 0], y: 10 }}
            height={200}
            containerComponent={
              <VictoryCursorContainer
                cursorLabelOffset={{ x: 25, y: -25 }}
                cursorLabel={({ datum }) => `${Math.round(datum.y)}`}
                cursorLabelComponent={<VictoryLabel style={{ fill: '#aaa' }} />}
                cursorComponent={<LineSegment style={{ stroke: '#aaa' }} />}
                style={{ top: 0, left: 10 }}
              />
            }
          >
            <VictoryArea
              /* animate */
              interpolation="natural"
              data={valuesByHourData}
              x="timestamp"
              y="value"
              style={{
                data: { fill: '#1F60C4' },
              }}
            />
            <VictoryAxis
              crossAxis
              fixLabelOverlap={true}
              style={{
                axis: { stroke: '#aaa' },
                grid: { stroke: '#aaa', strokeOpacity: 0.2 },
                ticks: { stroke: '#aaa', size: 5 },
                tickLabels: { fill: '#aaa' },
              }}
            />
            <VictoryAxis
              dependentAxis
              label={'Lobsters'}
              offsetX={55}
              style={{
                axis: { stroke: '#aaa' },
                axisLabel: { fontSize: 20, padding: 40, fill: '#aaa' },
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

export default ChartVictoryArea

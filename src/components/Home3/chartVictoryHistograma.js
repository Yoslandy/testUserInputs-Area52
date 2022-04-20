import { View, Text, Dimensions, ActivityIndicator, StyleSheet } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { ChartContext } from '../../context/chartContext'
import { VictoryChart, VictoryAxis, VictoryBar, VictoryStack, VictoryLine } from 'victory-native'

const ChartVictoryHistograma = () => {
  const { valuesByHourData } = useContext(ChartContext)

  return (
    <View>
      {valuesByHourData.length === 0 ? (
        <ActivityIndicator size="small" color={'#e26a00'} style={{ marginRight: 10 }} />
      ) : (
        <View style={{ backgroundColor: '#181B1F' }}>
          <Text style={{ color: '#aaa', alignSelf: 'center', top: 10, fontSize: 18 }}>Productivity</Text>
          <View style={{ top: 20, left: 30, flexDirection: 'row', alignItems: 'center' }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 10 }}>
              <View style={{ height: 6, width: 15, backgroundColor: '#5794F2', marginRight: 5 }}></View>
              <Text style={{ color: '#aaa' }}>Right</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 10 }}>
              <View style={{ height: 6, width: 15, backgroundColor: '#023E8A', marginRight: 5 }}></View>
              <Text style={{ color: '#aaa' }}>Left</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View style={{ height: 6, width: 15, backgroundColor: '#C0D8FF', marginRight: 5 }}></View>
              <Text style={{ color: '#aaa' }}>Total</Text>
            </View>
          </View>

          <VictoryChart domainPadding={{ x: [13, 12], y: 10 }} height={200}>
            <VictoryStack colorScale={['#5794F2', '#023E8A']}>
              <VictoryBar
                /* animate */

                barRatio={1.2}
                data={valuesByHourData}
                x="timestamp"
                y="value"
                /* style={{ data: { fill: '#c43a31' } }} */
              />
              <VictoryBar
                /* animate */
                barRatio={1.2}
                data={valuesByHourData}
                x="timestamp"
                y="value"
                /* style={{ data: {  fill: '#c43a31' } }} */
              />
            </VictoryStack>
            <VictoryLine
              interpolation="natural"
              style={{ data: { stroke: '#C0D8FF', /* , strokeWidth: 15, */ strokeLinecap: 'round' } }}
              data={valuesByHourData}
              x="timestamp"
              y="valueTotal"
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
              /* label={'Lobsters'} */
              /* offsetX={55} */
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

export default ChartVictoryHistograma

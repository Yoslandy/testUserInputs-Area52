import { View, Text, Dimensions, ActivityIndicator, StyleSheet } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { ChartContext } from '../../context/chartContext'
import {
  VictoryChart,
  VictoryLine,
  VictoryTheme,
  VictoryTooltip,
  Bar,
  VictoryLabel,
  VictoryAxis,
} from 'victory-native'

const ChartVictoryLine = () => {
  const { valuesByHourData, getValues } = useContext(ChartContext)

  useEffect(() => {
    getValues()
  }, [])

  //console.log(valuesByHourData)

  return (
    <View>
      {valuesByHourData.length === 0 ? (
        <ActivityIndicator size="small" color={'#e26a00'} style={{ marginRight: 10 }} />
      ) : (
        <View>
          <VictoryChart theme={VictoryTheme.material} domainPadding={{ x: 10, y: 10 }}>
            <VictoryLine
              /* animate */
              data={valuesByHourData}
              x="timestamp"
              y="value"
              /* style={{ data: { fill: '#e26a00' } }} */
              /* labelComponent={
                <VictoryLabel
                  dy={-20}
                  angle={90}
                  backgroundStyle={{ opacity: 0.6 }}
                  backgroundPadding={{ bottom: 5, top: 20 }}
                />
              } */
            />
            <VictoryAxis
              crossAxis
              fixLabelOverlap={true}
              style={{
                grid: { stroke: 'transparent' },
              }}
            />
            <VictoryAxis
              dependentAxis
              fixLabelOverlap={true}
              style={{
                grid: { stroke: 'transparent' },
              }}
            />
          </VictoryChart>
        </View>
      )}
    </View>
  )
}

export default ChartVictoryLine

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

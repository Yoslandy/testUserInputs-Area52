import { View, Text, Dimensions, ActivityIndicator, StyleSheet } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { ChartContext } from '../../context/chartContext'
import { VictoryChart, VictoryBar, VictoryTheme, VictoryLabel, VictoryAxis } from 'victory-native'

const ChartVictoryBar = () => {
  const { valuesByHourData, getValues } = useContext(ChartContext)

  useEffect(() => {
    getValues()
  }, [])

  return (
    <View>
      {valuesByHourData.length === 0 ? (
        <ActivityIndicator size="small" color={'#e26a00'} style={{ marginRight: 10 }} />
      ) : (
        <View>
          <VictoryChart theme={VictoryTheme.material} domainPadding={{ x: 10, y: 10 }}>
            <VictoryBar
              /* animate */
              data={valuesByHourData}
              x="timestamp"
              y="value"
              style={{ data: { fill: '#e26a00' } }}
              labelComponent={
                <VictoryLabel
                  dy={-20}
                  angle={-90}
                  verticalAnchor="middle"
                  textAnchor="start"
                  backgroundStyle={{ opacity: 0.6 }}
                  backgroundPadding={{ bottom: 5, top: 20 }}
                />
              }
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

export default ChartVictoryBar

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

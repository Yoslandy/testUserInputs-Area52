import { View, Text, Dimensions, ActivityIndicator, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { LineChart } from 'react-native-chart-kit'
import axios from 'axios'
import { URL_GET_CHART_VALUES } from '../../resources/urls/urls'
import dayjs from 'dayjs'
import { Button } from 'react-native-elements'

const ChartLine = () => {
  const [valuesData, setValuesData] = useState([])
  const [chartData, setChartData] = useState([])
  const [labelsData, setLabelsData] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    getValues()
  }, [])

  useEffect(() => {
    fullValueslabels()
  }, [valuesData])

  const fullValueslabels = () => {
    const chartData_help = []
    const labelsData_help = []
    for (let i = 0; i < valuesData.length; i++) {
      const element = valuesData[i]
      chartData_help.push(element.value)
      let newDate = dayjs(element.timestamp * 1000).toDate()
      let newDate2 = dayjs(newDate).add(4, 'hour')
      labelsData_help.push(newDate2.format('YYYY-MM-DDTHH:mm:ss[Z]')) //newDate2.format('h:mm')
    }
    setChartData(chartData_help)
    setLabelsData(labelsData_help)
    //console.log(chartData_help, labelsData_help)
  }

  const getValues = () => {
    setLoading(true)
    try {
      const event = {
        assetId: '6a0d12d9-1952-40a0-a5d6-4a0e295c5945',
        propertyId: '61bedd59-9365-4ccd-a7f4-8e8801a08675',
        startDate: '2022-03-28T04:10:00Z',
        endDate: dayjs(new Date()).format('YYYY-MM-DDTHH:mm:ss[Z]'), //'2022-04-07T10:10:00Z',
      }
      axios
        .post(URL_GET_CHART_VALUES, event)
        .then((res) => {
          setValuesData(res.data.body)
          setLoading(false)
          //console.log(res.data.body)
        })
        .catch((error) => {
          console.log(error.message)
          setLoading(false)
        })
    } catch (err) {
      console.log(err.message)
      setLoading(false)
    }
  }

  return (
    <View>
      <Text>Bringing the last 30 records of net_lobster_weight</Text>

      {Object.keys(chartData).length === 0 ? (
        <ActivityIndicator size="small" color={'#e26a00'} style={{ marginRight: 10 }} />
      ) : (
        <LineChart
          data={{
            labels: labelsData /* ['January', '', '', '', '', 'June'], */,
            datasets: [
              {
                data: chartData,
              },
            ],
          }}
          width={Dimensions.get('window').width} // from react-native
          height={400}
          /* yAxisLabel="$"
        yAxisSuffix="k" */
          yAxisInterval={1} // optional, defaults to 1
          verticalLabelRotation={-90}
          xLabelsOffset={90}
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

      <View>
        <Button
          title={loading ? 'REFRESHING' : 'REFRESH'}
          icon={
            loading ? (
              <ActivityIndicator size="small" color={'white'} style={{ marginRight: 10 }} />
            ) : (
              {
                name: loading ? 'other' : 'home',
                type: 'material-community',
                size: 20,
                color: 'white',
              }
            )
          }
          iconContainerStyle={{ marginRight: 10 }}
          titleStyle={{ fontWeight: '700' }}
          buttonStyle={styles.buttonStyle}
          containerStyle={styles.containerStyle}
          onPress={loading ? () => {} : () => getValues()}
        />
      </View>
    </View>
  )
}

export default ChartLine

const styles = StyleSheet.create({
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
})

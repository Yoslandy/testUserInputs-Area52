import { createContext, useContext, useEffect, useState } from 'react'
import axios from 'axios'
import dayjs from 'dayjs'
import { URL_GET_CHART_VALUES } from '../resources/urls/urls'

export const ChartContext = createContext()

export const ChartProvider = ({ children }) => {
  const [valuesData, setValuesData] = useState([])
  const [valuesByHourData, setValuesByHourData] = useState([])
  const [chartData, setChartData] = useState([])
  const [labelsData, setLabelsData] = useState([])
  const [loading, setLoading] = useState(false)
  //Simulating values pushing every second
  const [randomArrayData, setRandomArrayData] = useState([
    { timestamp: dayjs(new Date()).add(1, 'minute'), value: Math.floor(Math.random() * 100) + 1 },
    { timestamp: dayjs(new Date()).add(2, 'minute'), value: Math.floor(Math.random() * 100) + 1 },
    { timestamp: dayjs(new Date()).add(3, 'minute'), value: Math.floor(Math.random() * 100) + 1 },
    { timestamp: dayjs(new Date()).add(4, 'minute'), value: Math.floor(Math.random() * 100) + 1 },
    { timestamp: dayjs(new Date()).add(5, 'minute'), value: Math.floor(Math.random() * 100) + 1 },
    { timestamp: dayjs(new Date()).add(6, 'minute'), value: Math.floor(Math.random() * 100) + 1 },
    { timestamp: dayjs(new Date()).add(7, 'minute'), value: Math.floor(Math.random() * 100) + 1 },
    { timestamp: dayjs(new Date()).add(8, 'minute'), value: Math.floor(Math.random() * 100) + 1 },
    { timestamp: dayjs(new Date()).add(9, 'minute'), value: Math.floor(Math.random() * 100) + 1 },
    { timestamp: dayjs(new Date()).add(10, 'minute'), value: Math.floor(Math.random() * 100) + 1 },
  ])
  //Simulating values pushing every second
  const RandomArrayData = () => {
    const sampleArray = randomArrayData
    const newRow = {
      timestamp: new Date(),
      value: Math.floor(Math.random() * 100) + 1,
    }
    sampleArray.splice(0, 1)
    sampleArray.splice(9, 1, newRow)
    setRandomArrayData(sampleArray)
    fullValueslabels(randomArrayData)
  }

  //Simulating values pushing every second
  useEffect(() => {
    const interval = setInterval(() => {
      RandomArrayData()
    }, 2000)
    return () => clearInterval(interval)
    // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
  }, [])

  const fullValueslabels = (valuesData) => {
    const chartData_help = []
    const labelsData_help = []
    const byHourData_help = []
    for (let i = 0; i < valuesData.length; i++) {
      const element = valuesData[i]
      chartData_help.push(element.value)
      let newDate = dayjs(element.timestamp).format('YYYY-MM-DDTHH:mm:ss[Z]')
      let newDate2 = dayjs(newDate).add(4, 'hour')
      labelsData_help.push(newDate2.format('h:mm:ss')) /* newDate2.format('YYYY-MM-DDTHH:mm:ss[Z]') */
      byHourData_help.push({
        quality: element.quality,
        value: element.value,
        valueState: 1,
        valueTotal: element.value * 2,
        timestamp: newDate2.format('mm:ss'),
        //label: element.value, //[newDate2.format('h'), newDate2.format('mm'), newDate2.format('ss')],
        //timestamp2: ,
      })
    }
    setChartData(chartData_help)
    setLabelsData(labelsData_help)
    setValuesByHourData(byHourData_help)
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
    <ChartContext.Provider
      value={{
        loading,
        valuesData,
        chartData,
        labelsData,
        valuesByHourData,
        randomArrayData,
        getValues,
      }}
    >
      {children}
    </ChartContext.Provider>
  )
}

import React, { useContext, useEffect, useState } from 'react'
import { View, Text, ActivityIndicator, StyleSheet, Alert } from 'react-native'
import { Button } from 'react-native-elements'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import dayjs from 'dayjs'
import axios from 'axios'
import { useToast } from 'react-native-styled-toast'

import NormalInputDouble from '../../../resources/hook/inputs/normalInputDouble'
import NormalInputInteger from '../../../resources/hook/inputs/normalInputInteger'
import NormalInputBoolean from '../../../resources/hook/inputs/normalInputBoolean'
import { URL_SAVE_MEASUREMENTS } from '../../../resources/urls/urls'
import { AssetContext } from '../../../context/assetContext'

const Measurement = ({}) => {
  const { asset, modelId, getProperties, measurements } = useContext(AssetContext)
  const body = { assetId: asset.id, modelId: modelId }
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [initialValues, setInitialValues] = useState({})
  const [propertyIds, setPropertyIds] = useState([])
  const [propertyTypes, setPropertyTypes] = useState([])

  useEffect(() => {
    defineinitialValues()
  }, [])

  const validationSchema = Yup.object({})

  const checkValueCero = () => {
    let flag = false
    const formikValues = Object.values(formik.values)
    for (let i = 0; i < formikValues.length; i++) {
      const value_i = formikValues[i]
      if (value_i === 0) {
        return (flag = true)
      }
    }
    return flag
  }

  const checkValueEmpty = () => {
    let flag = false
    const formikValues = Object.values(formik.values)
    for (let i = 0; i < formikValues.length; i++) {
      const value_i = formikValues[i]
      if (Number.isNaN(value_i)) {
        return (flag = true)
      }
    }
    return flag
  }

  const onSubmit = () => {
    const event = defineEventOut()
    try {
      if (checkValueEmpty()) {
        Alert.alert('Changes cannot be saved because there are empty fields')
      } else if (checkValueCero()) {
        Alert.alert('Confirmation', 'Are you sure you want to save with values equal to zero? ', [
          {
            text: 'No',
            onPress: () => console.log('No Pressed'),
            style: 'cancel',
          },
          {
            text: 'Yes',
            onPress: () => {
              setLoading(true)
              axios
                .post(URL_SAVE_MEASUREMENTS, event)
                .then((res) => {
                  //updateLabels();
                  getProperties(body)
                  setLoading(false)
                  toast({ message: 'Measurements saved successfully!!!' })
                })
                .catch((error) => {
                  console.log(error.message)
                  setLoading(false)
                })
            },
          },
        ])
      } else {
        setLoading(true)
        axios
          .post(URL_SAVE_MEASUREMENTS, event)
          .then((res) => {
            //console.log(res.data);
            setLoading(false)
            //updateLabels();
            getProperties(body)
            toast({ message: 'Measurements saved successfully!!!' })
          })
          .catch((error) => {
            console.log(error.message)
            setLoading(false)
          })
      }
    } catch (error) {
      console.log(error.message)
      setLoading(false)
    }
  }

  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
  })

  const defineinitialValues = () => {
    const idsArray = []
    const typesArray = []
    for (let i = 0; i < measurements.length; i++) {
      const element = measurements[i]
      let elementType = Object.keys(element.propertyValue.value)[0]
      let elementValue = Object.values(element.propertyValue.value)[0]
      initialValues[element.id] =
        elementType === 'doubleValue' || elementType === 'integerValue'
          ? parseFloat(elementValue)
          : elementValue
      idsArray.push(element.id)
      typesArray.push(elementType)
    }
    setPropertyIds(idsArray)
    setPropertyTypes(typesArray)
  }

  const defineEventOut = () => {
    let event = {}
    event = {
      assetId: asset.id,
      propertyId: propertyIds,
      Timestamp: dayjs().format('YYYY-MM-DDTHH:mm:ss[Z]'),
      Values: formik.values,
      ValueType: propertyTypes,
    }
    return event
  }

  const handleChange = (value, id, type) => {
    const formikKeys = Object.keys(formik.values)
    const formikValues = Object.values(formik.values)
    let newFormik = {}
    let newValue = 0

    if (type === 'INTEGER' || type === 'DOUBLE') {
      newValue = parseFloat(value)
    } else newValue = value
    for (let i = 0; i < formikKeys.length; i++) {
      const key_i = formikKeys[i]
      const value_i = formikValues[i]

      if (key_i === id) {
        newFormik[key_i] = newValue
      } else {
        newFormik[key_i] = value_i
      }
    }
    formik.setValues(newFormik)
  }

  const renderItem = (item, index) => (
    <View key={index} style={styles.containerListItem}>
      <View>
        <Text style={styles.textTitle}>{item.name}</Text>
        <Text style={styles.textSubTitle}>
          {Object.keys(item.propertyValue.value)[0] === 'doubleValue'
            ? Object.values(item.propertyValue.value)[0].toFixed(1) + ' ' + (item.unit ? item.unit : '')
            : Object.values(item.propertyValue.value)[0] + ' ' + (item.unit ? item.unit : '')}
        </Text>
      </View>
      <View>
        {item.dataType === 'INTEGER' ? (
          <NormalInputInteger
            id={Object.keys(formik.values)[index]}
            name={Object.keys(formik.values)[index]}
            value={Object.values(formik.values)[index]}
            onChangeText={(value) => {
              handleChange(value, item.id, 'INTEGER')
            }}
          />
        ) : item.dataType === 'DOUBLE' ? (
          <NormalInputDouble
            id={Object.keys(formik.values)[index]}
            name={Object.keys(formik.values)[index]}
            value={Object.values(formik.values)[index]}
            onChangeText={(value) => {
              handleChange(value, item.id, 'DOUBLE')
            }}
          />
        ) : item.dataType === 'BOOLEAN' ? (
          <NormalInputBoolean
            id={Object.keys(formik.values)[index]}
            name={Object.keys(formik.values)[index]}
            value={Object.values(formik.values)[index]}
            onValueChange={(value) => {
              handleChange(value, item.id, 'BOOLEAN')
            }}
          />
        ) : (
          <Text>NON</Text>
        )}
      </View>
    </View>
  )

  return (
    <>
      {measurements.map((item, index) => renderItem(item, index))}
      <Button
        title={loading ? 'SENDING' : 'SEND'}
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
        onPress={loading ? () => {} : () => formik.handleSubmit()}
      />
    </>
  )
}

export default Measurement

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
  containerListItem: {
    padding: 13,
    borderBottomWidth: 1,
    backgroundColor: '#fff',
    borderBottomColor: '#ddd',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  textSubTitle: {
    fontSize: 15,
    color: '#aaa',
    //fontWeight: '600',
  },
})

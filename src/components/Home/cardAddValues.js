import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput, Alert, ActivityIndicator } from 'react-native';
import { Icon, Button, Switch, Slider } from 'react-native-elements';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import dayjs from 'dayjs';
import axios from 'axios';

const alias = {
  propertyAlias: [
    'UserInputs1/Light',
    'UserInputs1/CrateCount',
    'UserInputs1/Temperature',
    'UserInputs1/State',
    'UserInputs1/Weight',
  ],
};

const CardAddValues = () => {
  const [checked, setChecked] = useState(false);
  const [value, setValue] = useState(0);
  const [loading, setLoading] = useState(false);
  const [loadingForm, setLoadingForm] = useState(false);
  const [models, setModels] = useState([]);

  useEffect(() => {
    getData();
    getModels();
  }, []);

  const initialValues = {
    light: 0,
    crate_count: 0,
    temperature: 0,
    state: false,
    weight: 0,
  };

  const validationSchema = Yup.object({
    weight: Yup.string().required('The Field is Required!...'),
    crate_count: Yup.string().required('The Field is Required!...'),
    temperature: Yup.string().required('The Field is Required!...'),
  });

  const onSubmit = () => {
    try {
      setLoading(true);
      const event = {
        AssetName: 'UserInputs1',
        Timestamp: dayjs().format('YYYY-MM-DDTHH:mm:ss[Z]'),
        Values: {
          CrateCount: parseInt(formik.values.crate_count),
          Temperature: parseInt(formik.values.temperature),
          Weight: parseInt(formik.values.weight),
          State: formik.values.state,
          Light: formik.values.light,
        },
        ValueType: ['integerValue', 'doubleValue', 'doubleValue', 'booleanValue', 'doubleValue'],
      };

      fetch('https://29wmfdhs0g.execute-api.us-east-1.amazonaws.com/v1/userinputsrestapi', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(event),
      })
        .then((response) => response.json())
        .then((json) => {
          console.log('Enviado');
          setLoading(false);
        });
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
  });

  const getData = () => {
    setLoadingForm(true);
    console.log('entre');
    try {
      axios
        .post('https://29wmfdhs0g.execute-api.us-east-1.amazonaws.com/v1/usergetvalues', alias)
        .then((res) => {
          formik.setValues({
            light: Object.values(res.data.body[0].value)[0],
            crate_count: Object.values(res.data.body[1].value)[0],
            temperature: Object.values(res.data.body[2].value)[0],
            state: Object.values(res.data.body[3].value)[0],
            weight: Object.values(res.data.body[4].value)[0],
          });
          setLoadingForm(false);
        })
        .catch((error) => {
          console.log('error');
        });
    } catch (error) {
      console.log(error);
      setLoadingForm(false);
    }
  };

  const getModels = () => {
    setLoadingForm(true);
    console.log('models');
    try {
      axios
        .get('https://29wmfdhs0g.execute-api.us-east-1.amazonaws.com/v1/testpythonpostmanrest')
        .then((res) => {
          console.log(res.data.data);
          setLoadingForm(false);
        })
        .catch((error) => {
          console.log('error');
        });
    } catch (error) {
      console.log(error);
      setLoadingForm(false);
    }
  };

  useEffect(() => {
    formik.setValues({
      ...formik.values,
      light: value,
    });
    /* console.log(formik.values); */
  }, [value]);

  const setStateCheched = (check) => {
    setChecked(value);
    formik.setValues({
      ...formik.values,
      state: check,
    });
    /* console.log(formik.values); */
  };

  /* console.log(formik.values); */

  return (
    <>
      {loadingForm ? (
        <ActivityIndicator size="large" color={'black'} style={{ marginTop: '40%' }} />
      ) : (
        <View style={styles.container}>
          <Text style={styles.textHeader}>Add Values</Text>
          <View style={styles.inputView}>
            <Text style={styles.countText}>Weight</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter Value"
              placeholderTextColor="rgba(0, 0, 0, 0.3)"
              keyboardType="numeric"
              value={formik.values.weight.toString()}
              onChangeText={formik.handleChange('weight')}
              onBlur={formik.handleBlur('weight')}
            />
            {formik.errors.weight && formik.touched.weight ? (
              <Text style={{ color: 'red' }}>{formik.errors.weight}</Text>
            ) : null}
          </View>
          <View style={styles.inputView}>
            <Text style={styles.countText}>Crate Count</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter Value"
              placeholderTextColor="rgba(0, 0, 0, 0.3)"
              keyboardType="numeric"
              value={formik.values.crate_count.toString()}
              onChangeText={formik.handleChange('crate_count')}
              onBlur={formik.handleBlur('crate_count')}
            />
            {formik.errors.crate_count && formik.touched.crate_count ? (
              <Text style={{ color: 'red' }}>{formik.errors.crate_count}</Text>
            ) : null}
          </View>
          <View style={styles.inputView}>
            <Text style={styles.countText}>Temperature</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter Value"
              placeholderTextColor="rgba(0, 0, 0, 0.3)"
              keyboardType="numeric"
              value={formik.values.temperature.toString()}
              onChangeText={formik.handleChange('temperature')}
              onBlur={formik.handleBlur('temperature')}
            />
            {formik.errors.temperature && formik.touched.temperature ? (
              <Text style={{ color: 'red' }}>{formik.errors.temperature}</Text>
            ) : null}
          </View>

          <View style={[styles.sliderView]}>
            <Text style={[styles.countText, { marginLeft: -5 }]}>Light: {formik.values.light}</Text>
            <Slider
              value={formik.values.light}
              onValueChange={setValue}
              maximumValue={100}
              minimumValue={0}
              step={1}
              allowTouchTrack
              trackStyle={{ height: 5, backgroundColor: 'transparent' }}
              thumbStyle={{ height: 20, width: 20, backgroundColor: 'transparent' }}
              thumbProps={{
                children: (
                  <Icon
                    name="arrow-left-right-bold"
                    type="material-community"
                    size={15}
                    reverse
                    containerStyle={{ bottom: 15, right: 15 }}
                    color="rgba(90, 154, 230, 1)"
                  />
                ),
              }}
            />
          </View>

          <View style={styles.lightView}>
            <Text style={styles.lightText}>State</Text>
            <Switch value={formik.values.state} onValueChange={(value) => setStateCheched(value)} />
          </View>

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
        </View>
      )}
    </>
  );
};

export default CardAddValues;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: '#ddd',
    alignItems: 'center',
    justifyContent: 'flex-start',
    borderRadius: 10,
    padding: 10,
    paddingTop: 30,
  },
  inputView: {
    width: '95%',
    marginBottom: 20,
  },
  input: {
    fontSize: 18,
    paddingHorizontal: 5,
    height: 40,
    borderWidth: 1,
    borderRadius: 6,
    borderColor: 'rgba(0, 0, 0, 0.3)',
  },
  textHeader: {
    fontSize: 22,
    color: 'rgba(0, 0, 0, 0.5)',
    marginBottom: 20,
  },
  lightView: {
    alignItems: 'center',
    alignSelf: 'flex-start',
    marginLeft: 10,
    marginTop: 15,
  },
  lightText: {
    fontSize: 18,
    marginRight: 10,
    marginBottom: 10,
    color: 'rgba(0, 0, 0, 0.8)',
  },
  countText: {
    fontSize: 18,
    marginBottom: 5,
    color: 'rgba(0, 0, 0, 0.8)',
  },
  buttonStyle: {
    backgroundColor: 'rgba(90, 154, 230, 1)',
    borderColor: 'transparent',
    borderWidth: 0,
    borderRadius: 30,
  },
  containerStyle: {
    width: '100%',
    marginHorizontal: 50,
    marginVertical: 25,
  },
  sliderView: {
    paddingHorizontal: 15,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'stretch',
  },
  countView: {
    padding: 20,
    height: 20,
    width: 20,
  },
});

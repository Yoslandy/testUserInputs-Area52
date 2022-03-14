import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput, Alert } from 'react-native';
import { Icon, Button, Switch, Slider } from 'react-native-elements';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const CardAddValues = () => {
  const [checked, setChecked] = useState(false);
  const [value, setValue] = useState(0);

  const initialValues = {
    weight: 0,
    crate_count: 0,
    temperature: 0,
    light: 0,
    state: false,
  };

  const validationSchema = Yup.object({
    weight: Yup.string().required('The Field is Required!...'),
    crate_count: Yup.string().required('The Field is Required!...'),
    temperature: Yup.string().required('The Field is Required!...'),
  });

  const onSubmit = () => {
    const newValues = {
      weight: parseInt(formik.values.weight),
      crate_count: parseInt(formik.values.crate_count),
      temperature: parseInt(formik.values.temperature),
      light: value,
      state: checked,
    };

    console.log(newValues);
    Alert.alert('Values ready to send');
  };

  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
  });

  return (
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
        <Text style={[styles.countText, { marginLeft: -5 }]}>Light: {value}</Text>
        <Slider
          value={value}
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
        <Switch value={checked} onValueChange={(value) => setChecked(value)} />
      </View>

      <Button
        title="SEND"
        icon={{
          name: 'home',
          type: 'material-community',
          size: 20,
          color: 'white',
        }}
        iconContainerStyle={{ marginRight: 10 }}
        titleStyle={{ fontWeight: '700' }}
        buttonStyle={styles.buttonStyle}
        containerStyle={styles.containerStyle}
        onPress={() => formik.handleSubmit()}
      />
    </View>
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

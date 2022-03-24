import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { Badge, /* Input, */ ListItem } from 'react-native-elements';
import axios from 'axios';
/* import { SimpleAccordion } from 'react-native-simple-accordion'; */
import Collapsible from 'react-native-collapsible';

import Measurement from './measurementsComp/measurement';
import Attribute from './measurementsComp/attributes';
import Metrics from './measurementsComp/metrics';

import { URL_GET_PROPERTIES } from '../../resources/urls/urls';
import Transform from './measurementsComp/transform';
import MyCollapsible from '../../resources/hook/myCollapsible';

const Measurements = ({ navigation, route }) => {
  const { asset, modelId } = route.params;
  const [data, set_Data] = useState([]);
  const [measurements, set_Measurements] = useState([]);
  const [attributes, set_Attributes] = useState([]);
  const [metrics, set_Metrics] = useState([]);
  const [transforms, set_Transforms] = useState([]);
  const [loadingForm, setLoadingForm] = useState(false);

  const body = { assetId: asset.id, modelId: modelId };

  useEffect(() => {
    getProperties(body);
  }, []);

  useEffect(() => {
    updateProperties();
  }, [data]);

  const updateProperties = () => {
    let auxMeasurements = [];
    let auxAttributes = [];
    let auxMetrics = [];
    let auxTransform = [];
    for (let i = 0; i < data.length; i++) {
      const element = data[i];
      if (element.propertyType === 'measurement') auxMeasurements.push(element);
      if (element.propertyType === 'attribute') auxAttributes.push(element);
      if (element.propertyType === 'metric') auxMetrics.push(element);
      if (element.propertyType === 'transform') auxTransform.push(element);
    }
    set_Measurements(auxMeasurements);
    set_Attributes(auxAttributes);
    set_Metrics(auxMetrics);
    set_Transforms(auxTransform);
  };

  const getProperties = (body) => {
    setLoadingForm(true);
    try {
      axios
        .post(URL_GET_PROPERTIES, body)
        .then((res) => {
          /* console.log(res.data.data); */
          set_Data(res.data.data);
          setLoadingForm(false);
        })
        .catch((error) => {
          console.log(error.message);
          setLoadingForm(false);
        });
    } catch (error) {
      console.log(error);
      setLoadingForm(false);
    }
  };

  return (
    <View>
      {loadingForm ? (
        <ActivityIndicator size={'large'} />
      ) : (
        //Cambiar el ScrollView o la FlatList Dentro de esos components por data.map
        //https://stackoverflow.com/questions/67623952/error-virtualizedlists-should-never-be-nested-inside-plain-scrollviews-with-th
        <ScrollView>
          <View>
            <Text style={{ alignSelf: 'center', marginVertical: 10 }}>Asset Name: {asset.name}</Text>

            <MyCollapsible text="Attributes" body={body}>
              <Attribute data={attributes} asset={asset} />
            </MyCollapsible>
            <View style={{ marginTop: 10 }}>
              <View style={styles.header}>
                <Text style={styles.headerText}>Measurements</Text>
              </View>
              <Measurement data={measurements} asset={asset} body={body} />
            </View>
            {/* <MyCollapsible text="Measurements">
            </MyCollapsible> */}
            {/* <MyCollapsible text="Transforms">
              <Transform data={transforms} asset={asset} />
            </MyCollapsible>
            <MyCollapsible text="Metrics">
              <Metrics data={metrics} asset={asset} />
            </MyCollapsible> */}
          </View>
        </ScrollView>
      )}
    </View>
  );
};

export default Measurements;

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#F5FCFF',
    padding: 10,
  },
  headerText: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '500',
  },
  content: {
    padding: 20,
    backgroundColor: '#fff',
  },
});

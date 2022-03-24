import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import Collapsible from 'react-native-collapsible';
import { URL_GET_PROPERTIES } from '../urls/urls';
import axios from 'axios';

const MyCollapsible = ({ children, text, body }) => {
  const [collapsed, setCollapsed] = useState(true);

  return (
    <View style={{ marginTop: 10 }}>
      <TouchableOpacity
        onPress={() => {
          setCollapsed(!collapsed);
        }}
      >
        <View style={styles.header}>
          <Text style={styles.headerText}>{text}</Text>
        </View>
      </TouchableOpacity>
      <Collapsible collapsed={collapsed} align="center">
        {children}
      </Collapsible>
    </View>
  );
};

export default MyCollapsible;

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

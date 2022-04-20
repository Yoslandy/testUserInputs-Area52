import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import Collapsible from 'react-native-collapsible';
import { Icon } from 'react-native-elements';

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
          <Text style={styles.headerText}> </Text>
          <Text style={styles.headerText}>{text}</Text>
          <Icon
            name={!collapsed ? 'chevron-up-outline' : 'chevron-down-outline'}
            type="ionicon"
            color="#517fa4"
            size={20}
            style={styles.iconStyle}
          />
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#ccc',
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  headerText: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '500',
  },
  iconStyle: {
    alignSelf: 'flex-end',
  },
});

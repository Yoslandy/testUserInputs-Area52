import { View, StyleSheet, ScrollView, ActivityIndicator, Text } from 'react-native'
import React, { useContext } from 'react'
import ChartLine from '../../components/Home/chartLine'
import ChartBar from '../../components/Home/chartBar'
import { ChartContext, ChartProvider } from '../../context/chartContext'
import { Button } from 'react-native-elements'

const Home = () => {
  const { loading, getValues } = useContext(ChartContext)

  return (
    /* <ChartProvider> */
    <ScrollView>
      <View style={styles.container}>
        {/* <Text>Bringing the last 10 records of net_lobster_weight</Text> */}
        <Text>Using 10 Random Records every 2 seconds</Text>
        {/* <View style={{ width: '100%' }}>
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
        </View> */}
        <ChartLine />
        <ChartBar />
      </View>
    </ScrollView>
    /* </ChartProvider> */
  )
}

export default Home

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
  },
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

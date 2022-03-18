import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Amplify, Auth } from 'aws-amplify';
import awsconfig from './src/aws-exports';
import { NavigationContainer } from '@react-navigation/native';
import { withAuthenticator } from 'aws-amplify-react-native';
import { StackHome } from './src/router/homeRouter';
import { SafeAreaView } from 'react-native-safe-area-context';

Amplify.configure(awsconfig);
/* Auth.signOut(); */
function App() {
  return (
    <NavigationContainer>
      {/* <SafeAreaView> */}
      <StatusBar style="auto" />
      <StackHome />
      {/* </SafeAreaView> */}
    </NavigationContainer>
  );
}

export default withAuthenticator(App);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

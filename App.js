import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Amplify, Auth } from 'aws-amplify';
import awsconfig from './src/aws-exports';
import { NavigationContainer } from '@react-navigation/native';
import { withAuthenticator } from 'aws-amplify-react-native';
import { HomeBottomRouter } from './src/router/homeBottomRouter';
import { ThemeProvider } from 'styled-components';
import { ToastProvider } from 'react-native-styled-toast';
import theme from './src/resources/theme';
Amplify.configure(awsconfig);

function App() {
  return (
    <NavigationContainer>
      {/* <StatusBar style="auto" /> */}
      <ThemeProvider theme={theme}>
        <ToastProvider>
          <HomeBottomRouter />
        </ToastProvider>
      </ThemeProvider>
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

import { useEffect, useRef } from 'react';
import { store } from './store';
import * as SplashScreen from 'expo-splash-screen';
import { Provider } from "react-redux";
import { SafeAreaView, AppRegistry } from 'react-native';
import { startNotifications } from './actions';
import MainStack from './navigation/MainStack';
import { StyleSheet } from 'react-native';

AppRegistry.registerRunnable('antesDeIniciar', () => SplashScreen.preventAutoHideAsync());


export default function App() {
  const responseListener = useRef();
  const notificationListener = useRef();

  useEffect(() => {
    SplashScreen.hideAsync();
    startNotifications(notificationListener, responseListener);
  }, []);

  return (
    <Provider store={store}>
      <SafeAreaView style = {{ flex: 1 }}>    
        <MainStack />
      </SafeAreaView>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

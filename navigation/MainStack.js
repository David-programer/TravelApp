import {useEffect, useState} from 'react';
import * as Location from 'expo-location';
import { KeyboardAvoidingView, Platform, Modal, Text, View, Pressable, StyleSheet} from 'react-native';
import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useDispatch } from 'react-redux';
import {GOOGLE_MAPS_KEY} from '@env';
import { setOrigin } from '../slices/navSlice';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import Map from '../views/Map';
import Home from '../views/Home';
import Login from '../views/Login';
import Register from '../views/Register';
import Support from '../views/Support';
import Driver from '../views/Driver';
import DriverMap from '../views/DriverMap';
import Bus from '../views/Bus';
import Busetas from '../views/Busetas';
import BusetasMap from '../views/BusetasMap';
import RecoverPassword from '../views/RecoverPassword';
import AddTaxi from '../views/AddTaxi';
import Taxis from '../views/Taxis';
import Profile from '../views/Profile';
import TaxiMap from '../views/TaxiMap';

const Stack = createNativeStackNavigator();

const MainStack = () => {

  const dispatch = useDispatch();
  const [modalVisible, setModalVisible] = useState(false);
  const [modalInfo, setModalInfo] = useState(true);

  // useEffect(( ) =>{}, [])

  function aceptPermission() {
    setModalInfo(false)
    getLocationPermission();
  }

  async function getLocationPermission(){
    let {status} = await Location.requestForegroundPermissionsAsync();

    if(status !== 'granted'){
      setModalVisible(true)
      //alert('Permisos denegados');
      return;
    }
    let location = await Location.getCurrentPositionAsync({})
    const current = {
      lat: location.coords.latitude,
      lng: location.coords.longitude
    }

    let address = await Location.reverseGeocodeAsync({latitude: current.lat, longitude: current.lng});
    const description = `${address[0].street}, ${address[0].streetNumber}`

    dispatch(setOrigin({
      description,
      location: current,
    }))
  }

  return (
    <>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text>De acuerdo, digita tu ubicación actual para continuar </Text>

            <GooglePlacesAutocomplete
              placeholder='Dirección'
              styles={inputDestinationStyles}
              fetchDetails
              nearbyPlacesAPI='GooglePlacesSearch'
              returnKeyType={"search"}
              minLength={2}
              isRowScrollable={true}
              enablePoweredByContainer={false}
              debounce={400}
              onPress={(data, details = null) => {
                dispatch(
                  setOrigin({
                    location: details.geometry.location,
                    description: data.description,
                  })
                );
                setModalVisible(false)
              }}
              query={{
                key: GOOGLE_MAPS_KEY,
                language: 'es',
                // components: 'country:co',
              }}
            />
          </View>
        </View>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalInfo}
        onRequestClose={() => {
          setModalInfo(!modalInfo);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text>Necesitamos saber tu ubicación, para conocer el lugar desde dónde solicitas el servicio. Si no quieres activar la ubicación, puedes digitar la dirección.</Text>
            <Pressable style={styles.button} onPress={() => {aceptPermission()}}>
              <Text style={styles.buttonText}>Aceptar</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      <NavigationContainer>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{ flex: 1 }}
            keyboardVerticalOffset={Platform.OS === "ios" ? -64 : 0}
          >
            <Stack.Navigator>
                <Stack.Screen
                  name='Login'
                  component={Login}
                  options={{
                    headerShown: false,
                  }}
                />
                <Stack.Screen
                  name='Register'
                  component={Register}
                  options={{
                    headerShown: false,
                  }}
                />
                <Stack.Screen
                  name='Home'
                  component={Home}
                  options={{
                    headerShown: false,
                  }}
                />
                <Stack.Screen
                  name='Support'
                  component={Support}
                  options={{
                    headerShown: false,
                  }}
                />
                <Stack.Screen
                  name='Profile'
                  component={Profile}
                  options={{
                    headerShown: false,
                  }}
                />
                <Stack.Screen
                  name='Driver'
                  component={Driver}
                  options={{
                    headerShown: false,
                  }}
                />
                <Stack.Screen
                  name='DriverMap'
                  component={DriverMap}
                  options={{
                    headerShown: false,
                  }}
                />
                <Stack.Screen
                  name='Bus'
                  component={Bus}
                  options={{
                    headerShown: false,
                  }}
                />
                <Stack.Screen
                  name='Busetas'
                  component={Busetas}
                  options={{
                    headerShown: false,
                  }}
                />
                <Stack.Screen
                  name='BusetasMap'
                  component={BusetasMap}
                  options={{
                    headerShown: false,
                  }}
                />
                <Stack.Screen
                  name='Map'
                  component={Map}
                  options={{
                    headerShown: false,
                  }}
                />
                <Stack.Screen
                  name='AddTaxi'
                  component={AddTaxi}
                  options={{
                    headerShown: false,
                  }}
                />
                <Stack.Screen
                  name='Taxis'
                  component={Taxis}
                  options={{
                    headerShown: false,
                  }}
                />
                <Stack.Screen
                  name='TaxiMap'
                  component={TaxiMap}
                  options={{
                    headerShown: false,
                  }}
                />
                <Stack.Screen
                  name='recover-password'
                  component={RecoverPassword}
                  options={{
                    headerShown: false,
                  }}
                />
            </Stack.Navigator>
          </KeyboardAvoidingView>
      </NavigationContainer>
    </>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, .7)",
    justifyContent: 'center',
    alignItems: 'center',
    // marginTop: 22,
  },

  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },

  button: {
    margin: 10,
    backgroundColor: '#1D8385',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 15,
    elevation: 3,
  },

  buttonText: {
    // fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  }
})

const inputDestinationStyles = StyleSheet.create({
  container: {
    width: 300,
    paddingTop: 20,
    flex: 0,
  },
  textInput: {
    backgroundColor: '#DDDDDF',
    borderRadius: 0,
    fontSize: 18,
  },
  textInputContainer: {
    paddingBottom: 0,
  }
});


export default MainStack;

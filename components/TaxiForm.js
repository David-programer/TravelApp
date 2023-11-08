import React, { useState } from 'react'
import {GOOGLE_MAPS_KEY} from '@env';
import * as Location from 'expo-location';
import { firebase } from '../firebase-config';
import { useDispatch, useSelector } from 'react-redux';
import { StyleSheet, Text, View, SafeAreaView, Pressable, Image, FlatList, TouchableHighlight } from 'react-native';
import { setOrigin, selectOrigin, selectDestination, setDestination, selectUser } from '../slices/navSlice';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { useEffect } from 'react';

const travelLogo = require('../assets/images/logotipo-travel-shadow.png');

const TaxiForm = ({navigation, setShowMap}) => {

  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const origin = useSelector(selectOrigin);
  const destination = useSelector(selectDestination);
  const [places, setPlaces] = useState([
    {
      description: 'Esquina la virgen - Cra. 22 #14, Yarumal, Antioquia',
      geometry: { location: { lat: 6.960192, lng: -75.415935 } },
    },
    {
      description: 'El Coliseo - Cra. 24 #12, Yarumal, Antioquia',
      geometry: { location: { lat: 6.9563664, lng: -75.4174546 } },
    },
    {
      description: 'Esquina del Molino - Cra 20 #21, Yarumal, Antioquia',
      geometry: { location: { lat: 6.9638248, lng:-75.4214492 } },
    },
    {
      description: 'Cl.jón Pinedas - Cl. 26 #15, Yarumal, Antioquia',
      geometry: { location: { lat: 6.9695493, lng: -75.4233112} },
    },
    {
      description: 'Pasaje Normal - Cl. 15 #17a, Yarumal, Antioquia',
      geometry: { location: { lat: 6.9626178, lng: -75.4153078} },
    },
    {
      description: 'Esquina del espanto - Cra. 15a #23a, Yarumal, Antioquia',
      geometry: { location: { lat: 6.9674796, lng: -75.4200205} },
    },
    {
      description: 'La Buena Esquina - Cra. 16 #19, Yarumal, Antioquia',
      geometry: { location: { lat: 6.9653723, lng: -75.4177321 } },
    },
    {
      description: 'Funeraria San Vicente - Cra. 21 #18, Yarumal, Antioquia',
      geometry: { location: {lat: 6.9615534, lng: -75.4169524} },
    },
    {
      description: 'Apartamentos Martin - Cra. 23 #22a, Yarumal, Antioquia',
      geometry: { location: { lat: 6.9609992, lng: -75.4216324 } },
    },
    {
      description: 'Esquina Pedro Pablo - Cra. 21 #19, Yarumal, Antioquia',
      geometry: { location: { lat: 6.9621824, lng: -75.4202929} },
    },
    {
      description: 'Esquina del Mono - Cra. 23 #22, Yarumal, Antioquia',
      geometry: { location: { lat: 6.9609992, lng: -75.4216324} },
    },
    {
      description: 'Esquina de los Cuadros - Cl. 16 #14a, Yarumal, Antioquia',
      geometry: { location: { lat: 6.9621254, lng: -75.4169139} },
    },
    {
      description: 'Ciudadela - Cra. 17 #20, Yarumal, Antioquia',
      geometry: { location: { lat: 6.9648461, lng: -75.4183489} },
    },
    {
      description: 'Cancha San Carlos - Cra. 23 #19, Yarumal, Antioquia',
      geometry: { location: { lat: 6.9610888, lng: -75.4214446} },
    },
    {
      description: 'Luz del mundo - Cra. 21 #24, Yarumal, Antioquia',
      geometry: { location: { lat: 6.9614177, lng: -75.4193276} },
    },
    { 
      description: 'Patinodromo - Cl. 14 #23, Yarumal, Antioquia',
      geometry: { location: { lat: 6.9604752, lng: -75.4160101} },
    },
    {
      description: 'El Asilo - Cra. 18a #11, Yarumal, Antioquia',
      geometry: { location: { lat: 6.9618024, lng: -75.4136843} },
    },
    {
      description: 'Floristería Tere - Cra. 20 #18, Yarumal, Antioquia',
      geometry: { location: { lat: 6.962483, lng: -75.4193119} },
    },
    {
      description: 'Esquina La Casona - Cra. 19 #22, Yarumal, Antioquia',
      geometry: { location: { lat: 6.9645082, lng: -75.4229243} },
    },
    {
      description: 'Parqueadero Semisiones - Cl. 15 #23, Yarumal, Antioquia',
      geometry: { location: { lat: 6.9584526, lng: -75.4187024} },
    },
    {
      description: 'Rancho de Chona - Cl. 13 #19, Yarumal, Antioquia',
      geometry: { location: { lat: 6.9600284, lng: -75.4128268} },
    },
    {
      description: 'Esquina de la Cárcel - Cra. 21 #20-52, Yarumal, Antioquia',
      geometry: { location: { lat: 6.9623594, lng: -75.4180914} },
    },
    {
      description: 'Plaza de Mercado - Cra. 21 #21, Yarumal, Antioquia',
      geometry: { location: { lat: 6.9627685, lng: -75.4186618 } },
    },
    {
      description: 'Dónde vivia orton - Cl. 23 & Cra 24, Yarumal, Antioquia',
      geometry: { location: { lat: 6.9621875, lng: -75.4244262 } },
    },
    {
      description: 'Escuela María Auxiliadora - Cra. 18 #16, Yarumal, Antioquia',
      geometry: { location: { lat: 6.9627829, lng: -75.4138995} },
    },
    {
      description: 'San Luis de Gongora - Cra. 23 #17a, Yarumal, Antioquia ',
      geometry: { location: { lat: 6.959947, lng: -75.4199296} },
    },
    {
      description: 'Esquina Trigopan - Cra. 19 #20, Yarumal, Antioquia',
      geometry: { location: { lat: 6.9636616, lng: -75.4169884} },
    },
    {
      description: 'Dominios del Niño - Cra. 20 #12, Yarumal, Antioquia',
      geometry: { location: { lat: 6.9595694, lng: -75.4154031} },
    },
    {
      description: 'Gases Margarito - Cra. 17 #22 Yarumal, Antioquia',
      geometry: { location: { lat: 6.9662445, lng: -75.4178072} },
    },
    {
      description: 'Esquina de Mercafacol - Cra. 20 #25, Yarumal, Antioquia',
      geometry: { location: { lat: 6.9665674, lng: -75.4248021} },  
    },
    {
      description: 'Plan de la muñeca - Cra. 15 #15a, Yarumal, Antioquia',
      geometry: { location: { lat: 6.9641625, lng: -75.4135413} },
    },
    {
      description: 'Plan del Acueducto - Cra. 14 #22, Yarumal, Antioquia',
      geometry: { location: { lat: 6.9678994, lng: -75.4181668} },
    },
    {
      description: 'Plan del Chispero - Cra. 26 #9, Yarumal, Antioquia',
      geometry: { location: { lat: 6.9545122, lng: -75.4173234} },
    },
    {
      description: 'Plan de Señor Cardo - Cra. 16 #17, Yarumal, Antioquia',
      geometry: { location: { lat: 6.9644448, lng: -75.4162359} },
    },
    {
      description: 'Noches de Luna - Cra. 22 #24, Yarumal, Antioquia',
      geometry: { location: { lat: 6.9608776, lng: -75.420026} },
    },
    {
      description: 'Vida Buena - Cra. 22 #20, Yarumal, Antioquia',
      geometry: { location: { lat: 6.9619455, lng: -75.4215708} },
    },
    {
      description: 'Pollo Rico - Cra. 22 #14, Yarumal, Antioquia',
      geometry: { location: { lat: 6.9602221, lng: -75.4205467} },
    },
  ]);
  const [placesAlwaysVisible, setPlacesAlwaysVisible] = useState(false);
  // const [selectedPlace, setSelectedPlace] = useState({});

  // useEffect(() => {
  //   return async () => {
  //     let response = await firebase.firestore().collection('places').get()
  //     setPlaces();
      
  //     // console.log(places);

  //     // .then(places => {
  //     //   console.log(places);
  //     //   // dispatch(setUser({
  //     //   //   user: user.data(),
  //     //   // }))
  //     //   // if (user.data().role === 'Usuario' || user.data().role === 'Propietario') {
  //     //   //   navigation.navigate('Home');
  //     //   // } else if(user.data().role === 'Conductor') {
  //     //   //   let canDrive = true;
  //     //   //   firebase.firestore().collection('taxis')
  //     //   //   .where("placa", "==", user.data().placa)
  //     //   //   .get()
  //     //   //   .then(function(querySnapshot) {
  //     //   //     if (querySnapshot.empty) {
  //     //   //       Alert.alert('No tienes ningún taxi asignado');
  //     //   //     } else {
  //     //   //       querySnapshot.docs.forEach(doc => {
  //     //   //         doc.data().drivers.forEach(dri => {
  //     //   //           firebase.firestore().collection('users')
  //     //   //           .doc(dri)
  //     //   //           .get()
  //     //   //           .then(docSnapshot => {
  //     //   //             if (docSnapshot.exists) {
  //     //   //               if (docSnapshot.data().state === 'inRuta') {
  //     //   //                 canDrive = false
  //     //   //               }
  //     //   //             }
  //     //   //           })
  //     //   //         })
  //     //   //       })
  //     //   //     }
  //     //   //   })
  //     //   //   if (canDrive) {
  //     //   //     firebase.firestore().collection('users').doc(auth().currentUser.uid)
  //     //   //     .update({
  //     //   //       state: 'inRuta',
  //     //   //       location: origin,
  //     //   //     });
  //     //   //     navigation.navigate('Driver');
  //     //   //   } else {
  //     //   //     Alert.alert('No puede iniciar sesión ya que un conductor esta en ruta con el vehículo: ' + user.data().placa)
  //     //   //   }
  //     //   // } else {
  //     //   //   setBusJornada();
  //     //   //   navigation.navigate('Bus');
  //     //   // }
  //     // })
  //   }
  // }, []);

  onPress = ({lat, lng, address})=>{
    // console.log(selectedPlace);
    setShowMap(true)
    dispatch(
      setDestination({
        location: {lat, lng},
        description: address,
      })
    );
  } 

  const requestDriver = async () => {
    if (!origin || !destination || !user) return;

    let {status} = await Location.requestForegroundPermissionsAsync();
    // if(status !== 'granted'){
    //   alert('Activa los permisos de ubicación');
    //   return;
    // }
    // let location = await Location.getCurrentPositionAsync({})

    const current = origin.location

    let address = await Location.reverseGeocodeAsync({latitude: current.lat, longitude: current.lng});
    const description = `${address[0].street}, ${address[0].streetNumber}`

    dispatch(setOrigin({
      description,
      location: current,
    }))

    await firebase.firestore().collection('movements')
      .doc(firebase.auth().currentUser.uid)
      .set({
        user: {
          id: firebase.auth().currentUser.uid,
          name: user.user.name,
          email: user.user.email,
          role: user.user.role,
          cel: user.user.cel,
        },
        origin: {
          description,
          location: current,
        },
        destination,
        state: 'Pending',
      })

    navigation.navigate('WaitingTaxi')

    setTimeout( async () => {
      await firebase.firestore().collection('movements')
      .doc(firebase.auth().currentUser.uid)
      .get()
      .then(docSnapshot => {
        if (docSnapshot.exists) {
          firebase.firestore().collection('movements').doc(firebase.auth().currentUser.uid)
            .update({
              important: true,
            });
        }
      })
    }, 60000)
  }

  return (
    <SafeAreaView style={styles.containerHeader}>
      <View style={styles.containerImage}>
        <Image style={styles.imageLogo} source={travelLogo}></Image>
      </View>
      <View style={styles.border}/>
      <View>
        <GooglePlacesAutocomplete
          placeholder='Destino'
          predefinedPlacesAlwaysVisible={placesAlwaysVisible}
          listEmptyComponent={()=>{
            setPlacesAlwaysVisible(true);
          }}
          // renderHeaderComponent={()=>{
          //   console.log('yes found');
          //   if(placesAlwaysVisible){
          //     setPlacesAlwaysVisible(false);
          //     setPlaces([]);
          //   }
          // }}
          styles={inputDestinationStyles}
          fetchDetails
          nearbyPlacesAPI='GooglePlacesSearch'
          returnKeyType={"search"}
          minLength={2}
          isRowScrollable={true}
          enablePoweredByContainer={false}
          debounce={400}
          textInputProps={{
            onFocus: () => setShowMap(false),
          }}
          onPress={(data, details = null) => {
            setShowMap(true);
            dispatch(
              setDestination({
                location: details.geometry.location,
                description: data.description,
              })
            );
          }}
          predefinedPlaces={places}
          query={{
            key: GOOGLE_MAPS_KEY,
            language: 'es',
            // components: 'country:co',
          }}
        />
        {/* <SafeAreaView>
          <FlatList
            data={places}
            renderItem={({item}) => 
              <TouchableHighlight onPress={()=> onPress(item)}>
                <View key={item.id}>
                  <Text>{item.name} - {item.address}</Text>
                </View>
              </TouchableHighlight>
            }
            keyExtractor={item => item.id}
          />
        </SafeAreaView> */}
      </View>
      <View style={ styles.containerButton }>
        <Pressable
          style={ styles.button }
          onPress={requestDriver}
        >
          <Text style={ styles.text }>Solicitar</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  )
}

export default TaxiForm

const inputDestinationStyles = StyleSheet.create({
  container: {
    paddingTop: 20,
    flex: 0,
  },
  textInput: {
    backgroundColor: '#DDDDDF',
    borderRadius: 0,
    fontSize: 18,
  },
  textInputContainer: {
    paddingHorizontal: 20,
    paddingBottom: 0,
  }
});

const styles = StyleSheet.create({
  containerHeader: {
    flex: 1,
    backgroundColor: '#1D8385',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  containerButton: {
    padding: 2,
    marginTop: 'auto',
    borderTopWidth: 1,
    borderColor: '#297273',
    flexShrink: 1,
  },
  containerImage: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  textContent: {
    textAlign: 'center',
    padding: 5,
    fontSize: 20,
    fontWeight: '900',
    color: '#C2645D',
    textShadowColor: 'white',
    textShadowOffset: {width: 0, height: 0},
    textShadowRadius: 5,
  },
  border: {
    borderTopWidth: 1,
    borderColor: '#297273',
    flexShrink: 1,
  },
  button: {
    margin: 10,
    backgroundColor: '#ff4e40',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 50,
    elevation: 3,
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: '#b5b2b8',
  },
  imageLogo: {
    height: 55,
    width: 160,
    borderWidth: 0,
    borderColor: '#ffff',
    marginTop: 2,
    marginBottom: 2,
  },
})
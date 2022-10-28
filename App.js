import React, { useEffect, useState } from 'react';
import { 
  StyleSheet, 
  StatusBar, 
  Text, 
  View, 
  Image, 
  Vibration, 
  Animated, 
  Easing, 
  ImageBackground 
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Button from './components/Button';

export default function App() {
  const background = './assets/Fondo.jpg'
  const [image, setImage] = useState(null);
  const animatedValue = React.useRef(new Animated.Value(0)).current;
 
  const timingAnimation = (easing) => {
    animatedValue.setValue(-400);
    Animated.timing(animatedValue, {
      toValue: 0,
      duration: 900,
      useNativeDriver: true,
      easing
    }).start()
  }
  const animatedStyleTiming = {
    transform: [{ translateX: animatedValue}],
  }
  const pickImage = async () => {
    Vibration.vibrate()
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      aspect: [4,3],
      quality: 1,
    });
    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const pickCamera = async () => {
    Vibration.vibrate()
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchCameraAsync({

    })
    if (!result.cancelled) {
      setImage(result.uri);
  }}
  
  const Espacio = () => {
    return (
      <View style={styles.space} />
    )

  }
  useEffect(() => {timingAnimation(Easing.elastic(2))}, [image])

  // if(cameraStatus && libreryStatus === 'granted'){
  return (
    <View style={styles.container}>
      <ImageBackground source={require(background)} resizeMode='cover' style={styles.imageBackground} >
        <View style={styles.topSubContainer}>
          <Text style={styles.txt}>Seleccione una foto para Subir</Text>
          <Espacio />
          <Button title='subir una imagen' onPress={pickImage} />
          <Espacio />
          <Button title='sacar foto' onPress={pickCamera} />
        </View>
        <Animated.View style={[styles.botSubContainer, styles.box, animatedStyleTiming]}>
          {image && <Image source={{ uri: image }} style={styles.image} />}
        </Animated.View>
        <StatusBar backgroundColor="#000" barStyle={'light-content'}/>
      </ImageBackground>
    </View>
  );
  //  }else{
  //   <View style={styles.container}>
  //     <Text>Esperando Permisos...</Text>
  //   </View>}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
    justifyContent: 'center',
  },
  imageBackground:{
    flex: 1,
    justifyContent: "center",
  },
  image: {
    width: 300, 
    height: 300,
    borderWidth: 3,
    borderColor: 'black',
    borderRadius: 20,
    shadowColor: 'black',
    shadowOffset: {
      width: 1,
      height: 2,
    },
    elevation: 5,
    shadowRadius: 5,
    shadowOpacity: 0.3,
    
  },
  topSubContainer: {
    margin:30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  botSubContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    shadowColor: '#000',
    shadowOffset: {
        width: 0,
        height: 10,
    },
    shadowOpacity: 0.53,
    shadowRadius: 13.97,
    elevation: 21,
  },
  space: {
    margin:3,
  },
  txt:{
    fontSize: 25,
    fontWeight: 'bold',
    color: 'white',
  }
});

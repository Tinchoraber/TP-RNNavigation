import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import * as Location from 'expo-location';
import axios from 'axios';

export default function Clima() {
  const [location, setLocation] = useState(null);
  const [temperature, setTemperature] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setErrorMsg('Permission to access location was denied');
          return;
        }

        let location = await Location.getCurrentPositionAsync({});
        setLocation(location);

        const lat = location.coords.latitude;
        const lon = location.coords.longitude;

        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=0e8c51ba88d65bc4733e364fb31ba533&units=metric`
        );

        if (response.data && response.data.main) {
          setTemperature(response.data.main.temp);
        } else {
          setErrorMsg('No temperature data available');
        }
      } catch (error) {
        setErrorMsg('Error fetching weather data');
        console.log('hola',error);  // Para depuración
      }
    })();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Current Temperature:</Text>
      {errorMsg ? (
        <Text style={styles.tempText}>{errorMsg}</Text>
      ) : (
        <Text style={styles.tempText}>{temperature ? `${temperature}°C` : 'Loading...'}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e6f7ff',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  tempText: {
    fontSize: 20,
    color: '#333',
  },
});

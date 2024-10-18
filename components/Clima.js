import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import * as Location from 'expo-location';
import axios from 'axios';

export default function Clima() {
  const [location, setLocation] = useState(null);
  const [temperature, setTemperature] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [dateTime, setDateTime] = useState('');
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const getCurrentDateTime = () => {
      const now = new Date();
      const date = `${now.getDate().toString().padStart(2, '0')}/${(now.getMonth() + 1)
        .toString()
        .padStart(2, '0')}/${now.getFullYear()}`;
      const time = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
      return `${time} - ${date}`;
    };
  
    const intervalId = setInterval(() => {
      setDateTime(getCurrentDateTime());
    }, 1000); 
    setDateTime(getCurrentDateTime());
    return () => clearInterval(intervalId);
  }, []);
  

  useEffect(() => {
    (async () => {
      try {
        setLoading(true); 
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setErrorMsg('Permiso de ubicación denegado');
          setLoading(false);
          return;
        }
        let location = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.High });
        setLocation(location);
        const lat = location.coords.latitude;
        const lon = location.coords.longitude;
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=0e8c51ba88d65bc4733e364fb31ba533&units=metric`
        );
  
        if (response.data && response.data.main) {
          const temp = response.data.main.temp;
          const roundedTemp = Math.round(temp);
          setTemperature(roundedTemp);
        } else {
          setErrorMsg('No hay datos de temperatura disponibles');
        }
      } catch (error) {
        setErrorMsg('Error obteniendo datos del clima: ' + error.message);
        console.log('Error:', error);  
      } finally {
        setLoading(false); 
      }
    })();
  }, []);
  

  return (
    <View style={styles.container}>
      <Text style={styles.dateText}>{dateTime}</Text>
      <Text style={styles.text}>Temperatura</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#00f" /> 
      ) : errorMsg ? (
        <Text style={styles.tempText}>{errorMsg}</Text>
      ) : (
        <Text style={styles.tempText}>{temperature ? `${temperature}°C` : 'Cargando...'}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f8ff',
    padding: 20,
  },
  dateText: {
    fontSize: 28,
    fontWeight: '300',
    color: '#333',
    marginBottom: 20,
  },
  text: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 10,
  },
  tempText: {
    fontSize: 26,
    color: '#333',
  },
});

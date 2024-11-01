import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Text, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { parsePhoneNumberFromString } from 'libphonenumber-js'; 

export default function ConfiguracionNumEmergencia() {
  const [number, setNumber] = useState('');
  const [savedNumber, setSavedNumber] = useState('');

  useEffect(() => {
    const loadSavedNumber = async () => {
      const storedNumber = await AsyncStorage.getItem('emergencyNumber');
      if (storedNumber) {
        setSavedNumber(storedNumber);
      }
    };
    loadSavedNumber();
  }, []);

  const validatePhoneNumber = (phone) => {
    const phoneNumber = parsePhoneNumberFromString(phone);
    return phoneNumber && phoneNumber.isValid();
  };

  const saveNumber = async () => {
    if (validatePhoneNumber(number)) {
      try {
        await AsyncStorage.setItem('emergencyNumber', number);
        setSavedNumber(number);
        setNumber('');
        Alert.alert('Éxito', 'Número de emergencia guardado!');
      } catch (error) {
        Alert.alert('Error', 'Hubo un problema guardando el número');
      }
    } else {
      Alert.alert('Número inválido', 'Por favor ingrese un número de teléfono válido incluyendo el código de país.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ingrese Número de Contacto de Emergencia:</Text>
      <TextInput
        style={styles.input}
        keyboardType="phone-pad"
        value={number}
        onChangeText={setNumber}
        placeholder="Número de Emergencia"
      />
      <Button title="Guardar" onPress={saveNumber} />
      {savedNumber ? <Text style={styles.savedText}>Número Guardado: {savedNumber}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
  },
  savedText: {
    marginTop: 20,
    fontSize: 18,
    color: 'green',
  },
});

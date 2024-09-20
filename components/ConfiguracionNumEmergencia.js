import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { parsePhoneNumberFromString } from 'libphonenumber-js'; // Importar la función para validar el teléfono

export default function ConfiguracionNumEmergencia() {
  const [number, setNumber] = useState('');
  const [savedNumber, setSavedNumber] = useState('');

  // Función para validar el formato del número de teléfono
  const validatePhoneNumber = (phone) => {
    const phoneNumber = parsePhoneNumberFromString(phone);
    return phoneNumber && phoneNumber.isValid();
  };

  const saveNumber = async () => {
    if (validatePhoneNumber(number)) {
      try {
        await AsyncStorage.setItem('emergencyNumber', number);
        setSavedNumber(number);
        setNumber('');  // Limpiar el campo de entrada
        alert('Emergency number saved!');
      } catch (error) {
        alert('Failed to save number');
      }
    } else {
      // Mostrar una alerta si el número no es válido
      Alert.alert('Invalid Number', 'Please enter a valid phone number with country code.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enter Emergency Number:</Text>
      <TextInput
        style={styles.input}
        keyboardType="phone-pad"
        value={number}
        onChangeText={setNumber}
        placeholder="Emergency Number"
      />
      <Button title="Save" onPress={saveNumber} />
      {savedNumber ? <Text style={styles.savedText}>Saved Number: {savedNumber}</Text> : null}
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

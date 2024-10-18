import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { parsePhoneNumberFromString } from 'libphonenumber-js'; 

export default function ConfiguracionNumEmergencia() {
  const [number, setNumber] = useState('');
  const [savedNumber, setSavedNumber] = useState('');

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
        alert('Numero de Emergencia guardado!');
      } catch (error) {
        alert('Error guardando el numero');
      }
    } else {
      Alert.alert('Numero invalido', 'Por favor ingresar un numero de telefono valido incluyendo codigo de pais.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ingrese Numero de Contacto de Emergencia:</Text>
      <TextInput
        style={styles.input}
        keyboardType="phone-pad"
        value={number}
        onChangeText={setNumber}
        placeholder="Numero de Emergencia"
      />
      <Button title="Guardar" onPress={saveNumber} />
      {savedNumber ? <Text style={styles.savedText}>Numero Guardado: {savedNumber}</Text> : null}
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

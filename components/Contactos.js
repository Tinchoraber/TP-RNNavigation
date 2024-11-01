import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TextInput } from 'react-native';
import * as Contacts from 'expo-contacts';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';

export default function Contactos() {
  const [contacts, setContacts] = useState([]);
  const [searchQuery, setSearchQuery] = useState(''); 
  const [filteredContacts, setFilteredContacts] = useState([]); 
  const [emergencyNumber, setEmergencyNumber] = useState(''); 

  useEffect(() => {
    const fetchContacts = async () => {
      const { status } = await Contacts.requestPermissionsAsync();
      if (status === 'granted') {
        const { data } = await Contacts.getContactsAsync();
        if (data.length > 0) {
          const validContacts = data.filter(contact => contact.phoneNumbers && contact.phoneNumbers.length > 0);
          setContacts(validContacts);
          setFilteredContacts(validContacts); 
        }
      }
    };

    fetchContacts();
  }, []);

  useEffect(() => {
    const fetchEmergencyNumber = async () => {
      const savedEmergencyNumber = await AsyncStorage.getItem('emergencyNumber');
      if (savedEmergencyNumber) {
        setEmergencyNumber(savedEmergencyNumber);
      }
    };

    fetchEmergencyNumber();

    // Agregar un listener para cambios en el número de emergencia
    const interval = setInterval(fetchEmergencyNumber, 1000); // Revisa cada segundo (ajustable)

    return () => clearInterval(interval); // Limpia el interval al desmontar
  }, []);

  const cleanPhoneNumber = (number) => {
    return number.replace(/[^0-9]/g, '').slice(-10); 
  };

  const isEmergencyContact = (contactNumber) => {
    const cleanedContactNumber = cleanPhoneNumber(contactNumber);
    const cleanedEmergencyNumber = cleanPhoneNumber(emergencyNumber);
    return cleanedContactNumber === cleanedEmergencyNumber;
  };

  useEffect(() => {
    let filtered = contacts.filter(contact => {
      const contactName = contact.name ? contact.name.toLowerCase().trim() : ''; 
      const contactNumber = contact.phoneNumbers[0].number;

      return (
        contactName.includes(searchQuery.toLowerCase().trim()) || 
        cleanPhoneNumber(contactNumber).includes(cleanPhoneNumber(searchQuery))
      );
    });

    // Mueve el contacto de emergencia al principio
    const emergencyContactIndex = filtered.findIndex(contact => 
      isEmergencyContact(contact.phoneNumbers[0].number)
    );

    if (emergencyContactIndex > -1) {
      const [emergencyContact] = filtered.splice(emergencyContactIndex, 1);
      filtered = [emergencyContact, ...filtered];
    }

    setFilteredContacts(filtered);
  }, [searchQuery, contacts, emergencyNumber]);

  const renderItem = ({ item }) => {
    const phoneNumber = item.phoneNumbers && item.phoneNumbers.length > 0 ? item.phoneNumbers[0].number : 'Sin número';
    const isEmergency = isEmergencyContact(phoneNumber);

    return (
      <View style={[styles.item, isEmergency && styles.emergencyItem]}>
        <Text style={[styles.text, isEmergency && styles.emergencyText]}>
          {item.name} - {phoneNumber} {isEmergency && '(Contacto de Emergencia)'}
        </Text>
        {isEmergency && (
          <Ionicons name="checkmark-circle" size={24} color="green" />
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Buscar por nombre o número"
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      <FlatList
        data={filteredContacts}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  searchInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
  },
  item: {
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  emergencyItem: {
    backgroundColor: '#f8f8f8',
  },
  text: {
    fontSize: 18,
  },
  emergencyText: {
    color: 'red',
    fontWeight: 'bold',
  },
});

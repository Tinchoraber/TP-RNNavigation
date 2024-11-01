import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TextInput, Platform } from 'react-native';
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
      try {
        const { status } = await Contacts.requestPermissionsAsync();
        if (status === 'granted') {
          const { data } = await Contacts.getContactsAsync({
            fields: [Contacts.Fields.PhoneNumbers, Contacts.Fields.Name],
          });
          if (data.length > 0) {
            const validContacts = data.filter(contact => contact.phoneNumbers && contact.phoneNumbers.length > 0);
            setContacts(validContacts);
            setFilteredContacts(validContacts); 
          }
        }
      } catch (error) {
        console.error('Error al cargar contactos:', error);
      }
    };

    fetchContacts();
  }, []);

  useEffect(() => {
    const fetchEmergencyNumber = async () => {
      try {
        const savedEmergencyNumber = await AsyncStorage.getItem('emergencyNumber');
        if (savedEmergencyNumber) {
          setEmergencyNumber(savedEmergencyNumber);
        }
      } catch (error) {
        console.error('Error al cargar número de emergencia:', error);
      }
    };

    fetchEmergencyNumber();
    const interval = setInterval(fetchEmergencyNumber, 1000);
    return () => clearInterval(interval);
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
        placeholderTextColor="#999"
      />
      <FlatList
        data={filteredContacts}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        initialNumToRender={20}
        maxToRenderPerBatch={10}
        windowSize={10}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: Platform.select({ ios: 20, android: 16 }),
    backgroundColor: '#fff',
  },
  searchInput: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#ccc',
    padding: Platform.select({ ios: 12, android: 10 }),
    marginBottom: 20,
    borderRadius: 5,
    backgroundColor: Platform.select({ ios: '#f8f8f8', android: '#fff' }),
    fontSize: 16,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: Platform.select({ ios: 20, android: 16 }),
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#ccc',
  },
  emergencyItem: {
    backgroundColor: Platform.select({ ios: '#f8f8f8', android: '#f5f5f5' }),
  },
  text: {
    fontSize: Platform.select({ ios: 16, android: 14 }),
    flex: 1,
  },
  emergencyText: {
    color: 'red',
    fontWeight: 'bold',
  },
});

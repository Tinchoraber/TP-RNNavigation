import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';

export default function IntegrantesScreen({ route }) {
  const { integrantes } = route.params;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Integrantes del Equipo</Text>
        <View style={styles.integrantesContainer}>
          {integrantes.map((integrante, index) => (
            <Text key={index} style={styles.integranteText}>
              {integrante}
            </Text>
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#333',
  },
  integrantesContainer: {
    width: '100%',
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  integranteText: {
    fontSize: 18,
    marginVertical: 10,
    textAlign: 'center',
    color: '#444',
  },
});
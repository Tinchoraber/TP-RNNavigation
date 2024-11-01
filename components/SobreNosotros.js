import React from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import QRCode from 'react-native-qrcode-svg';

export default function SobreNosotros() {
  const teamData = {
    integrantes: [
      "Martin Raber",
      "Ilan Averbuch",
      "Franco Pasquale"
    ]
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.qrContainer}>
          <QRCode
            value={JSON.stringify(teamData)}
            size={250}
          />
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  qrContainer: {
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});
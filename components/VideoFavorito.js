import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Video, ResizeMode } from 'expo-av';

export default function VideoFavorito() {
  const [text, setText] = useState('');
  const [savedText, setSavedText] = useState('');
  const [videoUrl, setVideoUrl] = useState('');

  useEffect(() => {
    const loadText = async () => {
      const saved = await AsyncStorage.getItem('videoText');
      if (saved) {
        setSavedText(saved);
        setVideoUrl(saved);
      }
    };
    loadText();
  }, []);

  const saveText = async () => {
    if (!text.endsWith('.mp4') && !text.endsWith('.mov') && !text.endsWith('.m4v')) {
      Alert.alert(
        'URL no válida', 
        'Por favor, ingresa una URL directa de video (ejemplo: https://ejemplo.com/video.mp4)'
      );
      return;
    }
    
    await AsyncStorage.setItem('videoText', text);
    setSavedText(text);
    setVideoUrl(text);
    Alert.alert('¡Éxito!', 'URL guardada correctamente');
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={text}
        onChangeText={setText}
        placeholder="Ingresa la URL del video (formato .mp4, .mov, .m4v)"
      />
      <Button title="Guardar" onPress={saveText} />
      {videoUrl ? (
        <View style={styles.videoContainer}>
          <Video
            source={{ uri: videoUrl }}
            useNativeControls
            resizeMode={ResizeMode.CONTAIN}
            isLooping
            shouldPlay
            style={styles.video}
            onError={(error) => {
              Alert.alert('Error', 'No se pudo reproducir el video');
              console.log(error);
            }}
          />
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  input: {
    borderWidth: 1,
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
  },
  videoContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  video: {
    width: 300,
    height: 300,
  }
});
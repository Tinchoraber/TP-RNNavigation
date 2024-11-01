import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet, Alert, Platform, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Video, ResizeMode } from 'expo-av';

export default function VideoFavorito() {
  const [text, setText] = useState('');
  const [savedText, setSavedText] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const loadText = async () => {
      try {
        const saved = await AsyncStorage.getItem('videoText');
        if (saved) {
          setSavedText(saved);
          setVideoUrl(saved);
        }
      } catch (error) {
        console.error('Error al cargar el video:', error);
        Alert.alert('Error', 'No se pudo cargar el video guardado');
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
    
    setIsLoading(true);
    try {
      await AsyncStorage.setItem('videoText', text);
      setSavedText(text);
      setVideoUrl(text);
      Alert.alert('¡Éxito!', 'URL guardada correctamente');
    } catch (error) {
      Alert.alert('Error', 'No se pudo guardar la URL del video');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={text}
        onChangeText={setText}
        placeholder="Ingresa la URL del video (formato .mp4, .mov, .m4v)"
        placeholderTextColor="#999"
      />
      <Button 
        title={isLoading ? "Guardando..." : "Guardar"} 
        onPress={saveText}
        disabled={isLoading}
      />
      {isLoading && <ActivityIndicator style={styles.loader} />}
      {videoUrl ? (
        <View style={styles.videoContainer}>
          <Video
            source={{ uri: videoUrl }}
            useNativeControls
            resizeMode={ResizeMode.CONTAIN}
            isLooping
            shouldPlay={false}
            style={styles.video}
            onError={(error) => {
              Alert.alert('Error', 'No se pudo reproducir el video');
              console.error('Error de video:', error);
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
    padding: Platform.select({ ios: 20, android: 16 }),
    backgroundColor: '#fff',
  },
  input: {
    borderWidth: StyleSheet.hairlineWidth,
    padding: Platform.select({ ios: 12, android: 10 }),
    marginBottom: 20,
    borderRadius: 5,
    backgroundColor: Platform.select({ ios: '#f8f8f8', android: '#fff' }),
    fontSize: 16,
  },
  videoContainer: {
    marginTop: 20,
    alignItems: 'center',
    width: '100%',
    aspectRatio: 16/9,
  },
  video: {
    width: '100%',
    height: '100%',
  },
  loader: {
    marginTop: 20,
  }
});
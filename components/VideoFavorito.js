import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Video } from 'expo-av';

export default function VideoFavorito() {
  const [text, setText] = useState('');
  const [savedText, setSavedText] = useState('');
  const [videoUrl, setVideoUrl] = useState('');

  useEffect(() => {
    const loadText = async () => {
      const saved = await AsyncStorage.getItem('videoText');
      if (saved) {
        setSavedText(saved);
        setVideoUrl(saved);  // Assuming the URL is saved
      }
    };
    loadText();
  }, []);

  const saveText = async () => {
    await AsyncStorage.setItem('videoText', text);
    setSavedText(text);
    setVideoUrl(text);
    alert('Text saved!');
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={text}
        onChangeText={setText}
        placeholder="Enter video URL"
      />
      <Button title="Save" onPress={saveText} />
      {videoUrl ? (
        <Video
          source={{ uri: videoUrl }}
          rate={1.0}
          volume={1.0}
          isMuted={false}
          resizeMode="cover"
          shouldPlay
          style={{ width: 300, height: 300, marginTop: 20 }}
        />
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
});

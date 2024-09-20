import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import Clima from './components/Clima';
import CodigoQR from './components/CodigoQR';
import ConfiguracionNumEmergencia from './components/ConfiguracionNumEmergencia';
import Contactos from './components/Contactos';
import VideoFavorito from './components/VideoFavorito';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName;

            if (route.name === 'Clima') {
              iconName = 'cloud-outline';
            } else if (route.name === 'QR') {
              iconName = 'qr-code-outline';
            } else if (route.name === 'Emergencia') {
              iconName = 'call-outline';
            } else if (route.name === 'Contactos') {
              iconName = 'people-outline';
            } else if (route.name === 'Video') {
              iconName = 'play-circle-outline';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: 'tomato',
          inactiveTintColor: 'gray',
        }}
      >
        <Tab.Screen name="Clima" component={Clima} />
        <Tab.Screen name="QR" component={CodigoQR} />
        <Tab.Screen name="Emergencia" component={ConfiguracionNumEmergencia} />
        <Tab.Screen name="Contactos" component={Contactos} />
        <Tab.Screen name="Video" component={VideoFavorito} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

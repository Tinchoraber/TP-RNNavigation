import React from 'react';
import { Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import Clima from './components/Clima';
import CodigoQR from './components/CodigoQR';
import ConfiguracionNumEmergencia from './components/ConfiguracionNumEmergencia';
import Contactos from './components/Contactos';
import VideoFavorito from './components/VideoFavorito';
import SobreNosotros from './components/SobreNosotros';
import IntegrantesScreen from './components/IntegrantesScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function QRStackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: Platform.select({ ios: '#fff', android: '#f8f8f8' }),
          elevation: Platform.select({ ios: 0, android: 4 }),
          shadowOpacity: Platform.OS === 'ios' ? 0.2 : 0,
        },
        headerTintColor: '#333',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
      <Stack.Screen 
        name="ScanQR" 
        component={CodigoQR}
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="Integrantes" 
        component={IntegrantesScreen}
        options={{
          title: 'Integrantes del Equipo',
        }}
      />
    </Stack.Navigator>
  );
}

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
            } else if (route.name === 'Sobre Nosotros') {
              iconName = 'people-outline';
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray',
          tabBarStyle: {
            height: Platform.OS === 'ios' ? 88 : 60,
            paddingBottom: Platform.OS === 'ios' ? 30 : 10,
          },
          headerStyle: {
            height: Platform.OS === 'ios' ? 90 : 60,
            backgroundColor: Platform.select({ ios: '#fff', android: '#f8f8f8' }),
            elevation: Platform.select({ ios: 0, android: 4 }),
            shadowOpacity: Platform.OS === 'ios' ? 0.2 : 0,
          },
        })}>
        <Tab.Screen name="Clima" component={Clima} />
        <Tab.Screen name="QR" component={QRStackNavigator} />
        <Tab.Screen name="Emergencia" component={ConfiguracionNumEmergencia} />
        <Tab.Screen name="Contactos" component={Contactos} />
        <Tab.Screen name="Video" component={VideoFavorito} />
        <Tab.Screen name="Sobre Nosotros" component={SobreNosotros} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
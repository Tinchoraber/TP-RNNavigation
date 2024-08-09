import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { Button, TextInput, Text, View, StyleSheet, Image } from 'react-native';
import { NavigationContainer, useNavigation, useRoute } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';

// ScreenA1
function ScreenA1() {
  const navigation = useNavigation();
  return (
    <View style={styles.homeScreen}>
      <Text style={styles.titulo}>HOME</Text>
      <TextInput
        style={styles.input}
        placeholder='Ingresa lo que quieras'
      />
      <View style={styles.buttonContainer}>
        <Button
          title="Ir A Screen A2"
          onPress={() => navigation.navigate('ScreenA2')}
        />
      </View>
    </View>
  );
}

// ScreenA2
function ScreenA2() {
  const navigation = useNavigation();
  return (
    <View style={styles.homeScreen}>
      <Text style={styles.titulo}>Estas en la Screen A2</Text>
      <TextInput
        style={styles.input}
        placeholder='Ingresa lo que quieras'
      />
      <View style={styles.buttonContainer}>
        <Button
          title="Volver A Screen A1"
          onPress={() => navigation.navigate('ScreenA1')}
        />
      </View>
    </View>
  );
}

// ScreenB1
function ScreenB1() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const navigation = useNavigation();

  return (
    <View style={styles.homeScreen1}>
      <Text style={styles.titulo}>Estas en la Screen B1</Text>
      <TextInput
        style={styles.input}
        placeholder='Nombre'
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder='Telefono'
        value={phone}
        onChangeText={setPhone}
      />
      <View style={styles.buttonContainer}>
        <Button
          title="Ir A Screen B2"
          onPress={() => navigation.navigate('ScreenB2', { name, phone })}
        />
      </View>
    </View>
  );
}

// ScreenB2
function ScreenB2() {
  const route = useRoute();
  const { name, phone } = route.params || {};
  const navigation = useNavigation();

  return (
    <View style={styles.homeScreen1}>
      <Text style={styles.titulo}>Estas en la Screen B2</Text>
      <Text style={styles.item}>Nombre: {name || 'No se ha proporcionado nombre'}</Text>
      <Text>Telefono: {phone || 'No se ha proporcionado teléfono'}</Text>
      <View style={styles.buttonContainer}>
        <Button
          title="Volver A Screen B1"
          onPress={() => navigation.navigate('ScreenB1')}
        />
      </View>
    </View>
  );
}

// ScreenC1
function ScreenC1() {
  const navigation = useNavigation();
  return (
    <View style={styles.homeScreen2}>
      <Text style={styles.titulo}>Estas en la Screen C1</Text>
      <TextInput
        style={styles.input}
        placeholder='Ingresa lo que quieras'
      />
      <View style={styles.buttonContainer}>
        <Button
          title="Ir A Screen C2"
          onPress={() => navigation.navigate('ScreenC2')}
        />
      </View>
    </View>
  );
}

// ScreenC2
function ScreenC2() {
  const navigation = useNavigation();
  return (
    <View style={styles.homeScreen2}>
      <Text style={styles.titulo}>Estas en la Screen C2</Text>
      <Image
        style={styles.Logo}
        source={{
          uri: 'https://images.mlssoccer.com/image/private/t_editorial_landscape_8_desktop_mobile/prd-league/ipocdxrkbpszcnbd2hzg.jpg',
        }}
      />
      <TextInput
        style={styles.input}
        placeholder='Ingresa lo que quieras'
      />
      <View style={styles.buttonContainer}>
        <Button
          title="Volver A Screen C1"
          onPress={() => navigation.navigate('ScreenC1')}
        />
      </View>
    </View>
  );
}

// ScreenD1
function ScreenD1() {
  const navigation = useNavigation();
  return (
    <View style={styles.homeScreen3}>
      <Text style={styles.titulo}>Estas en la Screen D1</Text>
      <TextInput
        style={styles.input}
        placeholder='Ingresa lo que quieras'
      />
      <View style={styles.buttonContainer}>
        <Button
          title="Ir A Screen D2"
          onPress={() => navigation.navigate('ScreenD2')}
        />
      </View>
    </View>
  );
}

// ScreenD2
function ScreenD2() {
  const navigation = useNavigation();
  return (
    <View style={styles.homeScreen3}>
      <Text style={styles.titulo}>Estas en la Screen D2</Text>
      <Image
        style={styles.Logo}
        source={{
          uri: 'https://lncimg.lance.com.br/cdn-cgi/image/width=828,quality=75,fit=pad,format=webp/uploads/2022/11/24/637f97e102fad.jpeg',
        }}
      />
      <TextInput
        style={styles.input}
        placeholder='Ingresa lo que quieras'
      />
      <View style={styles.buttonContainer}>
        <Button
          title="Volver A Screen D1"
          onPress={() => navigation.navigate('ScreenD1')}
        />
      </View>
    </View>
  );
}

const StackA = createNativeStackNavigator();
const StackB = createNativeStackNavigator();
const StackC = createNativeStackNavigator();
const StackD = createNativeStackNavigator();

function StackANavigator() {
  return (
    <StackA.Navigator>
      <StackA.Screen name="ScreenA1" component={ScreenA1} />
      <StackA.Screen name="ScreenA2" component={ScreenA2} />
    </StackA.Navigator>
  );
}

function StackBNavigator() {
  return (
    <StackB.Navigator>
      <StackB.Screen name="ScreenB1" component={ScreenB1} />
      <StackB.Screen name="ScreenB2" component={ScreenB2} />
    </StackB.Navigator>
  );
}

function StackCNavigator() {
  return (
    <StackC.Navigator>
      <StackC.Screen name="ScreenC1" component={ScreenC1} />
      <StackC.Screen name="ScreenC2" component={ScreenC2} />
    </StackC.Navigator>
  );
}

function StackDNavigator() {
  return (
    <StackD.Navigator>
      <StackD.Screen name="ScreenD1" component={ScreenD1} />
      <StackD.Screen name="ScreenD2" component={ScreenD2} />
    </StackD.Navigator>
  );
}

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={StackANavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="home" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Home 2"
        component={StackBNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="home" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Home 3"
        component={StackCNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="home" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Home 4"
        component={StackDNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="home" size={24} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <MyTabs />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    marginTop: 'auto', // Push button to the bottom
  },
  input:{
    backgroundColor: '#fff',
    width: '80%',
    alignSelf: 'center',
    marginTop: 10,
   
  },
  homeScreen:{
    flex: 1, // Make the container take up the whole screen
    justifyContent: 'space-between', // Distribute space evenly
    backgroundColor: 'grey'
  },
  homeScreen1:{
    flex: 1, // Make the container take up the whole screen
    justifyContent: 'space-between', // Distribute space evenly
    backgroundColor: 'yellow'
  },
  homeScreen2:{
    flex: 1, // Make the container take up the whole screen
    justifyContent: 'space-between', // Distribute space evenly
    backgroundColor: 'green',
  },
  homeScreen3:{
    flex: 1, // Make the container take up the whole screen
    justifyContent: 'space-between', // Distribute space evenly
    backgroundColor: 'pink',
  },
  Logo: {
    width: 200,
    height: 150,
    alignSelf: 'center'
  },
  titulo:{
    fontSize: 20,
    alignSelf:'center',
    marginTop: 10
  }
})
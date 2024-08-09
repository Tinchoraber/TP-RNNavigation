import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { Button, TextInput, Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'react-native';
import { useState } from 'react';


function ScreenA1(){
  const navigation = useNavigation();
  return(
    <View>
      <Text>HOME</Text>
      <TextInput
       style={styles.input}/>
      <Button title="Ir A Screen A2" onPress={() => navigation.navigate('ScreenA2')} />
    </View>
  )
}

function ScreenA2(){
  const navigation = useNavigation();
  return(
    <View>
      <Text>Estas en la Screen A2</Text>
      <TextInput
      style={styles.input}/>
      <Button title="Volver A Screen A1" onPress={() => navigation.navigate('ScreenA1')} />
    </View>
  )
}
function ScreenB1(){
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const navigation = useNavigation();
  return(
    <View style={styles.homeScreen1}>
      <Text>Estas en la Screen B1</Text>
      <TextInput
      style={styles.input}
      placeholder='Nombre'
      value={name}
      onChangeText={setName}/>
      <TextInput
      style={styles.input}
      placeholder='Telefono'
      value={phone}
      onChangeText={setPhone}/>
      <Button title="Ir A Screen B2" onPress={(name, phone) => navigation.navigate('ScreenB2')} />
    </View>
  )
}

function ScreenB2({name, phone}){
  const navigation = useNavigation();
  return(
    <View style={styles.homeScreen1}>
      <Text>Estas en la Screen B2</Text>
      <Text style={styles.item}>Nombre: {name}</Text>
      <Text>Telefono: {phone}</Text>
      <TextInput
      style={styles.input}/>
      <Button title="Volver A Screen B1" onPress={() => navigation.navigate('ScreenB1')} />
    </View>
  )
}

function ScreenC1(){
  const navigation = useNavigation();
  return(
    <View style={styles.homeScreen2}>
      <Text>Estas en la Screen C1</Text>
      <TextInput
      style={styles.input}/>
      <Button title="Ir A Screen C2" onPress={() => navigation.navigate('ScreenC2')} />
    </View>
  )
}

function ScreenC2(){
  const navigation = useNavigation();
  return(
    <View style={styles.homeScreen2}>
      <Text>Estas en la Screen C2</Text>
      <Image style={styles.Logo}
        source={{
          uri: 'https://images.mlssoccer.com/image/private/t_editorial_landscape_8_desktop_mobile/prd-league/ipocdxrkbpszcnbd2hzg.jpg',
        }}
      />
      <TextInput
      style={styles.input}/>
      <Button title="Volver A Screen C1" onPress={() => navigation.navigate('ScreenC1')} /> 
    </View>
  )
}

function ScreenD1(){
  const navigation = useNavigation();
  return(
    <View style={styles.homeScreen3}>
      <Text>Estas en la Screen D1</Text>
      <TextInput
      style={styles.input}/>
      <Button title="Ir A Screen D2" onPress={() => navigation.navigate('ScreenD2')} />
    </View>
  )
}

function ScreenD2(){
  const navigation = useNavigation();
  return(
    <View style={styles.homeScreen3}>
      <Text>Estas en la Screen D2</Text>
      <Image style={styles.Logo}
        source={{
          uri: 'https://lncimg.lance.com.br/cdn-cgi/image/width=828,quality=75,fit=pad,format=webp/uploads/2022/11/24/637f97e102fad.jpeg',
        }}
      />
      <TextInput
      style={styles.input}/>
      <Button title="Volver A Screen D1" onPress={() => navigation.navigate('ScreenD1')} /> 
    </View>
  )
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
      <MyTabs/>
    </NavigationContainer>
  );
}


const styles = StyleSheet.create({
  input:{
    backgroundColor: '#fff',
    width: '80%',
    alignSelf: 'center',
    marginTop: 10,
   
  },
  homeScreen1:{
    backgroundColor: 'yellow'
  },
  homeScreen2:{
    backgroundColor: 'green',
  },
  homeScreen3:{
    backgroundColor: 'pink',
  },
  Logo: {
    width: 200,
    height: 150,
  },
  item:{
    color: 'black'
  }
});

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import SplashUmgScreen from './screens/SplashUmgScreen';
import SplashScreen from './screens/SplashScreen';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import PerfilScreen from './screens/PerfilScreen';
import ReportesScreen from './screens/ReportesScreen';
import AlmacenScreen from './screens/AlmacenScreen';
import ClientesScreen from './screens/ClientesScreen';
import RepartidoresScreen from './screens/RepartidoresScreen';
import VehiculosScreen from './screens/VehiculosScreen';
import CrearPedidoScreen from './screens/CrearPedidoScreen';
import ListaPedidosScreen from './screens/ListaPedidosScreen';




const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash1" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash1" component={SplashUmgScreen} />
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Perfil" component={PerfilScreen} />
        <Stack.Screen name="Reportes" component={ReportesScreen} />
        <Stack.Screen name="Almacen" component={AlmacenScreen} />
        <Stack.Screen name="Clientes" component={ClientesScreen} />
        <Stack.Screen name="Repartidores" component={RepartidoresScreen} />
         <Stack.Screen name="Vehiculos" component={VehiculosScreen} />
         <Stack.Screen name="CrearPedido" component={CrearPedidoScreen} />
         <Stack.Screen name="VerPedidos" component={ListaPedidosScreen} />
         
                 
        
      </Stack.Navigator>
    </NavigationContainer>
  );
}

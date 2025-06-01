import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Alert,
} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialIcons';
import * as Animatable from 'react-native-animatable';

const { width, height } = Dimensions.get('window');

export default function LoginScreen({ navigation }) {
  const [usuario, setUsuario] = useState('');
  const [password, setPassword] = useState('');
  const [mostrarPassword, setMostrarPassword] = useState(false); // estado para mostrar/ocultar contraseña

  const iniciarSesion = async () => {
    if (usuario === '' || password === '') {
      Alert.alert('Error', 'Por favor completa todos los campos.');
      return;
    }

    try {
      const response = await axios.post('http://192.168.0.3:8080/usuarios/iniciar-sesion', {
        id: Number(usuario),
        contraseña: password,
      });

      if (response.data === 'Sesión iniciada exitosamente.') {
        await AsyncStorage.setItem('usuario', usuario);
        navigation.replace('Home');
      } else {
        Alert.alert('Error', response.data);
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'No se pudo iniciar sesión.');
    }
  };

  return (
    <View style={styles.container}>
      {/* Burbujas decorativas animadas */}
      <View style={styles.bubble1} />
      <View style={styles.bubble2} />

      <Animatable.Text animation="fadeInDown" style={styles.hola}>
        Hola!
      </Animatable.Text>

      <Text style={styles.bienvenido}>Bienvenido</Text>

      {/* Campo de usuario con icono */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>User</Text>
        <View style={styles.inputWrapper}>
          <Icon name="person" size={20} color="#aaa" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="id"
            placeholderTextColor="#6CA0A6"
            value={usuario}
            onChangeText={setUsuario}
            keyboardType="numeric"
          />
        </View>
      </View>

      {/* Campo de contraseña con toggle de visibilidad */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Password</Text>
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            placeholder="************"
            placeholderTextColor="#6CA0A6"
            secureTextEntry={!mostrarPassword} // aquí cambia según estado
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity
            onPress={() => setMostrarPassword(!mostrarPassword)}
            style={{ padding: 4 }}
          >
            <Icon
              name={mostrarPassword ? 'visibility' : 'visibility-off'}
              size={20}
              color="#aaa"
            />
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity style={styles.button} onPress={iniciarSesion}>
        <Text style={styles.buttonText}>Log In</Text>
      </TouchableOpacity>

      {/* Logo con animación */}
      <Animatable.Image
        animation="bounceIn"
        duration={2000}
        source={require('../assets/LogoUMG.svg.png')}
        style={styles.logo}
        resizeMode="contain"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  hola: {
    fontSize: 22,
    color: '#1C7C91',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  bienvenido: {
    fontSize: 18,
    color: '#1C7C91',
    fontWeight: 'bold',
    marginBottom: 30,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    marginBottom: 5,
    color: '#333',
  },
  inputWrapper: {
    flexDirection: 'row',
    backgroundColor: '#E8FCFF',
    borderRadius: 12,
    paddingHorizontal: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#D9F3F8',
  },
  icon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 16,
    color: '#000',
  },
  button: {
    backgroundColor: '#1C7C91',
    paddingVertical: 14,
    paddingHorizontal: 50,
    borderRadius: 30,
    marginTop: 20,
    elevation: 2,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
  logo: {
    width: 120,
    height: 120,
    marginTop: 40,
  },
  bubble1: {
    position: 'absolute',
    width: 120,
    height: 120,
    backgroundColor: '#B3ECF2',
    borderRadius: 60,
    top: -40,
    left: -40,
    opacity: 0.4,
  },
  bubble2: {
    position: 'absolute',
    width: 80,
    height: 80,
    backgroundColor: '#D1F4FA',
    borderRadius: 40,
    top: height * 0.7,
    right: -30,
    opacity: 0.3,
  },
});

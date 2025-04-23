import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

export default function LoginScreen({ navigation }) {
  const [id, setId] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [mensaje, setMensaje] = useState('');

  const iniciarSesion = async () => {
    try {
      const response = await fetch('http://localhost:8080/usuarios/iniciar-sesion', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, contraseña }), // Enviamos los datos del usuario
      });
  
      const data = await response.text(); // Obtenemos el mensaje de la respuesta
  
      // Verificamos si el mensaje es el esperado para un inicio de sesión exitoso
      if (response.ok && data === "Sesión iniciada exitosamente.") {
        navigation.navigate('Profile'); // Si el inicio de sesión es exitoso, navegamos al perfil
      } else {
        setMensaje(data); // Si no es exitoso, mostramos el mensaje de error (ej. "Credenciales incorrectas")
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      setMensaje('Error al conectar con la API.'); // Mensaje de error si hay un problema con la conexión
    }
  };
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Iniciar Sesión</Text>
      <TextInput
        style={styles.input}
        placeholder="ID"
        keyboardType="numeric"
        onChangeText={setId}
        value={id}
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        secureTextEntry
        onChangeText={setContraseña}
        value={contraseña}
      />
      <Button title="Iniciar Sesión" onPress={iniciarSesion} />
      {mensaje && <Text style={styles.mensaje}>{mensaje}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    marginBottom: 24,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    marginBottom: 16,
    borderRadius: 8,
  },
  mensaje: {
    marginTop: 16,
    fontSize: 16,
    color: 'green',
    textAlign: 'center',
  },
});

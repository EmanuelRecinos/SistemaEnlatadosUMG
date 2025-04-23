import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function ProfileScreen({ navigation }) {  // Recibimos `navigation` aquí
  const [perfil, setPerfil] = useState(null);

  const obtenerPerfil = async () => {
    try {
      const response = await fetch('http://localhost:8080/usuarios/perfil');
      const data = await response.text();
      setPerfil(data);
    } catch (error) {
      console.error('Error al obtener perfil:', error);
    }
  };

  // Función para cerrar sesión
  const cerrarSesion = async () => {
    try {
      const response = await fetch('http://localhost:8080/usuarios/cerrar-sesion', {
        method: 'POST',
      });

      const data = await response.text();
      console.log('Respuesta:', data);
      
      if (data === "Sesión cerrada exitosamente.") {
        // Navegar a la pantalla de inicio de sesión después de cerrar sesión
        navigation.navigate('Login'); // Redirigimos al Login
      } else {
        alert('No hay sesión activa');
      }
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  useEffect(() => {
    obtenerPerfil();
  }, []);

  return (
    <View style={styles.container}>
      {perfil ? (
        <Text>{perfil}</Text>
      ) : (
        <Text>Cargando perfil...</Text>
      )}
      {/* Botón para cerrar sesión */}
      <Button title="Cerrar Sesión" onPress={cerrarSesion} />
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
});

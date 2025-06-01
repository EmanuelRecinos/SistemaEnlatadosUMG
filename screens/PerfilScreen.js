import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';

export default function ProfileScreen({ navigation }) {
  const [perfil, setPerfil] = useState(null);

  const obtenerPerfil = async () => {
    try {
      const response = await fetch('http://192.168.0.3:8080/usuarios/perfil');
      const data = await response.text();
      setPerfil(data);
    } catch (error) {
      console.error('Error al obtener perfil:', error);
    }
  };

  const cerrarSesion = async () => {
    try {
      const response = await fetch('http://192.168.0.3:8080/usuarios/cerrar-sesion', {
        method: 'POST',
      });
      const data = await response.text();
      if (data === "Sesión cerrada exitosamente.") {
        navigation.navigate('Login');
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
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>

        {/* Header con foto en círculo */}
        <View style={styles.headerContainer}>
          <Image
            source={require('../assets/MiFoto.png')}
            style={styles.profileImage}
          />
          <Text style={styles.profileName}>
            {perfil ? perfil : 'Cargando perfil...'}
          </Text>
        </View>

        {/* Botón cerrar sesión */}
        <TouchableOpacity style={styles.logoutButton} onPress={cerrarSesion} activeOpacity={0.85}>
          <Text style={styles.logoutButtonText}>Cerrar Sesión</Text>
        </TouchableOpacity>

      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    paddingHorizontal: 22,
    paddingVertical: 40,
    alignItems: 'center',
    backgroundColor: '#fff',
    marginTop: 50,
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 50,
  },
  profileImage: {
    width: 130,
    height: 130,
    borderRadius: 65,
    borderWidth: 3,
    borderColor: '#0583B5',
    resizeMode: 'cover',
    marginBottom: 20,
    shadowColor: '#1C7C91',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 6,
  },
  profileName: {
    fontSize: 22,
    fontWeight: '600',
    color: '#1C7C91',
    fontStyle: 'italic',
    textAlign: 'center',
  },
  logoutButton: {
    backgroundColor: '#1C7C91',
    paddingVertical: 15,
    paddingHorizontal: 60,
    borderRadius: 30,
    shadowColor: '#1C7C91',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 6,
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});

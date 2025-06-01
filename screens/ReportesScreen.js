import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, Dimensions } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

const screenWidth = Dimensions.get('window').width;

export default function ReportesScreen() {
  const [timestamp, setTimestamp] = useState(Date.now());

  // 🔁 Refresca al enfocar la pantalla
  useFocusEffect(
    useCallback(() => {
      setTimestamp(Date.now());
    }, [])
  );

  // ⏱️ Refresca cada 100 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      setTimestamp(Date.now());
    }, 100000);
    return () => clearInterval(interval);
  }, []);

  // 🔗 Rutas con timestamp para forzar recarga sin caché
  const endpoints = {
    usuarios: `http://192.168.0.3:8080/reporte_usuarios.png?t=${timestamp}`,
    almacen: `http://192.168.0.3:8080/api/almacen/imagen?t=${timestamp}`,
    clientes: `http://192.168.0.3:8080/clientes/reporte?t=${timestamp}`,
    repartidores: `http://192.168.0.3:8080/repartidores/reporte?t=${timestamp}`,
    vehiculos: `http://192.168.0.3:8080/vehiculos/reporte?t=${timestamp}`, 
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <Text style={styles.headerTitle}>Reportes</Text>

      {Object.entries(endpoints).map(([key, uri]) => (
        <View key={key} style={styles.card}>
          <Text style={styles.cardTitle}>{capitalizar(key)}</Text>
          <Image
            source={{ uri }}
            style={styles.imagenReporte}
            resizeMode="contain"
          />
        </View>
      ))}
    </ScrollView>
  );
}

// 🧠 Capitaliza el primer caracter
const capitalizar = (texto) => texto.charAt(0).toUpperCase() + texto.slice(1);

const styles = StyleSheet.create({
  scrollContainer: {
    paddingVertical: 30,
    paddingHorizontal: 20,
    backgroundColor: '#F6F8FA',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1C7C91',
    marginBottom: 20,
    marginTop: 20,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    width: screenWidth * 0.9,
    padding: 20,
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 15,
    color: '#007EA7',
  },
  imagenReporte: {
    width: '100%',
    height: 400,
    borderRadius: 10,
  },
});

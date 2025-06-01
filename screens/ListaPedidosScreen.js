import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import axios from 'axios';

const API_URL = 'http://192.168.0.3:8080/api/pedidos';

const VerPedidos = () => {
  const [pedidos, setPedidos] = useState([]);

  const obtenerPedidos = async () => {
    try {
      const response = await axios.get(API_URL);
      setPedidos(response.data);
    } catch (error) {
      console.error('Error al obtener pedidos:', error);
    }
  };

  const completarPedido = async (id) => {
    try {
      const response = await axios.put(`${API_URL}/${id}`);
      Alert.alert('Éxito', response.data);
      obtenerPedidos();
    } catch (error) {
      console.error('Error al completar pedido:', error);
      Alert.alert('Error', 'No se pudo completar el pedido.');
    }
  };

  useEffect(() => {
    obtenerPedidos();
  }, []);

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 24 }}>
      {pedidos.map((pedido) => (
        <View key={pedido.numeroPedido} style={styles.card}>
          <View style={styles.header}>
            <Text style={styles.title}>Pedido No. {pedido.numeroPedido}</Text>
            <Text style={[styles.estado, pedido.estado?.toLowerCase() === 'completado' ? styles.completado : styles.pendiente]}>
              {pedido.estado?.toLowerCase() === 'completado' ? '✅ Completado' : '⏳ Pendiente'}
            </Text>
          </View>

          <Text style={styles.text}>
            <Text style={styles.label}>Fecha y hora: </Text>
            {pedido.fechaHoraInicio
              ? new Date(pedido.fechaHoraInicio).toLocaleString()
              : 'No disponible'}
          </Text>

          <Text style={styles.text}>
            <Text style={styles.label}>Origen: </Text>{pedido.departamentoOrigen}
          </Text>

          <Text style={styles.text}>
            <Text style={styles.label}>Destino: </Text>{pedido.departamentoDestino}
          </Text>

          <Text style={styles.text}>
            <Text style={styles.label}>Cliente: </Text>{pedido.cliente?.nombre || 'No disponible'}
          </Text>

          <Text style={styles.text}>
            <Text style={styles.label}>Cantidad de cajas: </Text>{pedido.cajas?.length || 0}
          </Text>

          <Text style={styles.text}>
            <Text style={styles.label}>Repartidor: </Text>{pedido.repartidor?.nombre || 'No disponible'}
          </Text>

          <Text style={styles.text}>
            <Text style={styles.label}>Vehículo: </Text>{pedido.vehiculo?.placa || 'No disponible'}
          </Text>

          {pedido.estado?.toLowerCase() !== 'completado' && (
            <TouchableOpacity
              style={styles.boton}
              onPress={() => completarPedido(pedido.numeroPedido)}
              activeOpacity={0.8}
            >
              <Text style={styles.botonTexto}>Marcar como Completado</Text>
            </TouchableOpacity>
          )}
        </View>
      ))}
    </ScrollView>
  );
};

export default VerPedidos;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F9FC',
    paddingHorizontal: 16,
    paddingTop: 50,
  },
  card: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 14,
    marginBottom: 16,
    // Shadow para iOS
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    // Elevation para Android
    elevation: 4,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#0D3B66',
  },
  estado: {
    fontWeight: '600',
    fontSize: 14,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    overflow: 'hidden',
    textAlign: 'center',
  },
  completado: {
    backgroundColor: '#D4EDDA',
    color: '#155724',
  },
  pendiente: {
    backgroundColor: '#FFF3CD',
    color: '#856404',
  },
  text: {
    fontSize: 15,
    marginBottom: 6,
    color: '#333',
    lineHeight: 22,
  },
  label: {
    fontWeight: '600',
    color: '#555',
  },
  boton: {
    marginTop: 16,
    backgroundColor: '#117A65',
    paddingVertical: 12,
    borderRadius: 10,
    shadowColor: '#117A65',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.4,
    shadowRadius: 5,
    elevation: 5,
  },
  botonTexto: {
    color: 'white',
    textAlign: 'center',
    fontWeight: '700',
    fontSize: 16,
  },
});

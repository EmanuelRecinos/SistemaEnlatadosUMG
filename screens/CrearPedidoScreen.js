import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, Alert, ScrollView, StyleSheet, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { Picker } from '@react-native-picker/picker';

export default function CrearPedido({ navigation }) {
  const [origen, setOrigen] = useState('');
  const [destino, setDestino] = useState('');
  const [cajas, setCajas] = useState('');
  const [clientes, setClientes] = useState([]);
  const [clienteSeleccionado, setClienteSeleccionado] = useState(null);
  const [cargando, setCargando] = useState(false);

  useEffect(() => {
    const obtenerClientes = async () => {
      try {
        const response = await axios.get('http://192.168.0.3:8080/clientes/todos');
        setClientes(response.data);
      } catch (error) {
        Alert.alert('Error', 'No se pudieron cargar los clientes');
      }
    };

    obtenerClientes();
  }, []);

  const crearPedido = async () => {
    if (!origen || !destino || !cajas || !clienteSeleccionado) {
      Alert.alert('Campos incompletos', 'Por favor llena todos los campos');
      return;
    }

    setCargando(true);

    try {
      const response = await axios.post('http://192.168.0.3:8080/api/pedidos', {
        departamentoOrigen: origen,
        departamentoDestino: destino,
        cantidadCajas: parseInt(cajas),
        cuiCliente: clienteSeleccionado
      });

      Alert.alert('Éxito', `Pedido #${response.data.numeroPedido} creado exitosamente`);
      navigation.goBack();
    } catch (error) {
      Alert.alert('Error al crear pedido', error.response?.data || 'Error desconocido');
    } finally {
      setCargando(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
      
      <Text style={styles.label}>Departamento de Origen</Text>
      <TextInput
        style={styles.input}
        value={origen}
        onChangeText={setOrigen}
        placeholder="Ej. Guatemala"
        placeholderTextColor="#999"
      />

      <Text style={styles.label}>Departamento de Destino</Text>
      <TextInput
        style={styles.input}
        value={destino}
        onChangeText={setDestino}
        placeholder="Ej. Quetzaltenango"
        placeholderTextColor="#999"
      />

      <Text style={styles.label}>Cantidad de Cajas</Text>
      <TextInput
        style={styles.input}
        value={cajas}
        onChangeText={setCajas}
        keyboardType="numeric"
        placeholder="Ej. 5"
        placeholderTextColor="#999"
      />

      <Text style={styles.label}>Cliente</Text>
      <View style={styles.pickerWrapper}>
        <Picker
          selectedValue={clienteSeleccionado}
          onValueChange={setClienteSeleccionado}
          style={styles.picker}
          dropdownIconColor="#1C7C91"
        >
          <Picker.Item label="Seleccione un cliente" value={null} />
          {clientes.map(cliente => (
            <Picker.Item
              key={cliente.cui}
              label={`${cliente.nombre} ${cliente.apellido}`}
              value={cliente.cui}
            />
          ))}
        </Picker>
      </View>

      {cargando ? (
        <ActivityIndicator size="large" color="#1C7C91" style={{ marginTop: 24 }} />
      ) : (
        <View style={styles.buttonContainer}>
          <Button title="Crear Pedido" onPress={crearPedido} color="#1C7C91" />
        </View>
      )}

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 35,
    paddingBottom: 40,
    backgroundColor: '#F7F9FC',
  },
  label: {
    fontWeight: '700',
    fontSize: 16,
    color: '#0D3B66',
    marginBottom: 8,
    marginTop: 16,
  },
  input: {
    backgroundColor: 'white',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 15,
    color: '#333',
    borderWidth: 1,
    borderColor: '#CBD5E1',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  pickerWrapper: {
    backgroundColor: 'white',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#CBD5E1',
    overflow: 'hidden',
    elevation: 2,
  },
  picker: {
    height: 50,
    color: '#333',
  },
  buttonContainer: {
    marginTop: 30,
    borderRadius: 12,
    overflow: 'hidden', // para que el botón respete el borde redondeado
    shadowColor: '#1C7C91',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },
});

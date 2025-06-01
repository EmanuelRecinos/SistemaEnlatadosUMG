import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  FlatList,
  Alert,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import axios from 'axios';

export default function AlmacenScreen() {
  const [cajas, setCajas] = useState([]);
  const [cantidadInicial, setCantidadInicial] = useState('');
  const [cargandoAgregar, setCargandoAgregar] = useState(false);
  const [cargandoRetiro, setCargandoRetiro] = useState(false);
  const [cargandoInicial, setCargandoInicial] = useState(false);

  const cargando = cargandoAgregar || cargandoRetiro || cargandoInicial;

  const cargarCajas = async () => {
    try {
      const response = await axios.get('http://192.168.0.3:8080/api/almacen/listar');
      setCajas(response.data);
    } catch (error) {
      Alert.alert('Error', 'No se pudo cargar la lista de cajas');
    }
  };

  const agregarCaja = async () => {
    try {
      setCargandoAgregar(true);
      await axios.post('http://192.168.0.3:8080/api/almacen/agregar');
      await cargarCajas();
    } catch {
      Alert.alert('Error', 'No se pudo agregar la caja');
    } finally {
      setCargandoAgregar(false);
    }
  };

  const retirarCaja = async () => {
    try {
      setCargandoRetiro(true);
      const response = await axios.post('http://192.168.0.3:8080/api/almacen/retirar');
      if (response.status === 200) {
        await cargarCajas();
        Alert.alert('Caja retirada', `Correlativo: ${response.data.correlativo}`);
      } else {
        Alert.alert('No hay cajas', 'El almacén está vacío.');
      }
    } catch {
      Alert.alert('Error', 'No se pudo retirar la caja');
    } finally {
      setCargandoRetiro(false);
    }
  };

  const cargarInicial = async () => {
    try {
      setCargandoInicial(true);
      await axios.post(`http://192.168.0.3:8080/api/almacen/cargar-inicial?cantidad=${cantidadInicial}`);
      setCantidadInicial('');
      await cargarCajas();
    } catch {
      Alert.alert('Error', 'No se pudo cargar cajas');
    } finally {
      setCargandoInicial(false);
    }
  };

  useEffect(() => {
    cargarCajas();
  }, []);

  const renderHeader = () => (
    <>
      <Text style={styles.title}>Gestión del Almacén</Text>

      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          placeholder="Cantidad inicial"
          placeholderTextColor="#999"
          keyboardType="numeric"
          value={cantidadInicial}
          onChangeText={setCantidadInicial}
          editable={!cargando}
        />
        <TouchableOpacity
          style={[styles.loadButton, cargandoInicial && styles.disabledButton]}
          onPress={cargarInicial}
          disabled={cargando}
        >
          {cargandoInicial ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Cargar</Text>
          )}
        </TouchableOpacity>
      </View>
    </>
  );

  const renderFooter = () => (
    <View style={{ marginTop: 20, alignItems: 'center' }}>
      {/* Muestra "Cargando..." si se está agregando o retirando */}
      {(cargandoAgregar || cargandoRetiro) && !cargandoInicial && (
        <Text style={styles.loadingText}>Cargando...</Text>
      )}

      <TouchableOpacity
        style={[styles.primaryButton, cargando && styles.disabledButton]}
        onPress={agregarCaja}
        disabled={cargando}
      >
        <Text style={styles.buttonText}>Agregar Caja</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.secondaryButton, cargando && styles.disabledButton]}
        onPress={retirarCaja}
        disabled={cargando}
      >
        <Text style={styles.buttonText}>Retirar Caja</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <FlatList
          contentContainerStyle={styles.container}
          data={cajas}
          keyExtractor={(item) => item.correlativo.toString()}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.cardTitle}>Caja #{item.correlativo}</Text>
              <Text style={styles.cardSubtitle}>{item.fechaIngreso}</Text>
            </View>
          )}
          ListEmptyComponent={<Text style={styles.empty}>No hay cajas disponibles</Text>}
          ListHeaderComponent={renderHeader}
          ListFooterComponent={renderFooter}
          keyboardShouldPersistTaps="handled"
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  flex: {
    flex: 1,
  },
  container: {
    paddingHorizontal: 20,
    paddingVertical: 60,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#1C7C91',
    marginBottom: 30,
    
  },
  empty: {
    textAlign: 'center',
    color: '#999',
    fontStyle: 'italic',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#E0F7FA',
    padding: 14,
    borderRadius: 12,
    marginBottom: 10,
    borderLeftWidth: 4,
    borderLeftColor: '#1C7C91',
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1C7C91',
  },
  cardSubtitle: {
    fontSize: 13,
    color: '#555',
    marginTop: 4,
  },
  inputRow: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  input: {
    flex: 1,
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#1C7C91',
    borderRadius: 10,
    paddingHorizontal: 14,
    height: 44,
    color: '#333',
    marginRight: 10,
  },
  loadButton: {
    backgroundColor: '#1C7C91',
    borderRadius: 10,
    paddingHorizontal: 16,
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: 80,
    height: 44,
  },
  primaryButton: {
    backgroundColor: '#1C7C91',
    paddingVertical: 14,
    borderRadius: 24,
    alignItems: 'center',
    marginBottom: 12,
    width: '100%',
  },
  secondaryButton: {
    backgroundColor: '#0583B5',
    paddingVertical: 14,
    borderRadius: 24,
    alignItems: 'center',
    width: '100%',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 15,
  },
  loadingText: {
    marginBottom: 10,
    fontSize: 16,
    color: '#1C7C91',
    fontWeight: '500',
  },
  disabledButton: {
    opacity: 0.6,
  },
});

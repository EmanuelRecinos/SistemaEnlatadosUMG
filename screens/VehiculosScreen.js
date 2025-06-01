import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from 'react-native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

const API_URL = 'http://192.168.0.3:8080/vehiculos';

const VehiculosScreen = () => {
  const insets = useSafeAreaInsets();

  const [vehiculos, setVehiculos] = useState([]);
  const [form, setForm] = useState({ placa: '', marca: '', modelo: '', color: '', anio: '' });
  const [modoEdicion, setModoEdicion] = useState(false);

  const cargarVehiculos = async () => {
    try {
      const res = await axios.get(`${API_URL}/todos`);
      setVehiculos(res.data);
    } catch (error) {
      Alert.alert('Error', 'No se pudieron cargar los vehículos');
    }
  };

  useEffect(() => {
    cargarVehiculos();
  }, []);

  const handleCrear = async () => {
    try {
      await axios.post(`${API_URL}/agregar`, form);
      Alert.alert('Éxito', 'Vehículo creado');
      cargarVehiculos();
      limpiarFormulario();
    } catch (error) {
      Alert.alert('Error', 'Error al crear vehículo');
    }
  };

  const handleModificar = async () => {
    try {
      await axios.put(`${API_URL}/actualizar/${form.placa}`, form);
      Alert.alert('Éxito', 'Vehículo modificado');
      cargarVehiculos();
      limpiarFormulario();
      setModoEdicion(false);
    } catch (error) {
      Alert.alert('Error', 'Error al modificar vehículo');
    }
  };

  const handleEliminar = async (placa) => {
    try {
      await axios.delete(`${API_URL}/eliminar/${placa}`);
      Alert.alert('Éxito', 'Vehículo eliminado');
      cargarVehiculos();
    } catch (error) {
      Alert.alert('Error', 'Error al eliminar vehículo');
    }
  };

  const handleSeleccionar = (vehiculo) => {
    setForm(vehiculo);
    setModoEdicion(true);
  };

  const limpiarFormulario = () => {
    setForm({ placa: '', marca: '', modelo: '', color: '', anio: '' });
  };

  const renderInput = (iconName, placeholder, value, onChangeText, keyboardType = 'default') => (
    <View style={styles.inputContainer}>
      <Icon name={iconName} size={20} color="#0583B5" style={styles.inputIcon} />
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
      />
    </View>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#ffffff' }} edges={['top', 'bottom']}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
      >
        <FlatList
          ListHeaderComponent={
            <View style={styles.container}>
              <Text style={styles.title}>Gestión de Vehículos</Text>

              {renderInput('confirmation-number', 'Placa', form.placa, (text) => setForm({ ...form, placa: text }))}
              {renderInput('directions-car', 'Marca', form.marca, (text) => setForm({ ...form, marca: text }))}
              {renderInput('style', 'Modelo', form.modelo, (text) => setForm({ ...form, modelo: text }))}
              {renderInput('palette', 'Color', form.color, (text) => setForm({ ...form, color: text }))}
              {renderInput('event', 'Año', form.anio, (text) => setForm({ ...form, anio: text }), 'numeric')}

              <View style={styles.buttonRow}>
                {modoEdicion ? (
                  <>
                    <TouchableOpacity style={styles.button} onPress={handleModificar}>
                      <Text style={styles.buttonText}>Modificar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.button, { backgroundColor: '#aaa' }]}
                      onPress={() => {
                        limpiarFormulario();
                        setModoEdicion(false);
                      }}
                    >
                      <Text style={styles.buttonText}>Cancelar</Text>
                    </TouchableOpacity>
                  </>
                ) : (
                  <TouchableOpacity style={styles.button} onPress={handleCrear}>
                    <Text style={styles.buttonText}>Crear</Text>
                  </TouchableOpacity>
                )}
              </View>

              <Text style={styles.subtitle}>Lista de Vehículos</Text>
            </View>
          }
          data={vehiculos}
          keyExtractor={(item) => item.placa}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <Text style={styles.itemText}>
                {item.placa} - {item.marca} {item.modelo} - {item.color} - {item.anio}
              </Text>
              <View style={styles.itemButtons}>
                <TouchableOpacity style={styles.button} onPress={() => handleSeleccionar(item)}>
                  <Text style={styles.buttonText}>Editar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.button, { backgroundColor: '#B50505' }]}
                  onPress={() => handleEliminar(item.placa)}
                >
                  <Text style={styles.buttonText}>Eliminar</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
          contentContainerStyle={{ paddingBottom: 20 + insets.bottom, paddingHorizontal: 16 }}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default VehiculosScreen;

const styles = StyleSheet.create({
  container: {
    paddingTop: 16,
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1C7C91',
    marginBottom: 10,
    textAlign: 'center',
    marginTop: 20,
  },
  subtitle: {
    fontSize: 18,
    color: '#1C7C91',
    marginTop: 20,
    marginBottom: 5,
    fontWeight: 'bold',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#1C7C91',
    backgroundColor: 'white',
    paddingHorizontal: 10,
    marginVertical: 5,
    borderRadius: 20,
  },
  inputIcon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    paddingVertical: 10,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  button: {
    flex: 1,
    backgroundColor: '#1C7C91',
    padding: 10,
    marginHorizontal: 5,
    borderRadius: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  item: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 20,
    marginVertical: 5,
    borderColor: '#0583B5',
    borderWidth: 1,
  },
  itemText: {
    fontSize: 16,
    color: '#333',
  },
  itemButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
});

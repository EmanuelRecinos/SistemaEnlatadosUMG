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

const API_URL = 'http://192.168.0.3:8080/clientes';

const ClientesScreen = () => {
  const insets = useSafeAreaInsets();

  const [clientes, setClientes] = useState([]);
  const [form, setForm] = useState({
    cui: '',
    nombre: '',
    apellido: '',
    telefono: '',
    direccion: '',
  });
  const [modoEdicion, setModoEdicion] = useState(false);

  const cargarClientes = async () => {
    try {
      const res = await axios.get(`${API_URL}/todos`);
      setClientes(res.data);
    } catch (error) {
      Alert.alert('Error', 'No se pudieron cargar los clientes');
    }
  };

  useEffect(() => {
    cargarClientes();
  }, []);

  const handleCrear = async () => {
    try {
      await axios.post(`${API_URL}/agregar`, form);
      Alert.alert('Éxito', 'Cliente creado');
      cargarClientes();
      limpiarFormulario();
    } catch (error) {
      Alert.alert('Error', 'Error al crear cliente');
    }
  };

  const handleModificar = async () => {
    try {
      await axios.put(`${API_URL}/actualizar/${form.cui}`, form);
      Alert.alert('Éxito', 'Cliente modificado');
      cargarClientes();
      limpiarFormulario();
      setModoEdicion(false);
    } catch (error) {
      Alert.alert('Error', 'Error al modificar cliente');
    }
  };

  const handleEliminar = async (cui) => {
    try {
      await axios.delete(`${API_URL}/eliminar/${cui}`);
      Alert.alert('Éxito', 'Cliente eliminado');
      cargarClientes();
    } catch (error) {
      Alert.alert('Error', 'Error al eliminar cliente');
    }
  };

  const handleSeleccionar = (cliente) => {
    setForm(cliente);
    setModoEdicion(true);
  };

  const limpiarFormulario = () => {
    setForm({
      cui: '',
      nombre: '',
      apellido: '',
      telefono: '',
      direccion: '',
    });
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
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }}>
        <FlatList
          ListHeaderComponent={
            <View style={styles.container}>
              <Text style={styles.title}>Gestión de Clientes</Text>

              {renderInput('badge', 'CUI', form.cui.toString(), (text) => setForm({ ...form, cui: text }), 'numeric')}
              {renderInput('person', 'Nombre', form.nombre, (text) => setForm({ ...form, nombre: text }))}
              {renderInput('people', 'Apellido', form.apellido, (text) => setForm({ ...form, apellido: text }))}
              {renderInput('call', 'Teléfono', form.telefono, (text) => setForm({ ...form, telefono: text }))}
              {renderInput('home', 'Dirección', form.direccion, (text) => setForm({ ...form, direccion: text }))}

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

              <Text style={styles.subtitle}>Lista de Clientes</Text>
            </View>
          }
          data={clientes}
          keyExtractor={(item) => item.cui.toString()}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <Text style={styles.itemText}>
                {item.nombre} {item.apellido} - Tel: {item.telefono} - Dirección: {item.direccion}
              </Text>
              <View style={styles.itemButtons}>
                <TouchableOpacity style={styles.button} onPress={() => handleSeleccionar(item)}>
                  <Text style={styles.buttonText}>Editar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button, { backgroundColor: '#B50505' }]} onPress={() => handleEliminar(item.cui)}>
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

export default ClientesScreen;

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

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

const API_URL = 'http://192.168.0.3:8080/repartidores';

const RepartidoresScreen = () => {
  const insets = useSafeAreaInsets();

  const [repartidores, setRepartidores] = useState([]);
  const [form, setForm] = useState({
    cui: '',
    nombre: '',
    apellidos: '',
    licencia: '',
    telefono: '',
  });
  const [modoEdicion, setModoEdicion] = useState(false);

  const cargarRepartidores = async () => {
    try {
      const res = await axios.get(`${API_URL}/todos`);
      setRepartidores(res.data);
    } catch (error) {
      Alert.alert('Error', 'No se pudieron cargar los repartidores');
    }
  };

  useEffect(() => {
    cargarRepartidores();
  }, []);

  const handleCrear = async () => {
    try {
      await axios.post(`${API_URL}/agregar`, form);
      Alert.alert('Éxito', 'Repartidor creado');
      cargarRepartidores();
      limpiarFormulario();
    } catch (error) {
      Alert.alert('Error', 'Error al crear repartidor');
    }
  };

  const handleModificar = async () => {
    try {
      await axios.put(`${API_URL}/actualizar/${form.cui}`, form);
      Alert.alert('Éxito', 'Repartidor modificado');
      cargarRepartidores();
      limpiarFormulario();
      setModoEdicion(false);
    } catch (error) {
      Alert.alert('Error', 'Error al modificar repartidor');
    }
  };

  const handleEliminar = async (cui) => {
    try {
      await axios.delete(`${API_URL}/eliminar/${cui}`);
      Alert.alert('Éxito', 'Repartidor eliminado');
      cargarRepartidores();
    } catch (error) {
      Alert.alert('Error', 'Error al eliminar repartidor');
    }
  };

  const handleSeleccionar = (repartidor) => {
    setForm(repartidor);
    setModoEdicion(true);
  };

  const limpiarFormulario = () => {
    setForm({
      cui: '',
      nombre: '',
      apellidos: '',
      licencia: '',
      telefono: '',
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
              <Text style={styles.title}>Gestión de Repartidores</Text>

              {renderInput('badge', 'CUI', form.cui.toString(), (text) => setForm({ ...form, cui: text }), 'numeric')}
              {renderInput('person', 'Nombre', form.nombre, (text) => setForm({ ...form, nombre: text }))}
              {renderInput('people', 'Apellidos', form.apellidos, (text) => setForm({ ...form, apellidos: text }))}
              {renderInput('local-shipping', 'Licencia (A, B, C)', form.licencia, (text) => setForm({ ...form, licencia: text }))}
              {renderInput('call', 'Teléfono', form.telefono, (text) => setForm({ ...form, telefono: text }))}

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

              <Text style={styles.subtitle}>Lista de Repartidores</Text>
            </View>
          }
          data={repartidores}
          keyExtractor={(item) => item.cui.toString()}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <Text style={styles.itemText}>
                {item.nombre} {item.apellidos} - Licencia: {item.licencia} - Tel: {item.telefono}
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

export default RepartidoresScreen;

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

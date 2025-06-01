import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function HomeScreen({ navigation }) {
  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>

        {/* Header */}
        <View style={styles.headerContainer}>
          <Text style={styles.title}>
            Enlatados
            <Text style={styles.titleUMG}>UMG</Text>
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Perfil')} style={styles.profileButton}>
            <Image
              source={require('../assets/MiFoto.png')}
              style={styles.profileImage}
            />
          </TouchableOpacity>
        </View>

        {/* Botón Reportes */}
        <TouchableOpacity
          style={styles.reportButton}
          onPress={() => navigation.navigate('Reportes')}
          activeOpacity={0.85}
        >
          <Text style={styles.reportButtonText}>Reportes</Text>
        </TouchableOpacity>

        {/* Botones */}
        <View style={styles.buttonsContainer}>
          <View style={styles.row}>
            <HomeButton
              icon="store"
              label="Almacén"
              backgroundColor="#D9F0F6"
              iconColor="#1C7C91"
              onPress={() => navigation.navigate('Almacen')}
            />
            <HomeButton
              icon="people"
              label="Clientes"
              backgroundColor="#C3E8F4"
              iconColor="#0583B5"
              onPress={() => navigation.navigate('Clientes')}
            />
          </View>

          <View style={styles.row}>
            <HomeButton
              icon="delivery-dining"
              label="Repartidores"
              backgroundColor="#C3E8F4"
              iconColor="#0583B5"
              onPress={() => navigation.navigate('Repartidores')}
            />
            <HomeButton
              icon="directions-car"
              label="Vehículos"
              backgroundColor="#D9F0F6"
              iconColor="#1C7C91"
              onPress={() => navigation.navigate('Vehiculos')}
            />
          </View>

          {/* Nueva fila con Crear Pedido y Ver Pedidos */}
          <View style={styles.row}>
            <HomeButton
              icon="assignment"
              label="Crear Pedido"
              backgroundColor="#D9F0F6"
              iconColor="#1C7C91"
              onPress={() => navigation.navigate('CrearPedido')}
            />
            <HomeButton
              icon="visibility"
              label="Ver Pedidos"
              backgroundColor="#C3E8F4"
              iconColor="#0583B5"
              onPress={() => navigation.navigate('VerPedidos')}
            />
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

function HomeButton({ icon, label, backgroundColor, iconColor, onPress }) {
  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor }]}
      onPress={onPress}
      activeOpacity={0.75}
    >
      <View style={styles.iconWrapper}>
        <Icon name={icon} size={36} color={iconColor} />
      </View>
      <Text style={[styles.buttonLabel, { color: iconColor }]}>{label}</Text>
    </TouchableOpacity>
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
    paddingBottom: 68,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50,
    marginBottom: 28,
    position: 'relative',
  },
  title: {
    fontSize: 25,
    fontWeight: '300',
    color: '#1C7C91',
    textAlign: 'center',
    fontStyle: 'italic',
  },
  titleUMG: {
    fontWeight: 'bold',
    marginLeft: 8,
    color: '#14667D',
  },
  profileButton: {
    position: 'absolute',
    right: 0,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: '#0583B5',
    resizeMode: 'cover',
  },
  reportButton: {
    alignSelf: 'center',
    backgroundColor: '#1C7C91',
    paddingVertical: 15,
    paddingHorizontal: 62,
    borderRadius: 30,
    marginBottom: 36,
    shadowColor: '#1C7C91',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 6,
  },
  reportButtonText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '600',
  },
  buttonsContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  button: {
    flex: 1,
    marginHorizontal: 10,
    borderRadius: 16,
    paddingVertical: 18,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#1C7C91',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.16,
    shadowRadius: 5,
    elevation: 4,
    transitionDuration: '200ms',
  },
  iconWrapper: {
    backgroundColor: '#fff',
    borderRadius: 36,
    padding: 12,
    marginBottom: 12,
    shadowColor: '#1C7C91',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.22,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonLabel: {
    fontWeight: '600',
    fontSize: 16,
  },
});

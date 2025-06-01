import React, { useEffect } from 'react';
import { View, Image, StyleSheet } from 'react-native';

export default function SplashScreen({ navigation }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Login'); // 🚀 Navegar a Login después de 2 segundos
    }, 2000);

    return () => clearTimeout(timer); // Limpieza por si se desmonta
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/Splash.png')} // Asegúrate que tu imagen esté en 'assets'
        style={styles.logo}
        resizeMode="contain"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2B8EA4', // Color de fondo igual a tu imagen
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: '120%',
    height: '90%',
  },
});


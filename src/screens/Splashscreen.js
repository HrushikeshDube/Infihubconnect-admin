import React from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';

const SplashScreen = () => (
  <View style={styles.container}>
    <ActivityIndicator size="large" color="#FFDB4F" />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1C2120',
  },
});

export default SplashScreen;

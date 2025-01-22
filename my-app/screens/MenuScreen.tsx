import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useLanguage } from '../context/LanguageContext';

const MenuScreen = () => {
  const { isEnglish } = useLanguage();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {isEnglish ? 'Weekly Menu' : 'Haftalık Yemek Listesi'}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2a4d8f',
  },
});

export default MenuScreen; 
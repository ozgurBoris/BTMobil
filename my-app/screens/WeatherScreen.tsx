import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  Linking,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import MainLayout from '../components/MainLayout';
import { useLanguage } from '../context/LanguageContext';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

const WeatherScreen = () => {
  const { isEnglish } = useLanguage();
  const [selectedCity, setSelectedCity] = useState<string | null>(null);

  const cities = [
    { 
      id: 1, 
      name: 'Antalya Kepez', 
      lat: 36.9125, 
      lon: 30.7133,
      icon: 'sunny-outline',
      colors: ['#FF512F', '#DD2476', '#DD2476'] as const // Turuncu-Kırmızı
    },
    { 
      id: 2, 
      name: 'Antalya Konyaaltı', 
      lat: 36.8875, 
      lon: 30.6500,
      icon: 'water-outline',
      colors: ['#1FA2FF', '#12D8FA', '#12D8FA'] as const // Mavi-Turkuaz
    },
    { 
      id: 3, 
      name: 'Antalya Muratpaşa', 
      lat: 36.8875, 
      lon: 30.7133,
      icon: 'partly-sunny-outline',
      colors: ['#764BA2', '#667EEA', '#667EEA'] as const // Mor-Mavi
    },
    { 
      id: 4, 
      name: 'Antalya Döşemealtı', 
      lat: 37.0000, 
      lon: 30.6667,
      icon: 'cloudy-night-outline',
      colors: ['#4B79A1', '#283E51', '#283E51'] as const // Koyu Mavi
    },
  ];

  const handleCityPress = async (city: { name: string, lat: number, lon: number }) => {
    setSelectedCity(city.name);
    try {
      const url = `https://www.google.com/search?q=weather+${encodeURIComponent(city.name)}`;
      await Linking.openURL(url);
    } catch (error) {
      console.error('Link açılamadı:', error);
    }
  };

  return (
    <MainLayout>
      <StatusBar backgroundColor="#2a4d8f" barStyle="light-content" />
      <SafeAreaView style={styles.container}>
        <LinearGradient
          colors={['#1e3c72', '#2a4d8f', '#3f5fb0']}
          style={styles.gradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <View style={styles.header}>
            <Text style={styles.headerTitle}>
              {isEnglish ? 'Weather Forecast' : 'Hava Durumu'}
            </Text>
            <View style={styles.headerLine} />
          </View>

          <ScrollView style={styles.content}>
            <View style={styles.cityButtons}>
              {cities.map((city) => (
                <TouchableOpacity
                  key={city.id}
                  style={[
                    styles.cityButton,
                    selectedCity === city.name && styles.cityButtonActive
                  ]}
                  onPress={() => handleCityPress(city)}
                >
                  <LinearGradient
                    colors={city.colors}
                    style={styles.buttonGradient}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                  >
                    <View style={styles.cityContent}>
                      <Ionicons 
                        name={city.icon as any} 
                        size={32} 
                        color="#ffffff"
                      />
                      <Text style={[
                        styles.cityButtonText,
                        selectedCity === city.name && styles.cityButtonTextActive
                      ]}>
                        {city.name}
                      </Text>
                    </View>
                  </LinearGradient>
                </TouchableOpacity>
              ))}
            </View>
            <Text style={styles.infoText}>
              {isEnglish ? 'Tap on a city to see detailed weather information' : 'Detaylı hava durumu için bir şehre dokunun'}
            </Text>
          </ScrollView>
        </LinearGradient>
      </SafeAreaView>
    </MainLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  header: {
    padding: 16,
    alignItems: 'center',
    marginTop: 20,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 8,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 5,
  },
  headerLine: {
    width: 60,
    height: 4,
    backgroundColor: '#ffffff',
    borderRadius: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  cityButtons: {
    marginVertical: 20,
  },
  cityButton: {
    marginBottom: 15,
    borderRadius: 15,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    overflow: 'hidden',
  },
  buttonGradient: {
    padding: 20,
    borderRadius: 15,
  },
  cityContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cityButtonText: {
    color: '#ffffff',
    fontSize: 18,
    marginLeft: 15,
    fontWeight: '600',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  cityButtonActive: {
    transform: [{ scale: 1.02 }],
  },
  cityButtonTextActive: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
  infoText: {
    color: '#ffffff',
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    opacity: 0.8,
    fontStyle: 'italic',
  }
});

export default WeatherScreen; 
import React, { useEffect, useRef } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Animated,
  Dimensions,
  StatusBar,
  Platform,
  Image,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { useLanguage } from '../context/LanguageContext';

type RootStackParamList = {
  Splash: undefined;
  Login: undefined;
  Home: undefined;
};

type NavigationProps = NavigationProp<RootStackParamList>;

const { width, height } = Dimensions.get('window');

const SplashScreen = () => {
  const navigation = useNavigation<NavigationProps>();
  const { isEnglish } = useLanguage();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.3)).current;
  const translateYAnim = useRef(new Animated.Value(50)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 10,
        friction: 2,
        useNativeDriver: true,
      }),
      Animated.timing(translateYAnim, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }),
    ]).start();

    setTimeout(() => {
      navigation.reset({
        index: 0,
        routes: [{ name: 'Login' }],
      });
    }, 2500);
  }, []);

  return (
    <LinearGradient
      colors={['#1e3c72', '#2a4d8f', '#3f5fb0']}
      style={styles.container}
    >
      <StatusBar backgroundColor="#1e3c72" barStyle="light-content" />
      
      <Animated.View
        style={[
          styles.content,
          {
            opacity: fadeAnim,
            transform: [
              { scale: scaleAnim },
              { translateY: translateYAnim },
            ],
          },
        ]}
      >
        <Image
          source={require('../assets/logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.title}>{isEnglish ? 'Akdeniz University' : 'Akdeniz Üniversitesi'}</Text>
        <Text style={styles.subtitle}>{isEnglish ? 'Mobile Campus' : 'Mobil Kampüs'}</Text>
      </Animated.View>

      <Animated.View
        style={[
          styles.creditContainer,
          {
            opacity: fadeAnim,
          },
        ]}
      >
        <Text style={styles.credit}>Created by BT</Text>
        <Image
          source={require('../assets/bt.png')}
          style={styles.btLogo}
          resizeMode="contain"
        />
      </Animated.View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
  },
  logo: {
    width: width * 0.5,
    height: width * 0.5,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    color: '#fff',
    opacity: 0.8,
    textAlign: 'center',
  },
  creditContainer: {
    position: 'absolute',
    bottom: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  credit: {
    fontSize: 14,
    color: '#fff',
    opacity: 0.8,
    fontStyle: 'italic',
  },
  btLogo: {
    width: 20,
    height: 20,
  },
});

export default SplashScreen; 
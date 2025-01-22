import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  Alert,
  StatusBar,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { NavigationProp } from '@react-navigation/native';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';

type RootStackParamList = {
  Splash: undefined;
  Login: undefined;
  Home: undefined;
  CampusMap: undefined;
  Ring: undefined;
  Menu: undefined;
  Settings: undefined;
  Weather: undefined;
  AcademicCalendar: undefined;
  FacultyExams: undefined;
  Events: undefined;
  EventManagement: {
    userId: string;
  };
};

interface LoginScreenProps {
  navigation: NavigationProp<RootStackParamList>;
}

export default function LoginScreen({ navigation }: LoginScreenProps) {
  const { isEnglish } = useLanguage();
  const { login, user } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      console.log('Giriş denemesi:', { email, password });
      
      const success = await login(email, password);
      if (success && user?._id) {
        navigation.navigate('EventManagement', { userId: user._id });
      } else {
        Alert.alert(
          isEnglish ? 'Error' : 'Hata',
          isEnglish ? 'Invalid email or password' : 'Geçersiz email veya şifre'
        );
      }
    } catch (error: any) {
      console.error('Bağlantı hatası:', error);
      Alert.alert(
        isEnglish ? 'Error' : 'Hata',
        isEnglish ? 'Connection error' : 'Bağlantı hatası'
      );
    }
  };

  const handleStudentLogin = () => {
    navigation.navigate('Home');
  };

  return (
    <View style={styles.mainContainer}>
      <LinearGradient
        colors={['rgba(76, 102, 159, 0.9)', 'rgba(59, 89, 152, 0.9)', 'rgba(25, 47, 106, 0.9)']}
        style={styles.container}
      >
        <SafeAreaView style={[styles.container, { marginTop: Platform.OS === 'ios' ? 20 : 0 }]}>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}
          >
            <StatusBar backgroundColor="transparent" translucent barStyle="light-content" />
            <View style={styles.loginContainer}>
              <Text style={styles.title}>
                {isEnglish ? 'Akdeniz University' : 'Akdeniz Üniversitesi'}
              </Text>
              <Text style={styles.subtitle}>
                {isEnglish ? 'Mobile Application' : 'Mobil Uygulaması'}
              </Text>

              <TextInput
                style={styles.input}
                placeholder={isEnglish ? 'Email' : 'E-posta'}
                placeholderTextColor="#a0a0a0"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />

              <TextInput
                style={styles.input}
                placeholder={isEnglish ? 'Password' : 'Şifre'}
                placeholderTextColor="#a0a0a0"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                autoCapitalize="none"
              />

              <TouchableOpacity
                style={styles.button}
                onPress={handleLogin}
              >
                <Text style={styles.buttonText}>
                  {isEnglish ? 'Login' : 'Giriş Yap'}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.button, styles.secondaryButton]}
                onPress={handleStudentLogin}
              >
                <Text style={styles.buttonText}>
                  {isEnglish ? 'Login as Student' : 'Öğrenci olarak giriş yap'}
                </Text>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  loginContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    color: '#ffffff',
    marginBottom: 40,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 10,
    marginBottom: 15,
    paddingHorizontal: 15,
    fontSize: 16,
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#192f6a',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  secondaryButton: {
    backgroundColor: '#4c669f',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
}); 
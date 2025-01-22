import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  Linking
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import MainLayout from '../components/MainLayout';
import { useLanguage } from '../context/LanguageContext';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation, NavigationProp } from '@react-navigation/native';

type RootStackParamList = {
  Home: undefined;
  CampusMap: undefined;
  Ring: undefined;
  Menu: undefined;
  Settings: undefined;
  Weather: undefined;
  AcademicCalendar: undefined;
};

type NavigationProps = NavigationProp<RootStackParamList>;

const SettingsScreen = () => {
  const { isEnglish, toggleLanguage } = useLanguage();
  const navigation = useNavigation<NavigationProps>();

  const shortcuts = {
    academic: [
      {
        id: 1,
        title: isEnglish ? 'Student Information System' : 'Öğrenci Bilgi Sistemi',
        url: 'https://obs.akdeniz.edu.tr/oibs/std/login.aspx',
        icon: 'school-outline' as const,
        colors: ['#FF512F', '#DD2476', '#DD2476'] as const
      },
      {
        id: 2,
        title: isEnglish ? 'Student Mail' : 'Öğrenci Mail',
        url: 'https://outlook.office365.com',
        icon: 'mail-outline' as const,
        colors: ['#11998e', '#38ef7d', '#38ef7d'] as const
      },
      {
        id: 3,
        title: isEnglish ? 'Library' : 'Kütüphane',
        url: 'https://kutuphane.akdeniz.edu.tr',
        icon: 'library-outline' as const,
        colors: ['#4B79A1', '#283E51', '#283E51'] as const
      },
    ],
    calendar: {
      title: isEnglish ? 'Calendars' : 'Takvimler',
      items: [
        {
          id: 'academic_calendar',
          title: isEnglish ? 'Academic Calendar' : 'Akademik Takvim',
          screen: 'AcademicCalendar',
          icon: 'calendar-outline' as const,
          colors: ['#FF512F', '#DD2476', '#DD2476'] as const
        }
      ]
    },
    campus: [
      {
        id: 7,
        title: isEnglish ? 'Weather' : 'Hava Durumu',
        screen: 'Weather',
        icon: 'partly-sunny-outline' as const,
        colors: ['#4e54c8', '#8f94fb', '#8f94fb'] as const
      },
      {
        id: 8,
        title: isEnglish ? 'Campus Map' : 'Kampüs Haritası',
        screen: 'CampusMap',
        icon: 'map-outline' as const,
        colors: ['#1FA2FF', '#12D8FA', '#12D8FA'] as const
      },
      {
        id: 9,
        title: isEnglish ? 'Ring Schedule' : 'Ring Saatleri',
        screen: 'Ring',
        icon: 'bus-outline' as const,
        colors: ['#764BA2', '#667EEA', '#667EEA'] as const
      },
      {
        id: 10,
        title: isEnglish ? 'Dining Hours' : 'Yemek Saatleri',
        url: 'https://sks.akdeniz.edu.tr/tr/duyuru/merkezi_yemekhane_saatleri-5534',
        icon: 'time-outline' as const,
        colors: ['#FF512F', '#DD2476', '#DD2476'] as const
      },
      {
        id: 11,
        title: isEnglish ? 'Cafeteria' : 'Yemekhane',
        url: 'https://merkezyemekhane.akdeniz.edu.tr/User/Login',
        icon: 'restaurant-outline' as const,
        colors: ['#11998e', '#38ef7d', '#38ef7d'] as const
      },
      {
        id: 12,
        title: isEnglish ? 'Weekly Menu' : 'Haftalık Yemek Listesi',
        url: 'https://sks.akdeniz.edu.tr/tr/haftalik_yemek_listesi-6391',
        icon: 'fast-food-outline' as const,
        colors: ['#4B79A1', '#283E51', '#283E51'] as const
      },
      {
        id: 13,
        title: isEnglish ? 'Events' : 'Etkinlikler',
        screen: 'Events',
        icon: 'calendar-outline' as const,
        colors: ['#FF512F', '#F09819', '#F09819'] as const
      }
    ],
    faculties: [
      {
        id: 13,
        title: isEnglish ? 'Faculty Information' : 'Fakülte Bilgileri',
        screen: 'FacultyExams',
        icon: 'school-outline' as const,
        colors: ['#FF512F', '#DD2476', '#DD2476'] as const
      }
    ]
  };

  const handleShortcutPress = async (shortcut: any) => {
    try {
      if (shortcut.screen) {
        navigation.navigate(shortcut.screen);
      } else if (shortcut.url) {
        await Linking.openURL(shortcut.url);
      }
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
              {isEnglish ? 'Options' : 'Seçenekler'}
            </Text>
            <View style={styles.headerLine} />
          </View>

          <ScrollView style={styles.content}>
            {/* Dil Değiştirme Butonu */}
            <TouchableOpacity style={styles.languageButton} onPress={toggleLanguage}>
              <LinearGradient
                colors={['#4e54c8', '#8f94fb', '#8f94fb']}
                style={styles.buttonGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              >
                <View style={styles.buttonContent}>
                  <Ionicons name="language" size={24} color="#ffffff" />
                  <Text style={styles.buttonText}>
                    {isEnglish ? 'Language: English' : 'Dil: Türkçe'}
                  </Text>
                </View>
              </LinearGradient>
            </TouchableOpacity>

            {/* Akademik Kısayollar */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>
                {isEnglish ? 'Academic' : 'Akademik'}
              </Text>
              {shortcuts.academic.map((shortcut) => (
                <TouchableOpacity
                  key={shortcut.id}
                  style={styles.shortcutButton}
                  onPress={() => handleShortcutPress(shortcut)}
                >
                  <LinearGradient
                    colors={shortcut.colors}
                    style={styles.buttonGradient}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                  >
                    <View style={styles.buttonContent}>
                      <Ionicons name={shortcut.icon} size={24} color="#ffffff" />
                      <Text style={styles.buttonText}>{shortcut.title}</Text>
                    </View>
                  </LinearGradient>
                </TouchableOpacity>
              ))}
            </View>

            {/* Takvimler */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>
                {shortcuts.calendar.title}
              </Text>
              {shortcuts.calendar.items.map((item) => (
                <TouchableOpacity
                  key={item.id}
                  style={styles.shortcutButton}
                  onPress={() => handleShortcutPress(item)}
                >
                  <LinearGradient
                    colors={item.colors}
                    style={styles.buttonGradient}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                  >
                    <View style={styles.buttonContent}>
                      <Ionicons name={item.icon} size={24} color="#ffffff" />
                      <Text style={styles.buttonText}>{item.title}</Text>
                    </View>
                  </LinearGradient>
                </TouchableOpacity>
              ))}
            </View>

            {/* Kampüs */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>
                {isEnglish ? 'Campus' : 'Kampüs'}
              </Text>
              {shortcuts.campus.map((shortcut) => (
                <TouchableOpacity
                  key={shortcut.id}
                  style={styles.shortcutButton}
                  onPress={() => handleShortcutPress(shortcut)}
                >
                  <LinearGradient
                    colors={shortcut.colors}
                    style={styles.buttonGradient}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                  >
                    <View style={styles.buttonContent}>
                      <Ionicons name={shortcut.icon} size={24} color="#ffffff" />
                      <Text style={styles.buttonText}>{shortcut.title}</Text>
                    </View>
                  </LinearGradient>
                </TouchableOpacity>
              ))}
            </View>

            {/* Fakülteler */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>
                {isEnglish ? 'Faculties' : 'Fakülteler'}
              </Text>
              {shortcuts.faculties.map((shortcut) => (
                <TouchableOpacity
                  key={shortcut.id}
                  style={styles.shortcutButton}
                  onPress={() => handleShortcutPress(shortcut)}
                >
                  <LinearGradient
                    colors={shortcut.colors}
                    style={styles.buttonGradient}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                  >
                    <View style={styles.buttonContent}>
                      <Ionicons name={shortcut.icon} size={24} color="#ffffff" />
                      <Text style={styles.buttonText}>{shortcut.title}</Text>
                    </View>
                  </LinearGradient>
                </TouchableOpacity>
              ))}
            </View>
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
  section: {
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: 20,
    color: '#ffffff',
    marginBottom: 16,
    fontWeight: '600',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  languageButton: {
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
  shortcutButton: {
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
    padding: 16,
    borderRadius: 15,
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    marginLeft: 12,
    fontWeight: '600',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  }
});

export default SettingsScreen; 
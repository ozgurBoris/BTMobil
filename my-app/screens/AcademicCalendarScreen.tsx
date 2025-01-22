import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  StatusBar,
  ScrollView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import MainLayout from '../components/MainLayout';
import { useLanguage } from '../context/LanguageContext';

const AcademicCalendarScreen = () => {
  const { isEnglish } = useLanguage();

  const calendarData = {
    fall: {
      title: isEnglish ? 'Fall Semester' : 'Güz Dönemi',
      registration: [
        {
          date: '19-21 Eylül 2024',
          event: isEnglish 
            ? 'Electronic Registration of New Students (via E-Government)'
            : 'Yeni Öğrencilerin Elektronik Kayıtlarının Yapılması (E-Devlet Üzerinden)'
        },
        {
          date: '19-23 Eylül 2024',
          event: isEnglish
            ? 'In-Person Registration of New Students'
            : 'Yeni Öğrencilerin Kayıtlarının Şahsen Başvurarak Yapılması'
        }
      ],
      academic: [
        {
          date: '16 Eylül 2024',
          event: isEnglish ? 'Start of Classes' : 'Derslerin Başlaması'
        },
        {
          date: '16-20 Eylül 2024',
          event: isEnglish ? 'Add/Drop Period' : 'Ders Bırakma ve Ders Ekleme Süresi (Ekle-Çıkar)'
        },
        {
          date: '22 Aralık 2024',
          event: isEnglish ? 'End of Classes' : 'Derslerin Sona Ermesi'
        }
      ],
      exams: [
        {
          date: '23 Aralık 2024 - 05 Ocak 2025',
          event: isEnglish ? 'Final Exams' : 'Yarıyıl Sonu Sınavları'
        },
        {
          date: '20-26 Ocak 2025',
          event: isEnglish ? 'Make-up Exams' : 'Bütünleme Sınavları'
        }
      ]
    },
    spring: {
      title: isEnglish ? 'Spring Semester' : 'Bahar Dönemi',
      registration: [
        {
          date: '03-07 Şubat 2025',
          event: isEnglish 
            ? 'Course Registration and Tuition Fee Payment'
            : 'Katkı Payı/Öğrenim Ücretleri Yatırma ve Kayıt Yenileme'
        }
      ],
      academic: [
        {
          date: '10 Şubat 2025',
          event: isEnglish ? 'Start of Classes' : 'Derslerin Başlaması'
        },
        {
          date: '10-14 Şubat 2025',
          event: isEnglish ? 'Add/Drop Period' : 'Ders Bırakma ve Ders Ekleme Süresi (Ekle-Çıkar)'
        },
        {
          date: '28 Şubat 2025',
          event: isEnglish ? 'Course Withdrawal Deadline' : 'Dersten Çekilmenin Son Günü'
        },
        {
          date: '24 Mayıs 2025',
          event: isEnglish ? 'End of Classes' : 'Derslerin Sona Ermesi'
        }
      ],
      exams: [
        {
          date: '27 Mayıs - 09 Haziran 2025',
          event: isEnglish ? 'Final Exams' : 'Yarıyıl Sonu Sınavları'
        },
        {
          date: '17-23 Haziran 2025',
          event: isEnglish ? 'Make-up Exams' : 'Bütünleme Sınavları'
        }
      ]
    }
  };

  const renderSection = (title: string, data: Array<{date: string, event: string}>) => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {data.map((item, index) => (
        <View key={index} style={styles.eventContainer}>
          <LinearGradient
            colors={['#2a4d8f', '#3f5fb0']}
            style={styles.eventGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <Text style={styles.date}>{item.date}</Text>
            <Text style={styles.event}>{item.event}</Text>
          </LinearGradient>
        </View>
      ))}
    </View>
  );

  const renderSemester = (semesterData: any) => (
    <View style={styles.semester}>
      <Text style={styles.semesterTitle}>{semesterData.title}</Text>
      {renderSection(
        isEnglish ? 'Registration Period' : 'Kayıt Dönemi',
        semesterData.registration
      )}
      {renderSection(
        isEnglish ? 'Academic Period' : 'Eğitim-Öğretim Dönemi',
        semesterData.academic
      )}
      {renderSection(
        isEnglish ? 'Examination Period' : 'Sınav Dönemi',
        semesterData.exams
      )}
    </View>
  );

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
              {isEnglish ? 'Academic Calendar' : 'Akademik Takvim'}
            </Text>
            <Text style={styles.headerSubtitle}>
              {isEnglish ? '2024-2025 Academic Year' : '2024-2025 Akademik Yılı'}
            </Text>
            <View style={styles.headerLine} />
          </View>

          <ScrollView style={styles.content}>
            {renderSemester(calendarData.fall)}
            {renderSemester(calendarData.spring)}
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
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    color: '#ffffff',
    fontWeight: '600',
    marginBottom: 12,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  eventContainer: {
    marginBottom: 10,
    borderRadius: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    overflow: 'hidden',
  },
  eventGradient: {
    padding: 15,
    borderRadius: 10,
  },
  date: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  event: {
    color: '#ffffff',
    fontSize: 14,
    opacity: 0.9,
  },
  headerSubtitle: {
    fontSize: 18,
    color: '#ffffff',
    opacity: 0.9,
    marginBottom: 12,
    textAlign: 'center',
  },
  semester: {
    marginBottom: 32,
  },
  semesterTitle: {
    fontSize: 24,
    color: '#ffffff',
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
});

export default AcademicCalendarScreen; 
import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Platform,
  StatusBar,
  Modal,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import MainLayout from '../components/MainLayout';
import { useLanguage } from '../context/LanguageContext';

const RingScreen = () => {
  const { isEnglish } = useLanguage();
  const [selectedRoute, setSelectedRoute] = useState<number | null>(null);

  const busRoutes = [
    {
      id: 1,
      name: isEnglish ? 'Campus - City Center' : 'Kampüs - Şehir Merkezi',
      time: '07:30 - 23:00',
      details: isEnglish ? [
        '• First departure from campus: 07:30',
        '• Last departure from city center: 23:00',
        '• Frequency: Every 30 minutes',
        '• Route: Campus → Meltem → Konyaaltı → City Center',
        '• Stops: Main gate, Faculty of Education, Library, Student Center',
        '• Weekend service available',
        '• Special schedule during holidays',
        '• Student ID required',
      ] : [
        '• Kampüsten ilk kalkış: 07:30',
        '• Şehir merkezinden son kalkış: 23:00',
        '• Sefer sıklığı: Her 30 dakikada bir',
        '• Güzergah: Kampüs → Meltem → Konyaaltı → Şehir Merkezi',
        '• Duraklar: Ana kapı, Eğitim Fakültesi, Kütüphane, Öğrenci Merkezi',
        '• Hafta sonu hizmeti vardır',
        '• Tatil günlerinde özel sefer programı uygulanır',
        '• Öğrenci kimliği gereklidir',
      ]
    },
    {
      id: 2,
      name: isEnglish ? 'Campus - Hurma' : 'Kampüs - Hurma',
      time: '08:00 - 22:00',
      details: isEnglish ? [
        '• First departure from campus: 08:00',
        '• Last departure from Hurma: 22:00',
        '• Frequency: Every 45 minutes',
        '• Route: Campus → Uncalı → Hurma',
        '• Stops: Main gate, Engineering Faculty, Hospital',
        '• No weekend service',
        '• Student ID required',
      ] : [
        '• Kampüsten ilk kalkış: 08:00',
        '• Hurma\'dan son kalkış: 22:00',
        '• Sefer sıklığı: Her 45 dakikada bir',
        '• Güzergah: Kampüs → Uncalı → Hurma',
        '• Duraklar: Ana kapı, Mühendislik Fakültesi, Hastane',
        '• Hafta sonu hizmeti yoktur',
        '• Öğrenci kimliği gereklidir',
      ]
    },
    {
      id: 3,
      name: isEnglish ? 'Campus - Lara' : 'Kampüs - Lara',
      time: '07:00 - 21:30',
      details: isEnglish ? [
        '• First departure from campus: 07:00',
        '• Last departure from Lara: 21:30',
        '• Frequency: Every 40 minutes',
        '• Route: Campus → City Center → Lara',
        '• Stops: Main gate, Medical Faculty, Hospital',
        '• Limited weekend service',
        '• Student ID required',
      ] : [
        '• Kampüsten ilk kalkış: 07:00',
        '• Lara\'dan son kalkış: 21:30',
        '• Sefer sıklığı: Her 40 dakikada bir',
        '• Güzergah: Kampüs → Şehir Merkezi → Lara',
        '• Duraklar: Ana kapı, Tıp Fakültesi, Hastane',
        '• Sınırlı hafta sonu hizmeti vardır',
        '• Öğrenci kimliği gereklidir',
      ]
    }
  ];

  return (
    <MainLayout>
      <StatusBar backgroundColor="#2a4d8f" barStyle="light-content" />
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>
            {isEnglish ? 'Ring Services' : 'Ring Servisleri'}
          </Text>
        </View>

        <View style={styles.content}>
          {busRoutes.map((route) => (
            <TouchableOpacity 
              key={route.id} 
              style={styles.routeCard}
              onPress={() => setSelectedRoute(route.id)}
            >
              <View style={styles.routeIconContainer}>
                <Ionicons name="bus" size={32} color="#192f6a" />
              </View>
              <View style={styles.routeInfo}>
                <Text style={styles.routeName}>{route.name}</Text>
                <Text style={styles.routeTime}>
                  {isEnglish ? 'Working Hours: ' : 'Çalışma Saatleri: '}{route.time}
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={24} color="#192f6a" />
            </TouchableOpacity>
          ))}
        </View>

        {/* Route Details Modal */}
        <Modal
          transparent={true}
          visible={selectedRoute !== null}
          onRequestClose={() => setSelectedRoute(null)}
          animationType="slide"
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>
                  {selectedRoute && busRoutes.find(r => r.id === selectedRoute)?.name}
                </Text>
                <TouchableOpacity 
                  style={styles.closeButton}
                  onPress={() => setSelectedRoute(null)}
                >
                  <Ionicons name="close" size={24} color="#192f6a" />
                </TouchableOpacity>
              </View>
              <ScrollView style={styles.detailsContainer}>
                {selectedRoute && busRoutes.find(r => r.id === selectedRoute)?.details.map((detail, index) => (
                  <Text key={index} style={styles.detailText}>{detail}</Text>
                ))}
              </ScrollView>
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    </MainLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1e3c72',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  header: {
    padding: 16,
    backgroundColor: '#2a4d8f',
    borderBottomWidth: 1,
    borderBottomColor: '#1e3c72',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  routeCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  routeIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#e8eaf6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  routeInfo: {
    flex: 1,
  },
  routeName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#192f6a',
    marginBottom: 4,
  },
  routeTime: {
    fontSize: 14,
    color: '#666',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    minHeight: '60%',
    padding: 20,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#192f6a',
    flex: 1,
  },
  closeButton: {
    padding: 5,
  },
  detailsContainer: {
    flex: 1,
  },
  detailText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 12,
    lineHeight: 24,
  },
});

export default RingScreen; 
import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  Image,
  Modal,
  Linking,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import MainLayout from '../components/MainLayout';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { LinearGradient } from 'expo-linear-gradient';

interface Event {
  _id: string;
  title: string;
  community: string;
  description: string;
  date: string;
  imageUrl: string;
  createdBy: string;
}

interface User {
  _id: string;
  email: string;
  name: string;
  isAdmin?: boolean;
}

const EventsScreen = () => {
  const { isEnglish } = useLanguage();
  const { user } = useAuth();
  const [events, setEvents] = useState<Event[]>([]);
  const [userEvents, setUserEvents] = useState<Event[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEvents();
    if (user?.isAdmin && user?._id) {
      fetchUserEvents(user._id);
    }
  }, [user?._id]);

  const fetchEvents = async () => {
    try {
      console.log('Tüm etkinlikler getiriliyor...');
      const response = await fetch('http://192.168.51.66:5000/api/events');
      const data = await response.json();
      setEvents(data);
    } catch (error) {
      console.error('Etkinlikler çekilirken hata:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchUserEvents = async (userId: string) => {
    try {
      console.log('Kullanıcı etkinlikleri getiriliyor...');
      const response = await fetch(`http://192.168.51.66:5000/api/events/user/${userId}`);
      const data = await response.json();
      setUserEvents(data);
    } catch (error) {
      console.error('Kullanıcı etkinlikleri çekilirken hata:', error);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('tr-TR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const isValidUrl = (text: string) => {
    const urlPattern = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;
    return urlPattern.test(text);
  };

  const renderDescription = (text: string) => {
    if (isValidUrl(text)) {
      return (
        <Text
          style={[styles.modalDescription, styles.link]}
          onPress={() => Linking.openURL(text)}
        >
          {text}
        </Text>
      );
    }
    return <Text style={styles.modalDescription}>{text}</Text>;
  };

  const renderEventCard = (event: Event) => (
    <TouchableOpacity
      key={event._id}
      style={styles.eventCard}
      onPress={() => setSelectedEvent(event)}
    >
      {event.imageUrl ? (
        <Image
          source={{ uri: event.imageUrl }}
          style={styles.eventImage}
          resizeMode="cover"
        />
      ) : (
        <View style={styles.placeholderImage}>
          <Text style={styles.placeholderText}>
            {isEnglish ? 'No Image' : 'Resim Yok'}
          </Text>
        </View>
      )}
      <View style={styles.eventInfo}>
        <Text style={styles.eventTitle}>{event.title}</Text>
        <Text style={styles.communityName}>{event.community}</Text>
        <Text style={styles.eventDate}>{formatDate(event.date)}</Text>
      </View>
    </TouchableOpacity>
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
              {isEnglish ? 'Events' : 'Etkinlikler'}
            </Text>
            <View style={styles.headerLine} />
          </View>

          <ScrollView style={styles.content}>
            {/* Tüm Etkinlikler */}
            <Text style={styles.sectionTitle}>
              {isEnglish ? 'Events' : 'Etkinlikler'}
            </Text>
            {loading ? (
              <Text style={styles.loadingText}>
                {isEnglish ? 'Loading events...' : 'Etkinlikler yükleniyor...'}
              </Text>
            ) : events.length === 0 ? (
              <Text style={styles.noEventsText}>
                {isEnglish ? 'No events found' : 'Etkinlik bulunamadı'}
              </Text>
            ) : (
              events.map(renderEventCard)
            )}
          </ScrollView>
        </LinearGradient>

        {/* Etkinlik Detay Modalı */}
        <Modal
          transparent={true}
          visible={selectedEvent !== null}
          onRequestClose={() => setSelectedEvent(null)}
          animationType="slide"
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <TouchableOpacity
                  style={styles.closeButton}
                  onPress={() => setSelectedEvent(null)}
                >
                  <Ionicons name="close" size={24} color="#192f6a" />
                </TouchableOpacity>
              </View>
              {selectedEvent && (
                <ScrollView>
                  {selectedEvent.imageUrl ? (
                    <Image
                      source={{ uri: selectedEvent.imageUrl }}
                      style={styles.modalImage}
                      resizeMode="cover"
                    />
                  ) : (
                    <View style={styles.modalPlaceholderImage}>
                      <Text style={styles.placeholderText}>
                        {isEnglish ? 'No Image' : 'Resim Yok'}
                      </Text>
                    </View>
                  )}
                  <View style={styles.modalInfo}>
                    <Text style={styles.modalTitle}>{selectedEvent.title}</Text>
                    <Text style={styles.modalCommunity}>{selectedEvent.community}</Text>
                    <Text style={styles.modalDate}>{formatDate(selectedEvent.date)}</Text>
                    {renderDescription(selectedEvent.description)}
                  </View>
                </ScrollView>
              )}
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
  },
  gradient: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'ios' ? 50 : 35,
  },
  header: {
    marginBottom: 20,
    paddingTop: Platform.OS === 'ios' ? 0 : 16,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  headerLine: {
    height: 3,
    backgroundColor: '#fff',
    width: 100,
    marginTop: 8,
    borderRadius: 2,
  },
  content: {
    flex: 1,
  },
  eventCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  eventImage: {
    width: '100%',
    height: 150,
  },
  placeholderImage: {
    width: '100%',
    height: 150,
    backgroundColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    color: '#666',
    fontSize: 16,
  },
  eventInfo: {
    padding: 16,
  },
  eventTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  communityName: {
    fontSize: 16,
    color: '#666',
    marginBottom: 4,
  },
  eventDate: {
    fontSize: 14,
    color: '#888',
  },
  loadingText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
  },
  noEventsText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '90%',
  },
  modalHeader: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  closeButton: {
    padding: 8,
  },
  modalImage: {
    width: '100%',
    height: 200,
  },
  modalPlaceholderImage: {
    width: '100%',
    height: 200,
    backgroundColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalInfo: {
    padding: 20,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  modalCommunity: {
    fontSize: 18,
    color: '#666',
    marginBottom: 4,
  },
  modalDate: {
    fontSize: 16,
    color: '#888',
    marginBottom: 16,
  },
  modalDescription: {
    fontSize: 16,
    color: '#666',
    marginBottom: 10,
  },
  link: {
    color: '#2a4d8f',
    textDecorationLine: 'underline',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 16,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
});

export default EventsScreen; 
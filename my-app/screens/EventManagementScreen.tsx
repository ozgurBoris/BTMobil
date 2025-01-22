import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  Image,
  Modal,
  Platform,
  Dimensions,
  Linking,
} from 'react-native';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Ionicons } from '@expo/vector-icons';
import * as Notifications from 'expo-notifications';
import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator';

// Bildirimleri yapılandır
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

interface Event {
  _id: string;
  title: string;
  community: string;
  description: string;
  date: string;
  imageUrl: string;
  createdBy: string;
}

const EventManagementScreen = () => {
  const scrollViewRef = useRef<ScrollView>(null);
  const { isEnglish } = useLanguage();
  const { user } = useAuth();
  const [title, setTitle] = useState('');
  const [community, setCommunity] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(new Date());
  const [imageUrl, setImageUrl] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [userEvents, setUserEvents] = useState<Event[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [localImage, setLocalImage] = useState<string | null>(null);

  useEffect(() => {
    fetchUserEvents();
    registerForPushNotificationsAsync();
    requestMediaLibraryPermission();
  }, []);

  const fetchUserEvents = async () => {
    try {
      const response = await fetch(`http://192.168.51.66:5000/api/events/user/${user?._id}`);
      const events = await response.json();
      setUserEvents(events);
    } catch (error) {
      console.error('Etkinlikler yüklenirken hata:', error);
    }
  };

  const registerForPushNotificationsAsync = async () => {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    
    if (finalStatus !== 'granted') {
      Alert.alert(
        isEnglish ? 'Error' : 'Hata',
        isEnglish ? 'Failed to get notification permission!' : 'Bildirim izni alınamadı!'
      );
      return;
    }
  };

  const scheduleNotification = async (title: string) => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: isEnglish 
          ? `${community} created a new event` 
          : `${community} yeni etkinlik oluşturdu`,
        body: title,
        data: { data: 'goes here' },
      },
      trigger: null,
    });
  };

  const handleSubmit = async () => {
    try {
      const eventData = {
        title,
        community,
        description,
        date,
        imageUrl,
        createdBy: user?._id,
      };

      const response = await fetch('http://192.168.51.66:5000/api/events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(eventData),
      });

      if (response.ok) {
        await scheduleNotification(title);
        Alert.alert(
          isEnglish ? 'Success' : 'Başarılı',
          isEnglish ? 'Event created successfully' : 'Etkinlik başarıyla oluşturuldu'
        );
        clearForm();
        fetchUserEvents();
      } else {
        throw new Error('Event creation failed');
      }
    } catch (error) {
      Alert.alert(
        isEnglish ? 'Error' : 'Hata',
        isEnglish ? 'Failed to create event' : 'Etkinlik oluşturulamadı'
      );
    }
  };

  const handleUpdate = async () => {
    if (!selectedEvent) return;

    try {
      const eventData = {
        title,
        community,
        description,
        date,
        imageUrl,
      };

      const response = await fetch(`http://192.168.51.66:5000/api/events/${selectedEvent._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(eventData),
      });

      if (response.ok) {
        Alert.alert(
          isEnglish ? 'Success' : 'Başarılı',
          isEnglish ? 'Event updated successfully' : 'Etkinlik başarıyla güncellendi'
        );
        setIsEditing(false);
        setSelectedEvent(null);
        clearForm();
        fetchUserEvents();
      } else {
        throw new Error('Event update failed');
      }
    } catch (error) {
      Alert.alert(
        isEnglish ? 'Error' : 'Hata',
        isEnglish ? 'Failed to update event' : 'Etkinlik güncellenemedi'
      );
    }
  };

  const handleDelete = async () => {
    if (!selectedEvent) return;

    try {
      const response = await fetch(`http://192.168.51.66:5000/api/events/${selectedEvent._id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        Alert.alert(
          isEnglish ? 'Success' : 'Başarılı',
          isEnglish ? 'Event deleted successfully' : 'Etkinlik başarıyla silindi'
        );
        setShowDeleteConfirm(false);
        setSelectedEvent(null);
        clearForm();
        fetchUserEvents();
      } else {
        throw new Error('Event deletion failed');
      }
    } catch (error) {
      Alert.alert(
        isEnglish ? 'Error' : 'Hata',
        isEnglish ? 'Failed to delete event' : 'Etkinlik silinemedi'
      );
    }
  };

  const clearForm = () => {
    setTitle('');
    setCommunity('');
    setDescription('');
    setDate(new Date());
    setImageUrl('');
    setLocalImage(null);
  };

  const handleEventPress = (event: Event) => {
    setSelectedEvent(event);
    setTitle(event.title);
    setCommunity(event.community);
    setDescription(event.description);
    setDate(new Date(event.date));
    setImageUrl(event.imageUrl);
    setIsEditing(true);
    scrollViewRef.current?.scrollTo({ y: 0, animated: true });
  };

  const onDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(Platform.OS === 'ios');
    if (selectedDate) {
      setDate(selectedDate);
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

  const requestMediaLibraryPermission = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert(
        isEnglish ? 'Error' : 'Hata',
        isEnglish ? 'Sorry, we need camera roll permissions!' : 'Galeri izinleri gerekli!'
      );
    }
  };

  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [16, 9],
        quality: 0.8,
      });

      if (!result.canceled) {
        const manipulatedImage = await ImageManipulator.manipulateAsync(
          result.assets[0].uri,
          [{ resize: { width: 1200 } }],
          { compress: 0.8, format: ImageManipulator.SaveFormat.JPEG }
        );
        
        setLocalImage(manipulatedImage.uri);
        setImageUrl(manipulatedImage.uri);
      }
    } catch (error) {
      Alert.alert(
        isEnglish ? 'Error' : 'Hata',
        isEnglish ? 'Failed to pick image' : 'Görsel seçilemedi'
      );
    }
  };

  const isValidUrl = (text: string) => {
    const urlPattern = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;
    return urlPattern.test(text);
  };

  const renderDescription = (text: string) => {
    if (isValidUrl(text)) {
      return (
        <Text
          style={[styles.eventDescription, styles.link]}
          onPress={() => Linking.openURL(text)}
        >
          {text}
        </Text>
      );
    }
    return <Text style={styles.eventDescription}>{text}</Text>;
  };

  return (
    <ScrollView 
      ref={scrollViewRef}
      style={styles.container}
    >
      <View style={styles.header}>
        <Text style={styles.headerTitle}>
          {isEnglish ? 'Event Management' : 'Etkinlik Yönetimi'}
        </Text>
      </View>

      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder={isEnglish ? 'Event Title' : 'Etkinlik Başlığı'}
          value={title}
          onChangeText={setTitle}
        />

        <TextInput
          style={styles.input}
          placeholder={isEnglish ? 'Community/Organization' : 'Topluluk/Organizasyon'}
          value={community}
          onChangeText={setCommunity}
        />

        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder={isEnglish ? 'Event Description' : 'Etkinlik Açıklaması'}
          value={description}
          onChangeText={setDescription}
          multiline
          numberOfLines={4}
        />

        <TouchableOpacity
          style={styles.dateButton}
          onPress={() => setShowDatePicker(true)}
        >
          <Ionicons name="calendar" size={24} color="#2a4d8f" />
          <Text style={styles.dateButtonText}>
            {formatDate(date.toISOString())}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.imagePickerButton}
          onPress={pickImage}
        >
          {localImage ? (
            <Image
              source={{ uri: localImage }}
              style={styles.selectedImage}
              resizeMode="cover"
            />
          ) : (
            <View style={styles.imagePlaceholder}>
              <Ionicons name="image" size={32} color="#2a4d8f" />
              <Text style={styles.imagePlaceholderText}>
                {isEnglish ? 'Select Image' : 'Görsel Seç'}
              </Text>
            </View>
          )}
        </TouchableOpacity>

        {isEditing ? (
          <View style={styles.editButtons}>
            <TouchableOpacity 
              style={[styles.button, styles.updateButton]} 
              onPress={handleUpdate}
            >
              <Text style={styles.buttonText}>
                {isEnglish ? 'Update Event' : 'Etkinliği Güncelle'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.button, styles.deleteButton]}
              onPress={() => setShowDeleteConfirm(true)}
            >
              <Text style={styles.buttonText}>
                {isEnglish ? 'Delete Event' : 'Etkinliği Sil'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.button, styles.cancelButton]}
              onPress={() => {
                setIsEditing(false);
                setSelectedEvent(null);
                clearForm();
              }}
            >
              <Text style={styles.buttonText}>
                {isEnglish ? 'Cancel' : 'İptal'}
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>
              {isEnglish ? 'Create Event' : 'Etkinlik Oluştur'}
            </Text>
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.eventsSection}>
        <Text style={styles.sectionTitle}>
          {isEnglish ? 'My Events' : 'Etkinliklerim'}
        </Text>
        {userEvents.map((event) => (
          <TouchableOpacity
            key={event._id}
            style={styles.eventCard}
            onPress={() => handleEventPress(event)}
          >
            <Image
              source={{ uri: event.imageUrl }}
              style={styles.eventImage}
              resizeMode="cover"
            />
            <View style={styles.eventInfo}>
              <Text style={styles.eventTitle}>{event.title}</Text>
              <Text style={styles.eventCommunity}>{event.community}</Text>
              {renderDescription(event.description)}
              <Text style={styles.eventDate}>{formatDate(event.date)}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      {showDatePicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          onChange={onDateChange}
          minimumDate={new Date()}
        />
      )}

      <Modal
        transparent={true}
        visible={showDeleteConfirm}
        onRequestClose={() => setShowDeleteConfirm(false)}
        animationType="fade"
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              {isEnglish ? 'Delete Event' : 'Etkinliği Sil'}
            </Text>
            <Text style={styles.modalText}>
              {isEnglish 
                ? 'Are you sure you want to delete this event?' 
                : 'Bu etkinliği silmek istediğinizden emin misiniz?'}
            </Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setShowDeleteConfirm(false)}
              >
                <Text style={styles.buttonText}>
                  {isEnglish ? 'Cancel' : 'İptal'}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.deleteButton]}
                onPress={handleDelete}
              >
                <Text style={styles.buttonText}>
                  {isEnglish ? 'Delete' : 'Sil'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#2a4d8f',
    padding: 20,
    marginBottom: 20,
    paddingTop: Platform.OS === 'ios' ? 50 : 35,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  form: {
    padding: 20,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ddd',
    fontSize: 16,
  },
  textArea: {
    height: 120,
    textAlignVertical: 'top',
  },
  dateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  dateButtonText: {
    fontSize: 16,
    marginLeft: 10,
    color: '#333',
  },
  button: {
    backgroundColor: '#2a4d8f',
    borderRadius: 8,
    padding: 15,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  editButtons: {
    flexDirection: 'column',
    gap: 10,
  },
  updateButton: {
    backgroundColor: '#2a4d8f',
  },
  deleteButton: {
    backgroundColor: '#dc3545',
  },
  cancelButton: {
    backgroundColor: '#6c757d',
  },
  eventsSection: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  eventCard: {
    backgroundColor: '#fff',
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  eventImage: {
    width: '100%',
    height: 150,
  },
  eventInfo: {
    padding: 15,
  },
  eventTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  eventCommunity: {
    fontSize: 16,
    color: '#666',
    marginBottom: 5,
  },
  eventDate: {
    fontSize: 14,
    color: '#999',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 20,
    width: '80%',
    maxWidth: 400,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  modalText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 10,
  },
  modalButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    minWidth: 100,
    alignItems: 'center',
  },
  imagePickerButton: {
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ddd',
    overflow: 'hidden',
    height: 200,
  },
  selectedImage: {
    width: '100%',
    height: '100%',
  },
  imagePlaceholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
  },
  imagePlaceholderText: {
    marginTop: 8,
    fontSize: 16,
    color: '#2a4d8f',
  },
  eventDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  link: {
    color: '#2a4d8f',
    textDecorationLine: 'underline',
  },
});

export default EventManagementScreen;

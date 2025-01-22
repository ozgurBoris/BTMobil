import React, { useState, useContext, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Platform,
  StatusBar,
  Image,
  Dimensions,
  Linking,
  Modal,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import MainLayout from '../components/MainLayout';
import { LanguageContext } from '../context/LanguageContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';

type RootStackParamList = {
  Login: undefined;
  Events: undefined;
  Weather: undefined;
  Menu: undefined;
  EventManagement: undefined;
};

type NavigationProps = NavigationProp<RootStackParamList>;

const { width } = Dimensions.get('window');

interface Event {
  _id: string;
  title: string;
  community: string;
  date: string;
  imageUrl: string;
  description: string;
}

interface SliderItem {
  id: number;
  title: string;
  date: string;
  image: string;
  url: string;
}

const HomeScreen = () => {
  const { isEnglish, toggleLanguage } = useContext(LanguageContext);
  const navigation = useNavigation<NavigationProps>();
  const [activeSlide, setActiveSlide] = useState(0);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [latestEvents, setLatestEvents] = useState<Event[]>([]);
  const [hasNewEvents, setHasNewEvents] = useState(false);
  const [viewedEvents, setViewedEvents] = useState<string[]>([]);
  const [sliderData, setSliderData] = useState<SliderItem[]>([
    { 
      id: 1, 
      title: isEnglish ? 'Model United Nations Conference' : 'Model Birleşmiş Milletler Konferansı', 
      date: '13.01.2025',
      image: 'https://akdeniz.edu.tr/wp-content/uploads/2024/01/mun.jpg',
      url: 'https://www.akdeniz.edu.tr/rektor-ozkan-model-birlesmis-milletler-konferansinda-genclerle-bulustu'
    },
    { 
      id: 2, 
      title: isEnglish ? '179th Anniversary of Agricultural Education' : 'Tarımsal Öğretimin 179. Yıl Dönümü', 
      date: '10.01.2025',
      image: 'https://akdeniz.edu.tr/wp-content/uploads/2024/01/tarim.jpg',
      url: 'https://www.akdeniz.edu.tr/tarimsal-ogretimin-179-yil-donumu-coskuyla-kutlandi'
    },
    { 
      id: 3, 
      title: isEnglish ? 'Faculty of Science 40th Anniversary' : 'Fen Bilimleri Enstitüsü 40. Yıl', 
      date: '08.01.2025',
      image: 'https://akdeniz.edu.tr/wp-content/uploads/2024/01/fen.jpg',
      url: 'https://www.akdeniz.edu.tr/akdeniz-universitesi-fen-bilimleri-enstitusu-40-yilini-projelerle-kutluyor'
    },
  ]);

  useEffect(() => {
    fetchLatestEvents();
    loadViewedEvents();
  }, []);

  useEffect(() => {
    const slideInterval = setInterval(() => {
      setActiveSlide((prevSlide) => 
        prevSlide === sliderData.length - 1 ? 0 : prevSlide + 1
      );
    }, 5000);

    return () => clearInterval(slideInterval);
  }, [sliderData.length]);

  const handleScroll = (event: any) => {
    const slide = Math.ceil(event.nativeEvent.contentOffset.x / width);
    setActiveSlide(slide);
  };

  const handleSlidePress = async (url: string) => {
    try {
      await Linking.openURL(url);
    } catch (error) {
      console.error('Link açılamadı:', error);
    }
  };

  const loadViewedEvents = async () => {
    try {
      const viewed = await AsyncStorage.getItem('viewedEvents');
      if (viewed) {
        setViewedEvents(JSON.parse(viewed));
      }
    } catch (error) {
      console.error('Görüntülenen etkinlikler yüklenirken hata:', error);
    }
  };

  const fetchLatestEvents = async () => {
    try {
      const response = await fetch('http://192.168.51.66:5000/api/events');
      const allEvents = await response.json();
      const latest = allEvents.slice(0, 3);
      setLatestEvents(latest);

      const viewed = await AsyncStorage.getItem('viewedEvents');
      const viewedIds = viewed ? JSON.parse(viewed) : [];
      const hasNew = latest.some((event: Event) => !viewedIds.includes(event._id));
      setHasNewEvents(hasNew);
    } catch (error) {
      console.error('Son etkinlikler yüklenirken hata:', error);
    }
  };

  const handleEventPress = async (eventId: string) => {
    const newViewedEvents = [...viewedEvents, eventId];
    setViewedEvents(newViewedEvents);
    await AsyncStorage.setItem('viewedEvents', JSON.stringify(newViewedEvents));
    
    const hasNew = latestEvents.some(event => !newViewedEvents.includes(event._id));
    setHasNewEvents(hasNew);

    navigation.navigate('Events' as never);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('tr-TR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const handleLogout = () => {
    setShowProfileMenu(false);
    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }],
    });
  };

  const handleLanguageChange = () => {
    toggleLanguage();
    setShowProfileMenu(false);
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
    <MainLayout>
      <StatusBar backgroundColor="#2a4d8f" barStyle="light-content" />
      <SafeAreaView style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>
            {isEnglish ? 'Akdeniz University' : 'Akdeniz Üniversitesi'}
          </Text>
          <View style={styles.headerRight}>
            <TouchableOpacity 
              style={styles.iconButton}
              onPress={() => setShowNotifications(!showNotifications)}
            >
              <Ionicons name="notifications" size={28} color="white" />
              {hasNewEvents && !showNotifications && <View style={styles.notificationDot} />}
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.iconButton}
              onPress={() => setShowProfileMenu(!showProfileMenu)}
            >
              <Ionicons name="person-circle-outline" size={32} color="white" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Notifications Modal */}
        <Modal
          transparent={true}
          visible={showNotifications}
          onRequestClose={() => setShowNotifications(false)}
          animationType="fade"
        >
          <TouchableOpacity 
            style={styles.modalOverlay}
            activeOpacity={1}
            onPress={() => setShowNotifications(false)}
          >
            <View style={styles.notificationsPanel}>
              <View style={styles.notificationHeader}>
                <Text style={styles.notificationTitle}>
                  {isEnglish ? 'Notifications' : 'Bildirimler'}
                </Text>
                <TouchableOpacity onPress={() => setShowNotifications(false)}>
                  <Ionicons name="close" size={24} color="#192f6a" />
                </TouchableOpacity>
              </View>
              {latestEvents.length > 0 ? (
                <ScrollView style={styles.notificationsList}>
                  {latestEvents.map((event) => (
                    <TouchableOpacity
                      key={event._id}
                      style={styles.notificationItem}
                      onPress={() => {
                        handleEventPress(event._id);
                        setShowNotifications(false);
                      }}
                    >
                      <View style={styles.notificationContent}>
                        <Text style={styles.notificationEventTitle}>{event.title}</Text>
                        <Text style={styles.notificationEventCommunity}>{event.community}</Text>
                        <Text style={styles.notificationEventDate}>{formatDate(event.date)}</Text>
                      </View>
                      {!viewedEvents.includes(event._id) && (
                        <View style={styles.notificationEventDot} />
                      )}
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              ) : (
                <View style={styles.noNotifications}>
                  <Ionicons name="notifications-off-outline" size={48} color="#999" />
                  <Text style={styles.noNotificationsText}>
                    {isEnglish ? 'No notifications yet' : 'Henüz bildirim yok'}
                  </Text>
                </View>
              )}
            </View>
          </TouchableOpacity>
        </Modal>

        {/* Profile Menu Modal (Language Switch) */}
        <Modal
          transparent={true}
          visible={showProfileMenu}
          onRequestClose={() => setShowProfileMenu(false)}
          animationType="fade"
        >
          <TouchableOpacity 
            style={styles.modalOverlay}
            activeOpacity={1}
            onPress={() => setShowProfileMenu(false)}
          >
            <View style={styles.profileMenu}>
              <TouchableOpacity 
                style={styles.menuItem}
                onPress={handleLanguageChange}
              >
                <Ionicons name="language" size={24} color="#192f6a" />
                <Text style={styles.menuItemText}>
                  {isEnglish ? 'Türkçe\'ye Geç' : 'Switch to English'}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.menuItem}
                onPress={handleLogout}
              >
                <Ionicons name="log-out-outline" size={24} color="#192f6a" />
                <Text style={styles.menuItemText}>
                  {isEnglish ? 'Logout' : 'Çıkış Yap'}
                </Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </Modal>

        {/* Content */}
        <ScrollView style={styles.content}>
          {/* Slider */}
          <View style={styles.sliderContainer}>
            <ScrollView
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              onScroll={handleScroll}
              scrollEventThrottle={16}
            >
              {sliderData.map((item) => (
                <TouchableOpacity
                  key={item.id}
                  style={styles.slide}
                  onPress={() => handleSlidePress(item.url)}
                >
                  <Image source={{ uri: item.image }} style={styles.slideImage} />
                  <LinearGradient
                    colors={['transparent', 'rgba(0,0,0,0.8)']}
                    style={styles.slideGradient}
                  >
                    <Text style={styles.slideTitle}>{item.title}</Text>
                    <Text style={styles.slideDate}>{item.date}</Text>
                  </LinearGradient>
                </TouchableOpacity>
              ))}
            </ScrollView>
            <View style={styles.pagination}>
              {sliderData.map((_, index) => (
                <View
                  key={index}
                  style={[
                    styles.paginationDot,
                    index === activeSlide && styles.paginationDotActive,
                  ]}
                />
              ))}
            </View>
          </View>

          {/* Shortcuts */}
          <View style={styles.shortcuts}>
            <TouchableOpacity 
              style={styles.shortcutButton}
              onPress={() => Linking.openURL('https://obs.akdeniz.edu.tr')}
            >
              <Text style={styles.shortcutText}>
                {isEnglish ? 'Student Information System' : 'Öğrenci Bilgi Sistemi'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.shortcutButton}
              onPress={() => Linking.openURL('https://merkezyemekhane.akdeniz.edu.tr')}
            >
              <Text style={styles.shortcutText}>
                {isEnglish ? 'Cafeteria' : 'Yemekhane'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.shortcutButton}
              onPress={() => navigation.navigate('Menu' as never)}
            >
              <Text style={styles.shortcutText}>
                {isEnglish ? 'Weekly Menu' : 'Haftalık Yemek Listesi'}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Weather Button */}
          <TouchableOpacity 
            style={styles.weatherButton}
            onPress={() => navigation.navigate('Weather' as never)}
          >
            <Text style={styles.weatherButtonText}>
              {isEnglish ? 'Weather Forecast' : 'Hava Durumu'}
            </Text>
          </TouchableOpacity>

          {/* Son Etkinlikler */}
          <View style={styles.eventsPanel}>
            <View style={styles.panelHeader}>
              <Text style={styles.panelTitle}>
                {isEnglish ? 'Latest Events' : 'Son Etkinlikler'}
              </Text>
              {hasNewEvents && <View style={styles.notificationDot} />}
            </View>

            {latestEvents.map((event) => (
              <TouchableOpacity
                key={event._id}
                style={styles.eventCard}
                onPress={() => handleEventPress(event._id)}
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
                {!viewedEvents.includes(event._id) && (
                  <View style={styles.newEventDot} />
                )}
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    </MainLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1e3c72',
    paddingTop: Platform.OS === 'ios' ? 50 : 25,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    paddingTop: Platform.OS === 'ios' ? 0 : 16,
    backgroundColor: '#2a4d8f',
    borderBottomWidth: 1,
    borderBottomColor: '#1e3c72',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    marginLeft: 15,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  shortcuts: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  shortcutButton: {
    backgroundColor: '#ffffff',
    padding: 15,
    borderRadius: 10,
    width: '30%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  shortcutText: {
    fontSize: 12,
    textAlign: 'center',
    color: '#192f6a',
    fontWeight: '600',
  },
  weatherButton: {
    backgroundColor: '#3f5fb0',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
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
  weatherButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  eventsPanel: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  panelHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  panelTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  eventCard: {
    flexDirection: 'row',
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    marginBottom: 10,
    overflow: 'hidden',
  },
  eventImage: {
    width: 80,
    height: 80,
  },
  eventInfo: {
    flex: 1,
    padding: 10,
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  eventCommunity: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  eventDate: {
    fontSize: 12,
    color: '#999',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-start',
  },
  notificationsPanel: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 100 : 80,
    right: 10,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    width: '90%',
    maxWidth: 350,
    minHeight: 200,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  notificationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  notificationTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#192f6a',
  },
  notificationsList: {
    maxHeight: 300,
  },
  notificationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  notificationContent: {
    flex: 1,
  },
  notificationEventTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  notificationEventCommunity: {
    fontSize: 14,
    color: '#666',
    marginBottom: 2,
  },
  notificationEventDate: {
    fontSize: 12,
    color: '#999',
  },
  notificationEventDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ff4444',
    marginLeft: 8,
  },
  noNotifications: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 30,
  },
  noNotificationsText: {
    marginTop: 10,
    fontSize: 16,
    color: '#999',
    textAlign: 'center',
  },
  profileMenu: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 100 : 80,
    right: 10,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    minWidth: 200,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  menuItemText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#192f6a',
  },
  notificationDot: {
    position: 'absolute',
    top: -2,
    right: -2,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ff4444',
  },
  newEventDot: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ff4444',
  },
  sliderContainer: {
    height: 200,
    marginBottom: 16,
  },
  slide: {
    width: width - 32,
    height: 200,
    borderRadius: 10,
    overflow: 'hidden',
    marginRight: 16,
  },
  slideImage: {
    width: '100%',
    height: '100%',
  },
  slideGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '50%',
    justifyContent: 'flex-end',
    padding: 16,
  },
  slideTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  slideDate: {
    color: '#fff',
    fontSize: 12,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 16,
    left: 0,
    right: 0,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255,255,255,0.4)',
    marginHorizontal: 4,
  },
  paginationDotActive: {
    backgroundColor: '#fff',
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

export default HomeScreen; 
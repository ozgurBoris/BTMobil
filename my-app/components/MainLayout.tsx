import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useLanguage } from '../context/LanguageContext';

type RootStackParamList = {
  Home: undefined;
  CampusMap: undefined;
  Ring: undefined;
  Menu: undefined;
  Settings: undefined;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute();
  const { isEnglish } = useLanguage();
  const activeTab = route.name === 'Home' ? 0 : 
                   route.name === 'CampusMap' ? 1 : 
                   route.name === 'Ring' ? 2 : 
                   route.name === 'Menu' ? 3 : 
                   route.name === 'Settings' ? 4 : -1;

  const getTabName = (index: number) => {
    switch(index) {
      case 0:
        return isEnglish ? 'Home' : 'Ana Sayfa';
      case 1:
        return isEnglish ? 'Campus Map' : 'Kampüs Harita';
      case 2:
        return isEnglish ? 'Ring Schedule' : 'Ring Saatleri';
      case 3:
        return isEnglish ? 'Weekly Menu' : 'Yemek Listesi';
      case 4:
        return isEnglish ? 'Options' : 'Seçenekler';
      default:
        return '';
    }
  };

  const handleTabPress = (index: number) => {
    if (index === 0) navigation.navigate('Home');
    if (index === 1) navigation.navigate('CampusMap');
    if (index === 2) navigation.navigate('Ring');
    if (index === 3) navigation.navigate('Menu');
    if (index === 4) navigation.navigate('Settings');
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {children}
      </View>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        {[1, 2, 3, 4, 5].map((num, index) => (
          <TouchableOpacity 
            key={num}
            style={[styles.navButton, index === activeTab && styles.navButtonActive]}
            onPress={() => handleTabPress(index)}
          >
            <Ionicons 
              name={index === 0 ? "home" : 
                    index === 1 ? "map" : 
                    index === 2 ? "bus" : 
                    index === 3 ? "mail" : 
                    index === 4 ? "menu" : 
                    "menu"} 
              size={24} 
              color={index === activeTab ? "#192f6a" : "#ffffff"}
            />
            <Text style={[
              styles.navButtonText,
              index === activeTab && styles.navButtonTextActive
            ]}>
              {getTabName(index)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1e3c72',
  },
  content: {
    flex: 1,
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    padding: 8,
    paddingHorizontal: 6,
    backgroundColor: '#2a4d8f',
    borderTopWidth: 1,
    borderTopColor: '#1e3c72',
    paddingBottom: Platform.OS === 'ios' ? 20 : 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  navButton: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 6,
    minWidth: 65,
    borderRadius: 20,
    flex: 1,
    marginHorizontal: 3,
  },
  navButtonActive: {
    backgroundColor: '#e8eaf6',
  },
  navButtonText: {
    fontSize: 11,
    color: '#ffffff',
    marginTop: 4,
    textAlign: 'center',
  },
  navButtonTextActive: {
    color: '#192f6a',
    fontWeight: 'bold',
  },
});

export default MainLayout; 
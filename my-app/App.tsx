import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LanguageProvider } from './context/LanguageContext';
import { AuthProvider } from './context/AuthContext';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import CampusMapScreen from './screens/CampusMapScreen';
import MenuScreen from './screens/MenuScreen';
import WeatherScreen from './screens/WeatherScreen';
import RingScreen from './screens/RingScreen';
import EventsScreen from './screens/EventsScreen';
import EventManagementScreen from './screens/EventManagementScreen';
import FacultyExamsScreen from './screens/FacultyExamsScreen';
import SettingsScreen from './screens/SettingsScreen';
import AcademicCalendarScreen from './screens/AcademicCalendarScreen';
import SplashScreen from './screens/SplashScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <AuthProvider>
      <LanguageProvider>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="Splash"
            screenOptions={{
              headerShown: false,
            }}
          >
            <Stack.Screen name="Splash" component={SplashScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="CampusMap" component={CampusMapScreen} />
            <Stack.Screen name="Menu" component={MenuScreen} />
            <Stack.Screen name="Weather" component={WeatherScreen} />
            <Stack.Screen name="Ring" component={RingScreen} />
            <Stack.Screen name="Events" component={EventsScreen} />
            <Stack.Screen name="EventManagement" component={EventManagementScreen} />
            <Stack.Screen name="FacultyExams" component={FacultyExamsScreen} />
            <Stack.Screen name="Settings" component={SettingsScreen} />
            <Stack.Screen name="AcademicCalendar" component={AcademicCalendarScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </LanguageProvider>
    </AuthProvider>
  );
}


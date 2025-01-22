import React from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import ImageViewer from 'react-native-image-zoom-viewer';
import MainLayout from '../components/MainLayout';

const { width, height } = Dimensions.get('window');

interface CampusMapScreenProps {
  navigation: NavigationProp<any>;
}

const CampusMapScreen = ({ navigation }: CampusMapScreenProps) => {
  const images = [{
    url: '',
    props: {
      source: require('../assets/campus-map.jpg')
    }
  }];

  return (
    <MainLayout>
      <StatusBar backgroundColor="#2a4d8f" barStyle="light-content" />
      <SafeAreaView style={styles.container}>
        <View style={styles.mapContainer}>
          <ImageViewer
            imageUrls={images}
            backgroundColor="#1e3c72"
            enableSwipeDown={false}
            saveToLocalByLongPress={false}
            renderIndicator={() => <View />}
            enableImageZoom={true}
            maxOverflow={300}
          />
        </View>
      </SafeAreaView>
    </MainLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1e3c72',
  },
  mapContainer: {
    flex: 1,
  },
});

export default CampusMapScreen; 
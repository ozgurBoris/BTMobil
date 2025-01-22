import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  Linking,
  Modal,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import MainLayout from '../components/MainLayout';
import { useLanguage } from '../context/LanguageContext';

const FacultyExamsScreen = () => {
  const { isEnglish } = useLanguage();
  const [selectedType, setSelectedType] = useState<'faculties' | 'schools'>('faculties');
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [selectedDepartment, setSelectedDepartment] = useState<any>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const institutions = {
    faculties: [
      {
        id: 1,
        title: isEnglish ? 'Faculty of Dentistry' : 'Diş Hekimliği Fakültesi',
        url: 'https://dishek.akdeniz.edu.tr',
        colors: ['#FF512F', '#DD2476', '#DD2476'] as const,
        departments: [
          {
            id: 'dent1',
            title: isEnglish ? 'Dentistry' : 'Diş Hekimliği',
            url: 'https://dishek.akdeniz.edu.tr'
          }
        ]
      },
      {
        id: 2,
        title: isEnglish ? 'Faculty of Literature' : 'Edebiyat Fakültesi',
        url: 'https://edebiyat.akdeniz.edu.tr',
        colors: ['#1FA2FF', '#12D8FA', '#12D8FA'] as const,
        departments: [
          {
            id: 'lit1',
            title: isEnglish ? 'Turkish Language and Literature' : 'Türk Dili ve Edebiyatı',
            url: 'https://edebiyat.akdeniz.edu.tr'
          },
          {
            id: 'lit2',
            title: isEnglish ? 'English Language and Literature' : 'İngiliz Dili ve Edebiyatı',
            url: 'https://edebiyat.akdeniz.edu.tr'
          },
          {
            id: 'lit3',
            title: isEnglish ? 'History' : 'Tarih',
            url: 'https://edebiyat.akdeniz.edu.tr'
          },
          {
            id: 'lit4',
            title: isEnglish ? 'Philosophy' : 'Felsefe',
            url: 'https://edebiyat.akdeniz.edu.tr'
          },
          {
            id: 'lit5',
            title: isEnglish ? 'Sociology' : 'Sosyoloji',
            url: 'https://edebiyat.akdeniz.edu.tr'
          }
        ]
      },
      {
        id: 3,
        title: isEnglish ? 'Faculty of Education' : 'Eğitim Fakültesi',
        url: 'https://egitim.akdeniz.edu.tr',
        colors: ['#11998e', '#38ef7d', '#38ef7d'] as const,
        departments: [
          {
            id: 'edu1',
            title: isEnglish ? 'Computer Education and Instructional Technology' : 'Bilgisayar ve Öğretim Teknolojileri Eğitimi',
            url: 'https://egitim.akdeniz.edu.tr'
          },
          {
            id: 'edu2',
            title: isEnglish ? 'Mathematics Education' : 'Matematik Eğitimi',
            url: 'https://egitim.akdeniz.edu.tr'
          },
          {
            id: 'edu3',
            title: isEnglish ? 'Science Education' : 'Fen Bilgisi Eğitimi',
            url: 'https://egitim.akdeniz.edu.tr'
          },
          {
            id: 'edu4',
            title: isEnglish ? 'Primary School Education' : 'Sınıf Eğitimi',
            url: 'https://egitim.akdeniz.edu.tr'
          },
          {
            id: 'edu5',
            title: isEnglish ? 'Preschool Education' : 'Okul Öncesi Eğitimi',
            url: 'https://egitim.akdeniz.edu.tr'
          }
        ]
      },
      {
        id: 4,
        title: isEnglish ? 'Faculty of Science' : 'Fen Fakültesi',
        url: 'https://fef.akdeniz.edu.tr',
        colors: ['#4e54c8', '#8f94fb', '#8f94fb'] as const,
        departments: [
          {
            id: 'sci1',
            title: isEnglish ? 'Mathematics' : 'Matematik',
            url: 'https://fef.akdeniz.edu.tr'
          },
          {
            id: 'sci2',
            title: isEnglish ? 'Physics' : 'Fizik',
            url: 'https://fef.akdeniz.edu.tr'
          },
          {
            id: 'sci3',
            title: isEnglish ? 'Chemistry' : 'Kimya',
            url: 'https://fef.akdeniz.edu.tr'
          },
          {
            id: 'sci4',
            title: isEnglish ? 'Biology' : 'Biyoloji',
            url: 'https://fef.akdeniz.edu.tr'
          },
          {
            id: 'sci5',
            title: isEnglish ? 'Space Sciences and Technologies' : 'Uzay Bilimleri ve Teknolojileri',
            url: 'https://fef.akdeniz.edu.tr'
          }
        ]
      },
      {
        id: 5,
        title: isEnglish ? 'Faculty of Fine Arts' : 'Güzel Sanatlar Fakültesi',
        url: 'https://gsf.akdeniz.edu.tr',
        colors: ['#FF512F', '#F09819', '#F09819'] as const,
        departments: [
          {
            id: 'art1',
            title: isEnglish ? 'Painting' : 'Resim',
            url: 'https://gsf.akdeniz.edu.tr'
          },
          {
            id: 'art2',
            title: isEnglish ? 'Sculpture' : 'Heykel',
            url: 'https://gsf.akdeniz.edu.tr'
          },
          {
            id: 'art3',
            title: isEnglish ? 'Graphic Design' : 'Grafik Tasarım',
            url: 'https://gsf.akdeniz.edu.tr'
          },
          {
            id: 'art4',
            title: isEnglish ? 'Traditional Turkish Arts' : 'Geleneksel Türk Sanatları',
            url: 'https://gsf.akdeniz.edu.tr'
          },
          {
            id: 'art5',
            title: isEnglish ? 'Ceramics' : 'Seramik',
            url: 'https://gsf.akdeniz.edu.tr'
          },
          {
            id: 'art6',
            title: isEnglish ? 'Photography' : 'Fotoğraf',
            url: 'https://gsf.akdeniz.edu.tr'
          }
        ]
      },
      {
        id: 6,
        title: isEnglish ? 'Faculty of Nursing' : 'Hemşirelik Fakültesi',
        url: 'https://hemsirelik.akdeniz.edu.tr',
        colors: ['#764BA2', '#667EEA', '#667EEA'] as const,
        departments: [
          {
            id: 'nurse1',
            title: isEnglish ? 'Nursing' : 'Hemşirelik',
            url: 'https://hemsirelik.akdeniz.edu.tr/bolumler/hemsirelik'
          }
        ]
      },
      {
        id: 7,
        title: isEnglish ? 'Faculty of Law' : 'Hukuk Fakültesi',
        url: 'https://hukuk.akdeniz.edu.tr',
        colors: ['#11998e', '#38ef7d', '#38ef7d'] as const,
        departments: [
          {
            id: 'law1',
            title: isEnglish ? 'Law' : 'Hukuk',
            url: 'https://hukuk.akdeniz.edu.tr/bolumler/hukuk'
          }
        ]
      },
      {
        id: 8,
        title: isEnglish ? 'Faculty of Economics and Administrative Sciences' : 'İktisadi ve İdari Bilimler Fakültesi',
        url: 'https://iibf.akdeniz.edu.tr',
        colors: ['#4B79A1', '#283E51', '#283E51'] as const,
        departments: [
          {
            id: 'econ1',
            title: isEnglish ? 'Economics' : 'İktisat',
            url: 'https://iibf.akdeniz.edu.tr'
          },
          {
            id: 'econ2',
            title: isEnglish ? 'Business Administration' : 'İşletme',
            url: 'https://iibf.akdeniz.edu.tr'
          },
          {
            id: 'econ3',
            title: isEnglish ? 'Public Administration' : 'Kamu Yönetimi',
            url: 'https://iibf.akdeniz.edu.tr'
          },
          {
            id: 'econ4',
            title: isEnglish ? 'International Relations' : 'Uluslararası İlişkiler',
            url: 'https://iibf.akdeniz.edu.tr'
          },
          {
            id: 'econ5',
            title: isEnglish ? 'Finance' : 'Maliye',
            url: 'https://iibf.akdeniz.edu.tr'
          },
          {
            id: 'econ6',
            title: isEnglish ? 'Econometrics' : 'Ekonometri',
            url: 'https://iibf.akdeniz.edu.tr'
          }
        ]
      },
      {
        id: 9,
        title: isEnglish ? 'Faculty of Theology' : 'İlahiyat Fakültesi',
        url: 'https://ilahiyat.akdeniz.edu.tr',
        colors: ['#FF512F', '#DD2476', '#DD2476'] as const,
        departments: [
          {
            id: 'theo1',
            title: isEnglish ? 'Basic Islamic Sciences' : 'Temel İslam Bilimleri',
            url: 'https://ilahiyat.akdeniz.edu.tr'
          },
          {
            id: 'theo2',
            title: isEnglish ? 'Philosophy and Religious Studies' : 'Felsefe ve Din Bilimleri',
            url: 'https://ilahiyat.akdeniz.edu.tr'
          },
          {
            id: 'theo3',
            title: isEnglish ? 'Islamic History and Arts' : 'İslam Tarihi ve Sanatları',
            url: 'https://ilahiyat.akdeniz.edu.tr'
          }
        ]
      },
      {
        id: 10,
        title: isEnglish ? 'Faculty of Communication' : 'İletişim Fakültesi',
        url: 'https://iletisim.akdeniz.edu.tr',
        colors: ['#1FA2FF', '#12D8FA', '#12D8FA'] as const,
        departments: [
          {
            id: 'comm1',
            title: isEnglish ? 'Journalism' : 'Gazetecilik',
            url: 'https://iletisim.akdeniz.edu.tr'
          },
          {
            id: 'comm2',
            title: isEnglish ? 'Public Relations and Publicity' : 'Halkla İlişkiler ve Tanıtım',
            url: 'https://iletisim.akdeniz.edu.tr'
          },
          {
            id: 'comm3',
            title: isEnglish ? 'Radio, Television and Cinema' : 'Radyo, Televizyon ve Sinema',
            url: 'https://iletisim.akdeniz.edu.tr'
          }
        ]
      },
      {
        id: 11,
        title: isEnglish ? 'Kemer Maritime Faculty' : 'Kemer Denizcilik Fakültesi',
        url: 'https://kemerdenizcilik.akdeniz.edu.tr',
        colors: ['#11998e', '#38ef7d', '#38ef7d'] as const,
        departments: [
          {
            id: 'mar1',
            title: isEnglish ? 'Maritime Transportation Management Engineering' : 'Deniz Ulaştırma İşletme Mühendisliği',
            url: 'https://kemerdenizcilik.akdeniz.edu.tr'
          },
          {
            id: 'mar2',
            title: isEnglish ? 'Marine Engineering' : 'Gemi Makineleri İşletme Mühendisliği',
            url: 'https://kemerdenizcilik.akdeniz.edu.tr'
          }
        ]
      },
      {
        id: 12,
        title: isEnglish ? 'Kumluca Faculty of Health Sciences' : 'Kumluca Sağlık Bilimleri Fakültesi',
        url: 'https://kumlucasaglik.akdeniz.edu.tr',
        colors: ['#4e54c8', '#8f94fb', '#8f94fb'] as const,
        departments: [
          {
            id: 'khealth1',
            title: isEnglish ? 'Nursing' : 'Hemşirelik',
            url: 'https://kumlucasaglik.akdeniz.edu.tr'
          },
          {
            id: 'khealth2',
            title: isEnglish ? 'Nutrition and Dietetics' : 'Beslenme ve Diyetetik',
            url: 'https://kumlucasaglik.akdeniz.edu.tr'
          }
        ]
      },
      {
        id: 13,
        title: isEnglish ? 'Faculty of Architecture' : 'Mimarlık Fakültesi',
        url: 'https://mimarlik.akdeniz.edu.tr',
        colors: ['#FF512F', '#F09819', '#F09819'] as const,
        departments: [
          {
            id: 'arch1',
            title: isEnglish ? 'Architecture' : 'Mimarlık',
            url: 'https://mimarlik.akdeniz.edu.tr'
          },
          {
            id: 'arch2',
            title: isEnglish ? 'City and Regional Planning' : 'Şehir ve Bölge Planlama',
            url: 'https://mimarlik.akdeniz.edu.tr'
          },
          {
            id: 'arch3',
            title: isEnglish ? 'Interior Architecture' : 'İç Mimarlık',
            url: 'https://mimarlik.akdeniz.edu.tr'
          }
        ]
      },
      {
        id: 14,
        title: isEnglish ? 'Faculty of Engineering' : 'Mühendislik Fakültesi',
        url: 'https://muhendislik.akdeniz.edu.tr',
        colors: ['#764BA2', '#667EEA', '#667EEA'] as const,
        departments: [
          {
            id: 'eng1',
            title: isEnglish ? 'Computer Engineering' : 'Bilgisayar Mühendisliği',
            url: 'https://muhendislik.akdeniz.edu.tr'
          },
          {
            id: 'eng2',
            title: isEnglish ? 'Electrical-Electronics Engineering' : 'Elektrik-Elektronik Mühendisliği',
            url: 'https://muhendislik.akdeniz.edu.tr'
          },
          {
            id: 'eng3',
            title: isEnglish ? 'Civil Engineering' : 'İnşaat Mühendisliği',
            url: 'https://muhendislik.akdeniz.edu.tr'
          },
          {
            id: 'eng4',
            title: isEnglish ? 'Mechanical Engineering' : 'Makine Mühendisliği',
            url: 'https://muhendislik.akdeniz.edu.tr'
          },
          {
            id: 'eng5',
            title: isEnglish ? 'Food Engineering' : 'Gıda Mühendisliği',
            url: 'https://muhendislik.akdeniz.edu.tr'
          },
          {
            id: 'eng6',
            title: isEnglish ? 'Environmental Engineering' : 'Çevre Mühendisliği',
            url: 'https://muhendislik.akdeniz.edu.tr'
          },
          {
            id: 'eng7',
            title: isEnglish ? 'Industrial Engineering' : 'Endüstri Mühendisliği',
            url: 'https://muhendislik.akdeniz.edu.tr'
          },
          {
            id: 'eng8',
            title: isEnglish ? 'Geomatics Engineering' : 'Harita Mühendisliği',
            url: 'https://muhendislik.akdeniz.edu.tr'
          }
        ]
      },
      {
        id: 15,
        title: isEnglish ? 'Faculty of Health Sciences' : 'Sağlık Bilimleri Fakültesi',
        url: 'https://saglikbilimleri.akdeniz.edu.tr',
        colors: ['#11998e', '#38ef7d', '#38ef7d'] as const,
        departments: [
          {
            id: 'health1',
            title: isEnglish ? 'Social Work' : 'Sosyal Hizmet',
            url: 'https://saglikbilimleri.akdeniz.edu.tr'
          },
          {
            id: 'health2',
            title: isEnglish ? 'Nutrition and Dietetics' : 'Beslenme ve Diyetetik',
            url: 'https://saglikbilimleri.akdeniz.edu.tr'
          },
          {
            id: 'health3',
            title: isEnglish ? 'Physiotherapy and Rehabilitation' : 'Fizyoterapi ve Rehabilitasyon',
            url: 'https://saglikbilimleri.akdeniz.edu.tr'
          },
          {
            id: 'health4',
            title: isEnglish ? 'Health Management' : 'Sağlık Yönetimi',
            url: 'https://saglikbilimleri.akdeniz.edu.tr'
          }
        ]
      },
      {
        id: 16,
        title: isEnglish ? 'Faculty of Sports Sciences' : 'Spor Bilimleri Fakültesi',
        url: 'https://sporbilimleri.akdeniz.edu.tr',
        colors: ['#4B79A1', '#283E51', '#283E51'] as const,
        departments: [
          {
            id: 'sport1',
            title: isEnglish ? 'Physical Education and Sports Teaching' : 'Beden Eğitimi ve Spor Öğretmenliği',
            url: 'https://sporbilimleri.akdeniz.edu.tr'
          },
          {
            id: 'sport2',
            title: isEnglish ? 'Sports Management' : 'Spor Yöneticiliği',
            url: 'https://sporbilimleri.akdeniz.edu.tr'
          },
          {
            id: 'sport3',
            title: isEnglish ? 'Coaching Education' : 'Antrenörlük Eğitimi',
            url: 'https://sporbilimleri.akdeniz.edu.tr'
          },
          {
            id: 'sport4',
            title: isEnglish ? 'Recreation' : 'Rekreasyon',
            url: 'https://sporbilimleri.akdeniz.edu.tr'
          }
        ]
      },
      {
        id: 17,
        title: isEnglish ? 'Faculty of Medicine' : 'Tıp Fakültesi',
        url: 'https://tip.akdeniz.edu.tr',
        colors: ['#FF512F', '#DD2476', '#DD2476'] as const,
        departments: [
          {
            id: 'med1',
            title: isEnglish ? 'Medicine' : 'Tıp',
            url: 'https://tip.akdeniz.edu.tr/bolumler/tip'
          }
        ]
      },
      {
        id: 18,
        title: isEnglish ? 'Faculty of Tourism' : 'Turizm Fakültesi',
        url: 'https://turizm.akdeniz.edu.tr',
        colors: ['#1FA2FF', '#12D8FA', '#12D8FA'] as const,
        departments: [
          {
            id: 'tour1',
            title: isEnglish ? 'Tourism Management' : 'Turizm İşletmeciliği',
            url: 'https://turizm.akdeniz.edu.tr'
          },
          {
            id: 'tour2',
            title: isEnglish ? 'Tourism Guidance' : 'Turizm Rehberliği',
            url: 'https://turizm.akdeniz.edu.tr'
          },
          {
            id: 'tour3',
            title: isEnglish ? 'Gastronomy and Culinary Arts' : 'Gastronomi ve Mutfak Sanatları',
            url: 'https://turizm.akdeniz.edu.tr'
          }
        ]
      },
      {
        id: 19,
        title: isEnglish ? 'Faculty of Applied Sciences' : 'Uygulamalı Bilimler Fakültesi',
        url: 'https://ubf.akdeniz.edu.tr',
        colors: ['#11998e', '#38ef7d', '#38ef7d'] as const,
        departments: [
          {
            id: 'applied1',
            title: isEnglish ? 'International Trade and Logistics' : 'Uluslararası Ticaret ve Lojistik',
            url: 'https://ubf.akdeniz.edu.tr'
          },
          {
            id: 'applied2',
            title: isEnglish ? 'Banking and Finance' : 'Bankacılık ve Finans',
            url: 'https://ubf.akdeniz.edu.tr'
          },
          {
            id: 'applied3',
            title: isEnglish ? 'Management Information Systems' : 'Yönetim Bilişim Sistemleri',
            url: 'https://ubf.akdeniz.edu.tr'
          }
        ]
      },
      {
        id: 20,
        title: isEnglish ? 'Faculty of Agriculture' : 'Ziraat Fakültesi',
        url: 'https://ziraat.akdeniz.edu.tr',
        colors: ['#4e54c8', '#8f94fb', '#8f94fb'] as const,
        departments: [
          {
            id: 'agr1',
            title: isEnglish ? 'Agricultural Economics' : 'Tarım Ekonomisi',
            url: 'https://ziraat.akdeniz.edu.tr'
          },
          {
            id: 'agr2',
            title: isEnglish ? 'Agricultural Machinery and Technologies Engineering' : 'Tarım Makineleri ve Teknolojileri Mühendisliği',
            url: 'https://ziraat.akdeniz.edu.tr'
          },
          {
            id: 'agr3',
            title: isEnglish ? 'Agricultural Structures and Irrigation' : 'Tarımsal Yapılar ve Sulama',
            url: 'https://ziraat.akdeniz.edu.tr'
          },
          {
            id: 'agr4',
            title: isEnglish ? 'Animal Science' : 'Zootekni',
            url: 'https://ziraat.akdeniz.edu.tr'
          },
          {
            id: 'agr5',
            title: isEnglish ? 'Horticulture' : 'Bahçe Bitkileri',
            url: 'https://ziraat.akdeniz.edu.tr'
          },
          {
            id: 'agr6',
            title: isEnglish ? 'Plant Protection' : 'Bitki Koruma',
            url: 'https://ziraat.akdeniz.edu.tr'
          },
          {
            id: 'agr7',
            title: isEnglish ? 'Field Crops' : 'Tarla Bitkileri',
            url: 'https://ziraat.akdeniz.edu.tr'
          },
          {
            id: 'agr8',
            title: isEnglish ? 'Soil Science and Plant Nutrition' : 'Toprak Bilimi ve Bitki Besleme',
            url: 'https://ziraat.akdeniz.edu.tr'
          }
        ]
      }
    ],
    schools: [
      {
        id: 21,
        title: isEnglish ? 'School of Justice' : 'Adalet MYO',
        url: 'https://adaletmyo.akdeniz.edu.tr',
        colors: ['#FF512F', '#F09819', '#F09819'] as const,
        departments: [
          {
            id: 'law1',
            title: isEnglish ? 'Justice' : 'Adalet',
            url: 'https://adaletmyo.akdeniz.edu.tr/programlar/adalet'
          }
        ]
      },
      {
        id: 22,
        title: isEnglish ? 'Demre Dr. Hasan Ünal Vocational School' : 'Demre Dr. Hasan Ünal MYO',
        url: 'https://demremyo.akdeniz.edu.tr',
        colors: ['#764BA2', '#667EEA', '#667EEA'] as const,
        departments: [
          {
            id: 'demre1',
            title: isEnglish ? 'Tourism and Hotel Management' : 'Turizm ve Otel İşletmeciliği',
            url: 'https://demremyo.akdeniz.edu.tr/programlar/turizm-ve-otel-isletmeciligi'
          },
          {
            id: 'demre2',
            title: isEnglish ? 'Tourism and Travel Services' : 'Turizm ve Seyahat Hizmetleri',
            url: 'https://demremyo.akdeniz.edu.tr/programlar/turizm-ve-seyahat-hizmetleri'
          }
        ]
      },
      {
        id: 23,
        title: isEnglish ? 'Elmalı Vocational School' : 'Elmalı MYO',
        url: 'https://elmalimyo.akdeniz.edu.tr',
        colors: ['#11998e', '#38ef7d', '#38ef7d'] as const,
        departments: [
          {
            id: 'elmali1',
            title: isEnglish ? 'Computer Programming' : 'Bilgisayar Programcılığı',
            url: 'https://elmalimyo.akdeniz.edu.tr/programlar/bilgisayar-programciligi'
          },
          {
            id: 'elmali2',
            title: isEnglish ? 'Accounting and Tax Applications' : 'Muhasebe ve Vergi Uygulamaları',
            url: 'https://elmalimyo.akdeniz.edu.tr/programlar/muhasebe-ve-vergi-uygulamalari'
          },
          {
            id: 'elmali3',
            title: isEnglish ? 'Business Management' : 'İşletme Yönetimi',
            url: 'https://elmalimyo.akdeniz.edu.tr/programlar/isletme-yonetimi'
          }
        ]
      },
      {
        id: 24,
        title: isEnglish ? 'Finike Vocational School' : 'Finike MYO',
        url: 'https://finikemyo.akdeniz.edu.tr',
        colors: ['#4776E6', '#8E54E9', '#8E54E9'] as const,
        departments: [
          {
            id: 'finike1',
            title: isEnglish ? 'Maritime Transportation and Management' : 'Deniz Ulaştırma ve İşletme',
            url: 'https://finikemyo.akdeniz.edu.tr/programlar/deniz-ulastirma-ve-isletme'
          },
          {
            id: 'finike2',
            title: isEnglish ? 'Marine Engineering' : 'Gemi Makineleri İşletme',
            url: 'https://finikemyo.akdeniz.edu.tr/programlar/gemi-makineleri-isletme'
          }
        ]
      },
      {
        id: 25,
        title: isEnglish ? 'Göynük Culinary Arts Vocational School' : 'Göynük Mutfak Sanatları MYO',
        url: 'https://goynukmyo.akdeniz.edu.tr',
        colors: ['#FF512F', '#DD2476', '#DD2476'] as const,
        departments: [
          {
            id: 'goynuk1',
            title: isEnglish ? 'Culinary Arts' : 'Aşçılık',
            url: 'https://goynukmyo.akdeniz.edu.tr/programlar/ascilik'
          },
          {
            id: 'goynuk2',
            title: isEnglish ? 'Pastry and Bakery' : 'Pastacılık ve Fırıncılık',
            url: 'https://goynukmyo.akdeniz.edu.tr/programlar/pastacilik-ve-firincilik'
          }
        ]
      },
      {
        id: 26,
        title: isEnglish ? 'Korkuteli Vocational School' : 'Korkuteli MYO',
        url: 'https://korkmyo.akdeniz.edu.tr',
        colors: ['#00B4DB', '#0083B0', '#0083B0'] as const,
        departments: [
          {
            id: 'korkuteli1',
            title: isEnglish ? 'Computer Programming' : 'Bilgisayar Programcılığı',
            url: 'https://korkmyo.akdeniz.edu.tr/programlar/bilgisayar-programciligi'
          },
          {
            id: 'korkuteli2',
            title: isEnglish ? 'Accounting and Tax Applications' : 'Muhasebe ve Vergi Uygulamaları',
            url: 'https://korkmyo.akdeniz.edu.tr/programlar/muhasebe-ve-vergi-uygulamalari'
          },
          {
            id: 'korkuteli3',
            title: isEnglish ? 'Business Management' : 'İşletme Yönetimi',
            url: 'https://korkmyo.akdeniz.edu.tr/programlar/isletme-yonetimi'
          },
          {
            id: 'korkuteli4',
            title: isEnglish ? 'Banking and Insurance' : 'Bankacılık ve Sigortacılık',
            url: 'https://korkmyo.akdeniz.edu.tr/programlar/bankacilik-ve-sigortacilik'
          }
        ]
      },
      {
        id: 27,
        title: isEnglish ? 'Kumluca Vocational School' : 'Kumluca MYO',
        url: 'https://kumlucamyo.akdeniz.edu.tr',
        colors: ['#2193b0', '#6dd5ed', '#6dd5ed'] as const,
        departments: [
          {
            id: 'kumluca1',
            title: isEnglish ? 'Organic Agriculture' : 'Organik Tarım',
            url: 'https://kumlucamyo.akdeniz.edu.tr/programlar/organik-tarim'
          },
          {
            id: 'kumluca2',
            title: isEnglish ? 'Greenhouse' : 'Seracılık',
            url: 'https://kumlucamyo.akdeniz.edu.tr/programlar/seracilik'
          },
          {
            id: 'kumluca3',
            title: isEnglish ? 'Plant Protection' : 'Bitki Koruma',
            url: 'https://kumlucamyo.akdeniz.edu.tr/programlar/bitki-koruma'
          }
        ]
      },
      {
        id: 28,
        title: isEnglish ? 'Manavgat Vocational School' : 'Manavgat MYO',
        url: 'https://manavgatmyo.akdeniz.edu.tr',
        colors: ['#FF416C', '#FF4B2B', '#FF4B2B'] as const,
        departments: [
          {
            id: 'manavgat1',
            title: isEnglish ? 'Tourism and Hotel Management' : 'Turizm ve Otel İşletmeciliği',
            url: 'https://manavgatmyo.akdeniz.edu.tr/programlar/turizm-ve-otel-isletmeciligi'
          },
          {
            id: 'manavgat2',
            title: isEnglish ? 'Tourism and Travel Services' : 'Turizm ve Seyahat Hizmetleri',
            url: 'https://manavgatmyo.akdeniz.edu.tr/programlar/turizm-ve-seyahat-hizmetleri'
          },
          {
            id: 'manavgat3',
            title: isEnglish ? 'Computer Programming' : 'Bilgisayar Programcılığı',
            url: 'https://manavgatmyo.akdeniz.edu.tr/programlar/bilgisayar-programciligi'
          },
          {
            id: 'manavgat4',
            title: isEnglish ? 'Business Management' : 'İşletme Yönetimi',
            url: 'https://manavgatmyo.akdeniz.edu.tr/programlar/isletme-yonetimi'
          }
        ]
      },
      {
        id: 29,
        title: isEnglish ? 'Health Services Vocational School' : 'Sağlık Hizmetleri MYO',
        url: 'https://shmyo.akdeniz.edu.tr',
        colors: ['#FF512F', '#F09819', '#F09819'] as const,
        departments: [
          {
            id: 'health1',
            title: isEnglish ? 'First Aid and Emergency' : 'İlk ve Acil Yardım',
            url: 'https://shmyo.akdeniz.edu.tr/programlar/ilk-ve-acil-yardim'
          },
          {
            id: 'health2',
            title: isEnglish ? 'Medical Laboratory Techniques' : 'Tıbbi Laboratuvar Teknikleri',
            url: 'https://shmyo.akdeniz.edu.tr/programlar/tibbi-laboratuvar-teknikleri'
          },
          {
            id: 'health3',
            title: isEnglish ? 'Medical Imaging Techniques' : 'Tıbbi Görüntüleme Teknikleri',
            url: 'https://shmyo.akdeniz.edu.tr/programlar/tibbi-goruntuleme-teknikleri'
          }
        ]
      },
      {
        id: 30,
        title: isEnglish ? 'Serik Gülsün-Süleyman Süral Vocational School' : 'Serik Gülsün-Süleyman Süral MYO',
        url: 'https://serikmyo.akdeniz.edu.tr',
        colors: ['#1D976C', '#93F9B9', '#93F9B9'] as const,
        departments: [
          {
            id: 'serik1',
            title: isEnglish ? 'Tourism and Hotel Management' : 'Turizm ve Otel İşletmeciliği',
            url: 'https://serikmyo.akdeniz.edu.tr/programlar/turizm-ve-otel-isletmeciligi'
          },
          {
            id: 'serik2',
            title: isEnglish ? 'Tourism and Travel Services' : 'Turizm ve Seyahat Hizmetleri',
            url: 'https://serikmyo.akdeniz.edu.tr/programlar/turizm-ve-seyahat-hizmetleri'
          },
          {
            id: 'serik3',
            title: isEnglish ? 'Culinary Arts' : 'Aşçılık',
            url: 'https://serikmyo.akdeniz.edu.tr/programlar/ascilik'
          }
        ]
      },
      {
        id: 31,
        title: isEnglish ? 'Social Sciences Vocational School' : 'Sosyal Bilimler MYO',
        url: 'https://sbmyo.akdeniz.edu.tr',
        colors: ['#11998e', '#38ef7d', '#38ef7d'] as const,
        departments: [
          {
            id: 'social1',
            title: isEnglish ? 'Office Management and Executive Assistance' : 'Büro Yönetimi ve Yönetici Asistanlığı',
            url: 'https://sbmyo.akdeniz.edu.tr/programlar/buro-yonetimi-ve-yonetici-asistanligi'
          },
          {
            id: 'social2',
            title: isEnglish ? 'Foreign Trade' : 'Dış Ticaret',
            url: 'https://sbmyo.akdeniz.edu.tr/programlar/dis-ticaret'
          },
          {
            id: 'social3',
            title: isEnglish ? 'Tourism and Hotel Management' : 'Turizm ve Otel İşletmeciliği',
            url: 'https://sbmyo.akdeniz.edu.tr/programlar/turizm-ve-otel-isletmeciligi'
          },
          {
            id: 'social4',
            title: isEnglish ? 'Tourism and Travel Services' : 'Turizm ve Seyahat Hizmetleri',
            url: 'https://sbmyo.akdeniz.edu.tr/programlar/turizm-ve-seyahat-hizmetleri'
          }
        ]
      },
      {
        id: 32,
        title: isEnglish ? 'Technical Sciences Vocational School' : 'Teknik Bilimler MYO',
        url: 'https://tbmyo.akdeniz.edu.tr',
        colors: ['#4B79A1', '#283E51', '#283E51'] as const,
        departments: [
          {
            id: 'tech1',
            title: isEnglish ? 'Computer Programming' : 'Bilgisayar Programcılığı',
            url: 'https://tbmyo.akdeniz.edu.tr/programlar/bilgisayar-programciligi'
          },
          {
            id: 'tech2',
            title: isEnglish ? 'Electric' : 'Elektrik',
            url: 'https://tbmyo.akdeniz.edu.tr/programlar/elektrik'
          },
          {
            id: 'tech3',
            title: isEnglish ? 'Electronics Technology' : 'Elektronik Teknolojisi',
            url: 'https://tbmyo.akdeniz.edu.tr/programlar/elektronik-teknolojisi'
          },
          {
            id: 'tech4',
            title: isEnglish ? 'Construction Technology' : 'İnşaat Teknolojisi',
            url: 'https://tbmyo.akdeniz.edu.tr/programlar/insaat-teknolojisi'
          },
          {
            id: 'tech5',
            title: isEnglish ? 'Air Conditioning and Refrigeration Technology' : 'İklimlendirme ve Soğutma Teknolojisi',
            url: 'https://tbmyo.akdeniz.edu.tr/programlar/iklimlendirme-ve-sogutma-teknolojisi'
          },
          {
            id: 'tech6',
            title: isEnglish ? 'Machinery' : 'Makine',
            url: 'https://tbmyo.akdeniz.edu.tr/programlar/makine'
          },
          {
            id: 'tech7',
            title: isEnglish ? 'Automotive Technology' : 'Otomotiv Teknolojisi',
            url: 'https://tbmyo.akdeniz.edu.tr/programlar/otomotiv-teknolojisi'
          }
        ]
      }
    ]
  };

  const getDepartmentInfo = (department: string) => {
    type DepartmentInfoType = {
      [key: string]: {
        title: string;
        description: string;
      };
    };

    const departmentInfo: DepartmentInfoType = {
      'applied3': {
        title: isEnglish ? 'What is Management Information Systems?' : 'Yönetim Bilişim Sistemleri Nedir?',
        description: isEnglish ? 
          'Management Information Systems (MIS) is an interdisciplinary field that combines business management and information technology. The program aims to train professionals who can effectively manage information systems in organizations. Students learn about database management, system analysis and design, programming, business processes, and digital transformation. Graduates can work as IT managers, system analysts, project managers, or business analysts in various sectors.' 
          : 
          'Yönetim Bilişim Sistemleri (YBS), işletme yönetimi ve bilişim teknolojilerini birleştiren disiplinler arası bir alandır. Program, organizasyonlarda bilgi sistemlerini etkin bir şekilde yönetebilecek profesyoneller yetiştirmeyi amaçlar. Öğrenciler veritabanı yönetimi, sistem analizi ve tasarımı, programlama, iş süreçleri ve dijital dönüşüm konularında eğitim alırlar. Mezunlar, çeşitli sektörlerde BT yöneticisi, sistem analisti, proje yöneticisi veya iş analisti olarak çalışabilirler.'
      },
      'econ2': {
        title: isEnglish ? 'What is Business Administration?' : 'İşletme Nedir?',
        description: isEnglish ?
          'Business Administration is a field that focuses on the management and operation of organizations. Students learn about management principles, marketing, finance, accounting, human resources, and strategic planning. The program prepares graduates for leadership roles in various business sectors. They develop skills in decision-making, problem-solving, and organizational management. Graduates can work as managers, entrepreneurs, consultants, or specialists in different business functions.'
          :
          'İşletme, organizasyonların yönetimi ve işleyişi üzerine odaklanan bir alandır. Öğrenciler yönetim ilkeleri, pazarlama, finans, muhasebe, insan kaynakları ve stratejik planlama konularında eğitim alırlar. Program, mezunları çeşitli iş sektörlerindeki liderlik rollerine hazırlar. Karar verme, problem çözme ve organizasyonel yönetim becerilerini geliştirirler. Mezunlar, yönetici, girişimci, danışman veya farklı iş fonksiyonlarında uzman olarak çalışabilirler.'
      },
      'econ1': {
        title: isEnglish ? 'What is Economics?' : 'İktisat Nedir?',
        description: isEnglish ?
          'Economics is a social science that studies the production, distribution, and consumption of goods and services. The program covers microeconomics, macroeconomics, econometrics, and economic policies. Students learn to analyze economic data, understand market dynamics, and evaluate economic policies. Graduates can work in public institutions, private sector, research organizations, or international organizations as economists, analysts, or researchers.'
          :
          'İktisat, mal ve hizmetlerin üretimi, dağıtımı ve tüketimini inceleyen bir sosyal bilimdir. Program mikroekonomi, makroekonomi, ekonometri ve ekonomi politikalarını kapsar. Öğrenciler ekonomik verileri analiz etmeyi, piyasa dinamiklerini anlamayı ve ekonomi politikalarını değerlendirmeyi öğrenirler. Mezunlar, kamu kurumlarında, özel sektörde, araştırma kuruluşlarında veya uluslararası organizasyonlarda ekonomist, analist veya araştırmacı olarak çalışabilirler.'
      },
      'econ5': {
        title: isEnglish ? 'What is Public Finance?' : 'Maliye Nedir?',
        description: isEnglish ?
          'Public Finance focuses on government revenue, expenditure, and debt management. Students study taxation, public expenditure, fiscal policy, and budget management. The program prepares professionals who can analyze and implement financial policies in the public sector. Graduates often work in government institutions, tax offices, or private sector organizations dealing with public finance.'
          :
          'Maliye, devlet geliri, harcamaları ve borç yönetimi üzerine odaklanır. Öğrenciler vergilendirme, kamu harcamaları, maliye politikası ve bütçe yönetimi konularında eğitim alırlar. Program, kamu sektöründe mali politikaları analiz edebilen ve uygulayabilen profesyoneller yetiştirir. Mezunlar genellikle devlet kurumlarında, vergi dairelerinde veya kamu maliyesiyle ilgili özel sektör kuruluşlarında çalışırlar.'
      },
      'applied1': {
        title: isEnglish ? 'What is International Trade?' : 'Uluslararası Ticaret Nedir?',
        description: isEnglish ?
          'International Trade focuses on global business operations and cross-border trade. Students learn about international marketing, logistics, customs procedures, and trade finance. The program covers international business law, global markets, and trade agreements. Graduates can work in import-export companies, logistics firms, international companies, or customs consultancy firms.'
          :
          'Uluslararası Ticaret, küresel iş operasyonları ve sınır ötesi ticaret üzerine odaklanır. Öğrenciler uluslararası pazarlama, lojistik, gümrük işlemleri ve ticaret finansmanı konularında eğitim alırlar. Program uluslararası ticaret hukuku, küresel pazarlar ve ticaret anlaşmalarını kapsar. Mezunlar ithalat-ihracat şirketlerinde, lojistik firmalarında, uluslararası şirketlerde veya gümrük müşavirlik firmalarında çalışabilirler.'
      }
    };
    return departmentInfo[department] || null;
  };

  const handleInstitutionPress = (institution: any) => {
    if (institution.departments) {
      setExpandedId(expandedId === institution.id ? null : institution.id);
    } else {
      Linking.openURL(institution.url).catch(error => {
        console.error('Link açılamadı:', error);
      });
    }
  };

  const handleDepartmentPress = (department: any) => {
    const info = getDepartmentInfo(department.id);
    setSelectedDepartment({ ...department, info });
    setModalVisible(true);
  };

  const renderDepartments = (institution: any) => {
    if (expandedId !== institution.id) return null;

    return (
      <View style={styles.departmentsContainer}>
        {institution.departments?.map((department: any) => (
          <TouchableOpacity
            key={department.id}
            style={styles.departmentButton}
            onPress={() => handleDepartmentPress(department)}
          >
            <View style={styles.departmentContent}>
              <Ionicons name="school-outline" size={20} color="#ffffff" />
              <Text style={styles.departmentText}>{department.title}</Text>
              <Ionicons name="chevron-forward" size={20} color="#ffffff" />
            </View>
          </TouchableOpacity>
        ))}
      </View>
    );
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
              {isEnglish ? 'Faculty Information' : 'Fakülte Bilgileri'}
            </Text>
            <Text style={styles.headerSubtitle}>
              {isEnglish ? '2024-2025 Academic Year' : '2024-2025 Akademik Yılı'}
            </Text>
            <View style={styles.headerLine} />
          </View>

          <View style={styles.tabContainer}>
            <TouchableOpacity
              style={[styles.tab, selectedType === 'faculties' && styles.selectedTab]}
              onPress={() => setSelectedType('faculties')}
            >
              <Text style={[styles.tabText, selectedType === 'faculties' && styles.selectedTabText]}>
                {isEnglish ? 'Faculties' : 'Fakülteler'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.tab, selectedType === 'schools' && styles.selectedTab]}
              onPress={() => setSelectedType('schools')}
            >
              <Text style={[styles.tabText, selectedType === 'schools' && styles.selectedTabText]}>
                {isEnglish ? 'Vocational Schools' : 'Meslek Yüksekokulları'}
              </Text>
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.content}>
            {institutions[selectedType].map((institution) => (
              <View key={institution.id}>
                <TouchableOpacity
                  style={styles.institutionButton}
                  onPress={() => handleInstitutionPress(institution)}
                >
                  <LinearGradient
                    colors={institution.colors}
                    style={styles.institutionGradient}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                  >
                    <View style={styles.institutionContent}>
                      <Ionicons 
                        name={institution.departments ? "school" : "document-text-outline"} 
                        size={24} 
                        color="#ffffff" 
                      />
                      <Text style={styles.institutionText}>{institution.title}</Text>
                      {institution.departments && (
                        <Ionicons
                          name={expandedId === institution.id ? "chevron-up" : "chevron-down"}
                          size={24}
                          color="#ffffff"
                        />
                      )}
                    </View>
                  </LinearGradient>
                </TouchableOpacity>
                {renderDepartments(institution)}
              </View>
            ))}
          </ScrollView>

          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}
          >
            <View style={styles.modalOverlay}>
              <View style={styles.modalContent}>
                <TouchableOpacity 
                  style={styles.closeButton}
                  onPress={() => setModalVisible(false)}
                >
                  <Ionicons name="close" size={24} color="#2a4d8f" />
                </TouchableOpacity>
                {selectedDepartment?.info && (
                  <>
                    <Text style={styles.modalTitle}>{selectedDepartment.info.title}</Text>
                    <Text style={styles.modalDescription}>{selectedDepartment.info.description}</Text>
                    <View style={styles.modalDivider} />
                    <Text style={styles.modalWebLabel}>{isEnglish ? 'Web Address:' : 'Web Adresi:'}</Text>
                    <TouchableOpacity onPress={() => Linking.openURL(selectedDepartment.url)}>
                      <Text style={styles.modalWebLink}>{selectedDepartment.url}</Text>
                    </TouchableOpacity>
                  </>
                )}
              </View>
            </View>
          </Modal>
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
  headerSubtitle: {
    fontSize: 18,
    color: '#ffffff',
    opacity: 0.9,
    marginBottom: 12,
    textAlign: 'center',
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
  tabContainer: {
    flexDirection: 'row',
    padding: 16,
    justifyContent: 'space-between',
  },
  tab: {
    flex: 1,
    padding: 12,
    alignItems: 'center',
    borderRadius: 8,
    marginHorizontal: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  selectedTab: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  tabText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '500',
    opacity: 0.8,
  },
  selectedTabText: {
    opacity: 1,
    fontWeight: '600',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  institutionButton: {
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
  institutionGradient: {
    padding: 15,
    borderRadius: 10,
  },
  institutionContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  institutionText: {
    flex: 1,
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 12,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  departmentsContainer: {
    paddingLeft: 20,
    marginBottom: 10,
  },
  departmentButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 8,
    marginTop: 8,
    padding: 12,
  },
  departmentContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  departmentText: {
    flex: 1,
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '500',
    marginLeft: 12,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    maxHeight: '80%',
  },
  closeButton: {
    alignSelf: 'flex-end',
    padding: 10,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2a4d8f',
    marginBottom: 15,
  },
  modalDescription: {
    fontSize: 16,
    color: '#333',
    lineHeight: 24,
    marginBottom: 20,
  },
  modalDivider: {
    height: 1,
    backgroundColor: '#ddd',
    marginVertical: 15,
  },
  modalWebLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2a4d8f',
    marginBottom: 5,
  },
  modalWebLink: {
    fontSize: 16,
    color: '#1e88e5',
    textDecorationLine: 'underline',
  }
});

export default FacultyExamsScreen; 
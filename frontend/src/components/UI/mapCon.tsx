import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from '@react-google-maps/api';
import React, { useState, useEffect, useCallback } from 'react';
import styles from '../../css/mapCon.module.css';

const containerStyle = {
  width: '100%',
  height: '600px',
};

const center = {
  lat: 35.6895,  // 東京の緯度
  lng: 139.6917, // 東京の経度
};

// 茶色系の地図スタイルと施設非表示のスタイル
const mapStyles = [
  {
    "elementType": "geometry",
    "stylers": [
      { "color": "#ebe3cd" }
    ]
  },
  {
    "elementType": "labels.text.fill",
    "stylers": [
      { "color": "#523735" }
    ]
  },
  {
    "elementType": "labels.text.stroke",
    "stylers": [
      { "color": "#f5f1e6" }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text.fill",
    "stylers": [
      { "color": "off" }
    ]
  },
  {
    "featureType": "poi.business",
    "stylers": [
      { "visibility": "off" }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "geometry",
    "stylers": [
      { "color": "#dfd2ae" }
    ]
  },
  {
    "featureType": "road",
    "elementType": "geometry",
    "stylers": [
      { "visibility": "#f5f1e6" }
    ]
  },
  {
    "featureType": "road",
    "elementType": "geometry.stroke",
    "stylers": [
      { "color": "#f5f1e6" }
    ]
  },
  {
    "featureType": "water",
    "elementType": "geometry.fill",
    "stylers": [
      { "color": "#b9d3c2" }
    ]
  }
];

interface Place {
  id: number;
  name: string;
  location: { lat: number; lng: number };
  description: string;
}

const initialPlaces: Place[] = [
  { id: 1, name: "場所1", location: { lat: 35.6895, lng: 139.6917 }, description: "説明1" },
  { id: 2, name: "場所2", location: { lat: 35.6896, lng: 139.6927 }, description: "説明2" },
];

type Language = 'ja' | 'en' | 'zh-CN' | 'zh-TW' | 'ko';

const MapCon = () => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY!,
  });

  const [places, setPlaces] = useState<Place[]>(initialPlaces);
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [language, setLanguage] = useState<Language>('ja');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [newPlaceLocation, setNewPlaceLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [newPlaceName, setNewPlaceName] = useState('');
  const [newPlaceDescription, setNewPlaceDescription] = useState('');

  const onMapClick = useCallback((location: google.maps.LatLngLiteral) => {
    if (isRegisterMode) {
      setNewPlaceLocation(location);
    }
  }, [isRegisterMode]);

  

  // 初回ロード時のデータ取得
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/adventure-spots`)
      .then((res) => res.json())
      .then((data) => {
        // データを適切な形式でセット
        const formattedPlaces = data.map((spot: any) => ({
          id: spot.id,
          name: spot.name,
          location: { lat: spot.latitude, lng: spot.longitude },
          description: spot.description,
        }));
        setPlaces(formattedPlaces);
      })
      .catch((error) => console.error('Error fetching places:', error));
  }, []);

  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang);
    setDropdownOpen(false);
  };

  const handleRegisterModeToggle = () => {
    setIsRegisterMode(!isRegisterMode);
    setNewPlaceLocation(null);
    setNewPlaceName('');
    setNewPlaceDescription('');
  };

  // ピン保存処理
  const handlePlaceSave = () => {
    if (newPlaceLocation && newPlaceName && newPlaceDescription) {
      const newPlace = {
        name: newPlaceName,
        latitude: newPlaceLocation.lat,
        longitude: newPlaceLocation.lng,
        description: newPlaceDescription,
      };

      console.log("Saving new place:", newPlace);

      fetch(`${process.env.REACT_APP_API_URL}/adventure-spots`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newPlace),
      })
        .then((res) => res.json())
        .then(() => {
          // 新しい場所が保存された後、データを再取得
          fetch(`${process.env.REACT_APP_API_URL}/adventure-spots`)
            .then((res) => res.json())
            .then((data) => {
              const formattedPlaces = data.map((spot: any) => ({
                id: spot.id,
                name: spot.name,
                location: { lat: spot.latitude, lng: spot.longitude },
                description: spot.description,
              }));
              setPlaces(formattedPlaces);
              setNewPlaceLocation(null);
              setNewPlaceName('');
              setNewPlaceDescription('');
              setIsRegisterMode(false);
            });
        })
        .catch((error) => console.error('Error saving place:', error));
    }
  };
  
  
  

  const getLocalizedText = (place: Place) => {
    const translations: Record<Language, { name: string; description: string }> = {
      en: { name: place.name + " (English)", description: "Description: " + place.description },
      ja: { name: place.name, description: "説明: " + place.description },
      'zh-CN': { name: place.name + " (简体中文)", description: "描述: " + place.description },
      'zh-TW': { name: place.name + " (繁體中文)", description: "描述: " + place.description },
      ko: { name: place.name + " (한국어)", description: "설명: " + place.description },
    };
    return translations[language];
  };

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <div>
      {/* 言語切替バー */}
      <div className={styles.languageBarStyle}>
        <div className={styles.dropdown}>
          <button className={styles.dropdownButton} onClick={() => setDropdownOpen(!dropdownOpen)}>
            言語選択
          </button>
          {dropdownOpen && (
            <div className={styles.dropdownMenu}>
              <button onClick={() => handleLanguageChange('ja')}>日本語</button>
              <button onClick={() => handleLanguageChange('en')}>English</button>
              <button onClick={() => handleLanguageChange('zh-CN')}>简体中文</button>
              <button onClick={() => handleLanguageChange('zh-TW')}>繁體中文</button>
              <button onClick={() => handleLanguageChange('ko')}>한국어</button>
            </div>
          )}
        </div>
        <button className={styles.registerButton} onClick={handleRegisterModeToggle}>
          {isRegisterMode ? "登録モード終了" : "目的地登録"}
        </button>
      </div>

      <GoogleMap
        mapContainerStyle={containerStyle}
        center={userLocation || center}
        zoom={15}
        options={{ styles: mapStyles }}
        onClick={(e) => onMapClick(e.latLng!.toJSON())}
      >
        {userLocation && (
          <Marker position={userLocation} icon="http://maps.google.com/mapfiles/ms/icons/blue-dot.png" />
        )}
        {places.map((place) => (
          <Marker key={place.id} position={place.location} onClick={() => setSelectedPlace(place)} />
        ))}
        {selectedPlace && (
          <InfoWindow position={selectedPlace.location} onCloseClick={() => setSelectedPlace(null)}>
            <div>
              <h2>{getLocalizedText(selectedPlace).name}</h2>
              <p>{getLocalizedText(selectedPlace).description}</p>
            </div>
          </InfoWindow>
        )}
        {newPlaceLocation && isRegisterMode && (
          <InfoWindow position={newPlaceLocation} onCloseClick={() => setNewPlaceLocation(null)}>
            <div>
              <input
                type="text"
                placeholder="場所の名前"
                value={newPlaceName}
                onChange={(e) => setNewPlaceName(e.target.value)}
              />
              <input
                type="text"
                placeholder="説明"
                value={newPlaceDescription}
                onChange={(e) => setNewPlaceDescription(e.target.value)}
              />
              <button onClick={handlePlaceSave}>登録</button>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </div>
  );
};

export default MapCon;

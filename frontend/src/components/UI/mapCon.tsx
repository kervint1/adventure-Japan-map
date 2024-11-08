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

interface Place {
  id: number;
  name: string;
  location: { lat: number; lng: number };
  description: string;
}

const places: Place[] = [
  { id: 1, name: "場所1", location: { lat: 35.6895, lng: 139.6917 }, description: "説明1" },
  { id: 2, name: "場所2", location: { lat: 35.6896, lng: 139.6927 }, description: "説明2" },
  // 他の場所も追加
];

type Language = 'ja' | 'en' | 'zh-CN' | 'zh-TW' | 'ko';  // 言語をリテラル型として定義

const MapCon = () => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY!,
  });

  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [language, setLanguage] = useState<Language>('ja');  // 言語状態の型を修正
  const [dropdownOpen, setDropdownOpen] = useState(false); // ドロップダウンの開閉状態

  const onMapClick = useCallback((place: Place) => {
    setSelectedPlace(place);
  }, []);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        () => {
          console.log("ユーザーの位置情報を取得できませんでした。");
        }
      );
    }
  }, []);

  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang);
    setDropdownOpen(false); // 言語選択後にドロップダウンを閉じる
  };

  // 言語に基づいてテキストを変更
  const getLocalizedText = (place: Place) => {
    const translations: Record<Language, { name: string; description: string }> = {
      en: {
        name: place.name + " (English)",
        description: "Description: " + place.description,
      },
      ja: {
        name: place.name,
        description: "説明: " + place.description,
      },
      'zh-CN': {
        name: place.name + " (简体中文)",
        description: "描述: " + place.description,
      },
      'zh-TW': {
        name: place.name + " (繁體中文)",
        description: "描述: " + place.description,
      },
      ko: {
        name: place.name + " (한국어)",
        description: "설명: " + place.description,
      },
    };

    return translations[language];  // languageをキーとして安全にアクセス
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
      </div>

      <GoogleMap mapContainerStyle={containerStyle} center={userLocation || center} zoom={15}>
        {userLocation && (
          <Marker position={userLocation} icon="http://maps.google.com/mapfiles/ms/icons/blue-dot.png" />
        )}
        {places.map((place) => (
          <Marker
            key={place.id}
            position={place.location}
            onClick={() => onMapClick(place)}
          />
        ))}

        {selectedPlace && (
          <InfoWindow
            position={selectedPlace.location}
            onCloseClick={() => setSelectedPlace(null)}
          >
            <div>
              <h2>{getLocalizedText(selectedPlace).name}</h2>
              <p>{getLocalizedText(selectedPlace).description}</p>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </div>
  );
};

export default MapCon;

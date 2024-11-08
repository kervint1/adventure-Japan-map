import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from '@react-google-maps/api';
import React, { useState,useEffect, useCallback } from 'react'

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

const MapCon = () => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY!,
  }) ;

  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);

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
      )
    }
  }, []);

  if ( !isLoaded ) return <div>Loading...</div>

  return (
    <div>
      <GoogleMap mapContainerStyle={containerStyle} center={userLocation || center} zoom={15}>
        {userLocation && (
          <Marker position={userLocation} icon="http://maps.google.com/mapfiles/ms/icons/blue-dot.png" />
        )},
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
              <h2>{selectedPlace.name}</h2>
              <p>{selectedPlace.description}</p>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </div>
  )
}

export default MapCon

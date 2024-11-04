import React, { useEffect, useState } from 'react';

// Spotの型を定義
interface Spot {
  id: number;
  name: string;
  location: string;
  rating: number;
}

const AnimeSpotList: React.FC = () => {
  const [spots, setSpots] = useState<Spot[]>([]);  // 型を指定

  useEffect(() => {
    fetch('/api/anime-spots')
      .then((res) => res.json())
      .then((data) => setSpots(data))
      .catch((error) => console.error('Error fetching anime spots:', error));
  }, []);

  return (
    <div>
      <h1>Anime Spots</h1>
      <ul>
        {spots.map((spot, index) => (
          <li key={index}>
            {spot.name} - {spot.location} - {spot.rating}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AnimeSpotList;

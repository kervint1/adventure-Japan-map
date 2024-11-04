// frontend/src/AdventureSpotList.tsx
import React, { useEffect, useState } from 'react';

interface Spot {
  id: number;
  name: string;
  location: string;
  rating: number;
}

const AdventureSpotList: React.FC = () => {
  const [spots, setSpots] = useState<Spot[]>([]);
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [rating, setRating] = useState('');

  useEffect(() => {
    fetch('/api/adventure-spots')
      .then((res) => res.json())
      .then((data) => setSpots(data))
      .catch((error) => console.error('Error fetching adventure spots:', error));
  }, []);

  const handleAddSpot = () => {
    const newSpot = { name, location, rating: parseFloat(rating) };

    fetch('/api/adventure-spots', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newSpot),
    })
      .then((res) => res.json())
      .then((addedSpot) => setSpots([...spots, addedSpot]))
      .catch((error) => console.error('Error adding adventure spot:', error));

    // フォームをリセット
    setName('');
    setLocation('');
    setRating('');
  };

  return (
    <div>
      <h1>Adventure Spots</h1>
      <ul>
        {spots.map((spot) => (
          <li key={spot.id}>
            {spot.name} - {spot.location} - {spot.rating}
          </li>
        ))}
      </ul>

      <h2>Add New Spot</h2>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />
      <input
        type="number"
        placeholder="Rating"
        value={rating}
        onChange={(e) => setRating(e.target.value)}
      />
      <button onClick={handleAddSpot}>Add Spot</button>
    </div>
  );
};

export default AdventureSpotList;

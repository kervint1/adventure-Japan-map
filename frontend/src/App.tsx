import React from 'react';
// import AdventureSpotList from './AdventureSpotList';
import Header from './components/UI/header';
import Home from './components/pages/home' 

const App: React.FC = () => {
  return (
    <div>
      <Header />
      <Home/>
    </div>
  );
};

export default App;

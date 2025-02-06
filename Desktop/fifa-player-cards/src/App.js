// src/App.js
import React from 'react';
import PlayersList from './playerslist';
import './App.css'; // Import the CSS file

function App() {
  return (
    <div className="App">
      <video className="video-background" autoPlay loop muted>
        <source src={`${process.env.PUBLIC_URL}/football-match.mp4`} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="content">
        <h1>FIFA Player Cards</h1>
        <div className="PlayersList">
          <PlayersList />
        </div>
      </div>
    </div>
  );
}

export default App;

import React, { useState, useEffect } from 'react';

const App = () => {
  const [playlist, setPlaylist] = useState([]);
  const [nowPlayingIndex, setNowPlayingIndex] = useState(-1);

  useEffect(() => {
    // Load the last playing audio file index from local storage
    const storedIndex = localStorage.getItem('nowPlayingIndex');
    if (storedIndex !== null) {
      setNowPlayingIndex(parseInt(storedIndex, 10));
    }
  }, []);

  // Function to handle audio file upload
  const handleUpload = (event) => {
    const file = event.target.files[0];
    const audio = URL.createObjectURL(file); // Generate a URL for the audio file

    // Update playlist state
    setPlaylist([...playlist, { name: file.name, audio }]);
  };

  // Function to play an audio file
  const playAudio = (index) => {
    setNowPlayingIndex(index);
    localStorage.setItem('nowPlayingIndex', index); // Store the current playing audio file index
  };

  // Function to handle the end of audio playback
  const handlePlaybackEnd = () => {
    // Automatically play the next audio file in the playlist
    if (nowPlayingIndex < playlist.length - 1) {
      const nextIndex = nowPlayingIndex + 1;
      setNowPlayingIndex(nextIndex);
      localStorage.setItem('nowPlayingIndex', nextIndex);
  };

  return (
    <div>
      <h1>Audio Player</h1>
      <input type="file" accept="audio/*" onChange={handleUpload} />

      <h2>Playlist</h2>
      <ul>
        {playlist.map((item, index) => (
          <li key={index}>
            <button onClick={() => playAudio(index)}>{item.name}</button>
          </li>
        ))}
      </ul>

      <h2>Now Playing</h2>
      {nowPlayingIndex !== -1 && (
        <audio controls src={playlist[nowPlayingIndex].audio} onEnded={handlePlaybackEnd} />
      )}
    </div>
  );
};
};
export default App;

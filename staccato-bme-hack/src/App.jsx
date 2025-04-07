import { useState } from 'react';
import './App.css';

const artists = [
  {
    name: "The Beatles",
    image: "https://cdn2.picryl.com/photo/1965/05/01/beatles-ad-1965-just-the-beatles-crop-db9a57-1024.jpg",
    music: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    bio: "Legendary English rock band from Liverpool, known for revolutionizing modern music and pop culture.",
    similar: ["The Byrds", "The Beach Boys", "Black Sabbath"],
    similarImages: [
      "https://live.staticflickr.com/4366/36600406374_c2acce2675_b.jpg",
      "https://cdn2.picryl.com/photo/2024/07/03/the-beach-boys-mid-60s-ce7df9-640.jpg",
      "https://img.goodfon.com/original/1920x1080/e/7e/black-sabbath-ozzy-metal.jpg"
    ]
  },
  {
    name: "The Rolling Stones",
    image: "https://img.goodfon.com/original/2000x1391/4/20/rolling-stones-dzhagger-muzyka.jpg",
    music: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    bio: "British rock band, pioneers of modern rock, known for their iconic sound and rebellious spirit.",
    similar: ["The Doors", "Led Zeppelin", "The Who"],
    similarImages: [
      "https://upload.wikimedia.org/wikipedia/commons/7/7e/The_Doors_1967.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/d/d1/Led_Zeppelin_III.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/4/4d/The_Who_1965.jpg"
    ]
  },
  {
    name: "Bee Gees",
    image: "https://live.staticflickr.com/4515/38831685591_d7905c9dda_b.jpg",
    music: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
    bio: "British-Australian pop group famous for their disco-era anthems and three-part harmonies.",
    similar: ["Michael Jackson", "Kenny Rogers", "Barbra Streisand"],
    similarImages: [
      "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fd/Michael_Jackson_1988.jpg/800px-Michael_Jackson_1988.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7d/Kenny_Rogers_2015.jpg/800px-Kenny_Rogers_2015.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/6/63/Barbra_Streisand_2007.jpg"
    ]
  }
];

function App() {
  const [selectedArtist, setSelectedArtist] = useState(null);

  return (
    <div className="app">
      <head>
        <title>STACCATO</title>
      </head>

      <h1>BRIT WAVE</h1>
      <h2>From the Isles to the States</h2>

      <div className="artist-grid">
        {artists.map((artist, index) => (
          <div key={index} className="artist-card" onClick={() => setSelectedArtist(artist)}>
            <img src={artist.image} alt={artist.name} />
            <h3>{artist.name}</h3>
          </div>
        ))}
      </div>

      {selectedArtist && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setSelectedArtist(null)}>&times;</span>
            
            <div className="modal-body">
              {/* Left side: Selected Artist */}
              <div className="artist-info">
                <h2>{selectedArtist.name}</h2>
                <img src={selectedArtist.image} alt={selectedArtist.name} className="modal-img" />
                <p>{selectedArtist.bio}</p>
                <audio controls autoPlay src={selectedArtist.music}></audio>
              </div>

              {/* Right side: Similar Artists */}
              <div className="similar-artists">
                <h3>Influenced Artists:</h3>
                {selectedArtist.similar.map((name, i) => (
                  <div key={i} className="similar-artist-card">
                    <img src={selectedArtist.similarImages[i]} alt={name} />
                    <h4>{name}</h4>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;

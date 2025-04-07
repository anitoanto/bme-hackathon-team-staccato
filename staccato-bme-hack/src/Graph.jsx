import React, { useState } from 'react';
import ReactFlow, { MiniMap, Controls, Background } from 'react-flow-renderer';
import './App.css';

const artists = [
  {
    id: '1',
    name: "The Beatles",
    image: "https://cdn2.picryl.com/photo/1965/05/01/beatles-ad-1965-just-the-beatles-crop-db9a57-1024.jpg",
    music: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    bio: "Legendary English rock band from Liverpool, known for revolutionizing modern music and pop culture.",
    similar: ["The Rolling Stones", "The Kinks", "The Beach Boys"],
    similarImages: [
      "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d2/The_Rolling_Stones_in_1966.jpg/800px-The_Rolling_Stones_in_1966.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/6/67/The_Kinks_1964.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ed/Beach_Boys_1965.jpg/800px-Beach_Boys_1965.jpg"
    ]
  },
  {
    id: '2',
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
    id: '3',
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

const edges = [
  { id: 'e1-2', source: '1', target: '2', animated: true },
  { id: 'e1-3', source: '1', target: '3', animated: true },
  { id: 'e2-1', source: '2', target: '1', animated: true },
  { id: 'e2-3', source: '2', target: '3', animated: true },
  { id: 'e3-1', source: '3', target: '1', animated: true },
  { id: 'e3-2', source: '3', target: '2', animated: true },
];

function Graph() {
  const [selectedArtist, setSelectedArtist] = useState(null);

  const nodes = artists.map((artist, index) => ({
    id: artist.id,
    data: {
      label: artist.name,
      image: artist.image
    },
    position: { x: Math.random() * 500, y: Math.random() * 500 }, // Random positioning for visual effect
    style: {
      borderRadius: '10px',
      padding: '10px',
      width: '150px',
      height: '150px',
      background: '#fff',
      boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
      textAlign: 'center',
      fontWeight: 'bold'
    }
  }));

  const handleNodeClick = (event, node) => {
    const artist = artists.find((a) => a.id === node.id);
    setSelectedArtist(artist);
  };

  return (
    <div className="app">
      <h1>BRIT WAVE</h1>
      <h2>From the Isles to the States</h2>

      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodeClick={handleNodeClick}
        nodeTypes={{}}
        style={{ width: '100%', height: '80vh' }}
      >
        <MiniMap />
        <Controls />
        <Background />
      </ReactFlow>

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

export default Graph;

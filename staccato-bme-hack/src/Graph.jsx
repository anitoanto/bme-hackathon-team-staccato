import React, { useState, useEffect } from 'react';
import ReactFlow, { MiniMap, Controls, Background, MarkerType } from 'react-flow-renderer';
import './App.css';

const ukArtists = [
  {
    id: 'uk1',
    name: "The Beatles",
    image: "https://cdn2.picryl.com/photo/1965/05/01/beatles-ad-1965-just-the-beatles-crop-db9a57-1024.jpg",
    bio: "Legendary English rock band from Liverpool, known for revolutionizing modern music and pop culture.",
    influenced: ["Michael Jackson"],
    songs: ["Hey Jude", "Let It Be", "Yesterday", "Come Together"],
    music: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
  },
  {
    id: 'uk2',
    name: "The Rolling Stones",
    image: "https://img.goodfon.com/original/2000x1391/4/20/rolling-stones-dzhagger-muzyka.jpg",
    bio: "British rock band, pioneers of modern rock, known for their iconic sound and rebellious spirit.",
    influenced: ["Aerosmith"],
    songs: ["Paint It Black", "Satisfaction", "Angie", "Sympathy for the Devil"],
    music: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3"
  },
  {
    id: 'uk3',
    name: "Bee Gees",
    image: "https://live.staticflickr.com/4515/38831685591_d7905c9dda_b.jpg",
    bio: "British-Australian pop group famous for their disco-era anthems and three-part harmonies.",
    influenced: ["Justin Timberlake"],
    songs: ["Stayin' Alive", "How Deep Is Your Love", "Night Fever", "Tragedy"],
    music: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3"
  }
];

const usArtists = [
  {
    id: 'us1',
    name: "Michael Jackson",
    image: "https://upload.wikimedia.org/wikipedia/commons/1/1c/Michael_Jackson_Cannes.jpg",
    bio: "American singer, songwriter, and dancer known as the 'King of Pop'.",
    songs: ["Thriller", "Billie Jean", "Beat It", "Smooth Criminal"],
    influencedBy: ["The Beatles"],
    music: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3"
  },
  {
    id: 'us2',
    name: "Aerosmith",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d6/Aerosmith_2001.jpg/800px-Aerosmith_2001.jpg",
    bio: "American rock band known as 'America's Greatest Rock and Roll Band'.",
    songs: ["Dream On", "I Don't Want to Miss a Thing", "Walk This Way", "Sweet Emotion"],
    influencedBy: ["The Rolling Stones"],
    music: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3"
  },
  {
    id: 'us3',
    name: "Justin Timberlake",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Justin_Timberlake_2013.jpg/800px-Justin_Timberlake_2013.jpg",
    bio: "American singer, songwriter, and actor who became famous as a member of NSYNC.",
    songs: ["Cry Me a River", "SexyBack", "Mirrors", "Can't Stop the Feeling"],
    influencedBy: ["Bee Gees"],
    music: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3"
  }
];

function Graph() {
  const [selectedNode, setSelectedNode] = useState(null);
  const [edges, setEdges] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [popupArtist, setPopupArtist] = useState(null);
  const [animationProgress, setAnimationProgress] = useState(0);
  const [direction, setDirection] = useState(''); // 'uk-to-us' or 'us-to-uk'

  // Position nodes
  const ukNodes = ukArtists.map((artist, index) => ({
    id: artist.id,
    data: { 
      label: artist.name,
      image: artist.image,
      type: 'uk'
    },
    position: { x: 100, y: 100 + (index * 200) },
    style: {
      border: selectedNode === artist.id ? '3px solid #ff3366' : '3px solid #1a1a1a'
    }
  }));

  const usNodes = usArtists.map((artist, index) => ({
    id: artist.id,
    data: { 
      label: artist.name,
      image: artist.image,
      type: 'us'
    },
    position: { x: 700, y: 100 + (index * 200) },
    style: {
      border: selectedNode === artist.id ? '3px solid #ff3366' : '3px solid #1a1a1a'
    }
  }));

  useEffect(() => {
    if (animationProgress < 100) {
      const timer = setTimeout(() => {
        setAnimationProgress(animationProgress + 2);
      }, 30);
      return () => clearTimeout(timer);
    } else if (animationProgress === 100 && selectedNode) {
      // Animation complete - show popup
      let artist;
      if (direction === 'uk-to-us') {
        const ukArtist = ukArtists.find(a => a.id === selectedNode);
        const usArtistId = ukArtist.influenced[0];
        artist = usArtists.find(a => a.name === usArtistId);
      } else {
        const usArtist = usArtists.find(a => a.id === selectedNode);
        const ukArtistId = usArtist.influencedBy[0];
        artist = ukArtists.find(a => a.name === ukArtistId);
      }
      setPopupArtist(artist);
      setShowPopup(true);
    }
  }, [animationProgress, selectedNode, direction]);

  const handleNodeClick = (event, node) => {
    setSelectedNode(node.id);
    setAnimationProgress(0);
    setShowPopup(false);
    
    let targetId = '';
    let newDirection = '';
    
    if (node.data.type === 'uk') {
      newDirection = 'uk-to-us';
      const ukArtist = ukArtists.find(a => a.id === node.id);
      targetId = usArtists.find(a => a.name === ukArtist.influenced[0])?.id;
    } else {
      newDirection = 'us-to-uk';
      const usArtist = usArtists.find(a => a.id === node.id);
      targetId = ukArtists.find(a => a.name === usArtist.influencedBy[0])?.id;
    }
    
    setDirection(newDirection);
    
    if (targetId) {
      setEdges([{
        id: `edge-${node.id}-${targetId}`,
        source: node.id,
        target: targetId,
        markerEnd: {
          type: MarkerType.ArrowClosed,
          width: 20,
          height: 20,
          color: '#ff3366'
        },
        style: { 
          stroke: '#ff3366', 
          strokeWidth: 3,
          strokeDasharray: '10,5',
          strokeDashoffset: 100 - animationProgress
        },
        animated: true
      }]);
    }
  };

  const handleBackgroundClick = () => {
    setSelectedNode(null);
    setEdges([]);
    setShowPopup(false);
    setAnimationProgress(0);
    setDirection('');
  };

  return (
    <div className="app">
      <h1>BRIT WAVE</h1>
      <h2>From the Isles to the States</h2>

      <ReactFlow
        nodes={[...ukNodes, ...usNodes]}
        edges={edges}
        onNodeClick={handleNodeClick}
        onPaneClick={handleBackgroundClick}
        nodeTypes={{}}
        style={{ width: '100%', height: '80vh' }}
        fitView
      >
        <MiniMap />
        <Controls />
        <Background />
      </ReactFlow>

      {showPopup && popupArtist && (
        <div className="popup-overlay" onClick={() => setShowPopup(false)}>
          <div className="popup-content" onClick={e => e.stopPropagation()}>
            <div className="popup-header">
              <h2>{popupArtist.name}</h2>
              <button className="close-btn" onClick={() => setShowPopup(false)}>×</button>
            </div>
            <div className="popup-body">
              <div className="artist-section">
                <img src={popupArtist.image} alt={popupArtist.name} className="artist-image" />
                <p>{popupArtist.bio}</p>
                <audio controls src={popupArtist.music} className="audio-player"></audio>
                <div className="songs-list">
                  <h4>Popular Songs:</h4>
                  <ul>
                    {popupArtist.songs.map((song, i) => (
                      <li key={i}>{song}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Graph;
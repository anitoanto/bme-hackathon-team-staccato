import React, { useEffect, useState, useCallback } from 'react';
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  MarkerType,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import { artistsGroup1, artistsGroup2 } from './DataFactory';
const generateNodesAndEdges = () => {
  const nodes = [];
  const edges = [];
  const edgeSet = new Set(); // to track unique edges

  let yOffsetUK = 0;
  let yOffsetUS = 0;

  const allArtists = [...artistsGroup2, ...artistsGroup1];

  allArtists.forEach((artist) => {
    const isUK = artist.id.startsWith('uk');

    // Create the node
    nodes.push({
      id: artist.id,
      type: 'default',
      markerEnd: {
        type: MarkerType.ArrowClosed,
        width: 20,
        height: 20,
        color: '#ff0000',
      },
      data: {
        label: (
          <div style={{ textAlign: 'center' }}>
            <img
              src={artist.imageUrl}
              alt={artist.name}
              style={{ width: 50, height: 50, borderRadius: '50%' }}
            />
            <div>{artist.name}</div>
          </div>
        ),
      },
      position: {
        x: isUK ? 500 : 100,
        y: isUK ? yOffsetUK : yOffsetUS,
      },
    });

    if (isUK) yOffsetUK += 150;
    else yOffsetUS += 150;

    // Create unique edges
    artist.influencedBy?.forEach((sourceId) => {
      const edgeKey = `${sourceId}->${artist.id}`;
      const reverseKey = `${artist.id}->${sourceId}`;

      // Only add edge if reverse doesn't exist
      if (!edgeSet.has(reverseKey)) {
        edges.push({
          id: edgeKey,
          source: sourceId,
          target: artist.id,
          animated: true,
          style: { stroke: '#ff0000', strokeWidth: 2 },
        });
        edgeSet.add(edgeKey);
      }
    });
  });

  return { nodes, edges };
};


const ArtistFlow = () => {
  const [{ nodes, edges: allEdges }, setGraph] = useState({ nodes: [], edges: [] });
  const [visibleEdges, setVisibleEdges] = useEdgesState([]);
  const [nodeState, setNodes, onNodesChange] = useNodesState([]);

  useEffect(() => {
    const { nodes, edges } = generateNodesAndEdges();
    setGraph({ nodes, edges });
    setNodes(nodes);
  }, []);

  const onNodeClick = useCallback(
    (event, node) => {
      const relatedEdges = allEdges.filter(
        (e) => e.source === node.id || e.target === node.id
      );
      setVisibleEdges(relatedEdges);
    },
    [allEdges]
  );

  return (
    <div style={{ width: '100%', height: '90vh' }}>

       <h1>BRIT WAVE</h1>
      <h2>From the Isles to the States</h2>

      <ReactFlow
        nodes={nodeState}
        edges={visibleEdges}
        onNodesChange={onNodesChange}
        onEdgesChange={() => {}}
        onNodeClick={onNodeClick}
        fitView
      >
        <MiniMap />
        <Controls />
        <Background />
      </ReactFlow>
    </div>
  );
};

export default ArtistFlow;

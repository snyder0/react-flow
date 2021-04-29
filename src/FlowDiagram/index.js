import React, { useState } from 'react';
import ReactFlow, {
  removeElements,
  addEdge,
  Background,
  MiniMap,
  Controls,
} from 'react-flow-renderer';

const initialElements = [
  {
    id: '1',
    type: 'input',
    data: { label: 'Input Node' },
    position: { x: 250, y: 25 },
  },
  {
    id: '2',
    data: { label: 'Another Node' },
    position: { x: 100, y: 125 },
  },
  {
    id: '3',
    data: { label: 'Another Node' },
    position: { x: 300, y: 225 },
  },
  {
    id: '4',
    data: { label: 'Another Node' },
    position: { x: 500, y: 325 },
  },
  {
    id: '5',
    type: 'output', // output node
    data: { label: <div>Output Node</div> },
    position: { x: 500, y: 525 },
  },
  // {
  //   id: '1',
  //   type: 'input', // input node
  //   data: { label: 'Input Node' },
  //   position: { x: 250, y: 25 },
  // },
  // // default node
  // {
  //   id: '2',
  //   // you can also pass a React component as a label
  //   data: { label: <div>Default Node</div> },
  //   position: { x: 100, y: 125 },
  // },

  // animated edge
  // { id: 'e1-2', source: '1', target: '2', animated: true },
  // { id: 'e2-3', source: '2', target: '3' },
];

const onLoad = (reactFlowInstance) => {
  console.log('flow loaded:', reactFlowInstance);
  reactFlowInstance.fitView();
};

const FlowDiagram = () => {
  // eslint-disable-next-line no-undef
  const [elements, setElements] = useState(initialElements);
  const onElementsRemove = (elementsToRemove) =>
    setElements((els) => removeElements(elementsToRemove, els));
  const onConnect = (params) => setElements((els) => addEdge(params, els));

  return (
    <div style={{ height: '65em' }}>
      <ReactFlow
        snapToGrid
        onElementsRemove={onElementsRemove}
        onConnect={onConnect}
        elements={elements}
      >
        <Controls />
        <MiniMap
          nodeColor={(node) => {
            switch (node.type) {
              case 'input':
                return 'red';
              case 'default':
                return '#00ff00';
              case 'output':
                return 'rgb(0,0,255)';
              default:
                return '#eee';
            }
          }}
          nodeStrokeWidth={3}
        />
        <Background variant="dots" gap={12} size={0.5} />
      </ReactFlow>
    </div>
  );
};

export default FlowDiagram;

import {
  DefaultButton,
  DialogFooter,
  PrimaryButton,
  TextField,
} from "@fluentui/react";
import React, { useState, useEffect, useMemo, useCallback } from "react";
import ReactFlow, {
  removeElements,
  addEdge,
  Background,
  MiniMap,
  Controls,
  BackgroundVariant,
  OnLoadFunc,
  Elements,
  Position,
  Connection,
  Edge,
} from "react-flow-renderer";
import GameBoard from "../GameOfLife/Game";
import TextUpdaterNode from "./TextUpdaterNode";
import { CommandBarBasic } from "./components/CommandBar";
import { DialogBlocking } from "./components/Dialog";
import { useBoolean } from "@fluentui/react-hooks";
import { Field, Form } from "react-final-form";
import _ from "lodash";

// const FlowDiagram = () => {
//   const [elements, setElements] = useState(initialElements);
//   const [hideDialog, { toggle: toggleHideDialog }] = useBoolean(true);

//   const onLoad: OnLoadFunc<NodeData> = (reactFlowInstance) => {
//     const elements = reactFlowInstance.getElements();

//     console.log(elements);

//     const newElements = elements.map((node, index) => {
//       return (node = {
//         ...node,
//         data: {
//           label: `Node ${node.id}`,
//         },
//       });
//     });

//     setElements(newElements);

//     reactFlowInstance.fitView();
//   };

//   const onElementsRemove = (elementsToRemove: any) => {
//     return setElements((els: any) => removeElements(elementsToRemove, els));
//   };

//   const onConnect = (params: any) => {
//     return setElements((els: any) => addEdge(params, els));
//   };

//   const _items = [
//     {
//       key: "newNode",
//       text: "Node",
//       cacheKey: "myCacheKey",
//       iconProps: { iconName: "Add" },
//       subMenuProps: {
//         items: [
//           {
//             key: "inputNode",
//             text: "Input",
//             iconProps: { iconName: "DOM" },
//             onClick: toggleHideDialog,
//           },
//           {
//             key: "inputOutputNode",
//             text: "Input/Output",
//             iconProps: { iconName: "DOM" },
//             onClick: toggleHideDialog,
//           },
//           {
//             key: "outputNode",
//             text: "Output",
//             iconProps: { iconName: "DOM" },
//             onClick: toggleHideDialog,
//           },
//         ],
//       },
//     },
//     {
//       key: "upload",
//       text: "Upload",
//       iconProps: { iconName: "Upload" },
//       href: "https://developer.microsoft.com/en-us/fluentui",
//     },
//     {
//       key: "share",
//       text: "Share",
//       iconProps: { iconName: "Share" },
//       onClick: () => console.log("Share"),
//     },
//     {
//       key: "download",
//       text: "Download",
//       iconProps: { iconName: "Download" },
//       onClick: () => console.log("Download"),
//     },
//   ];

// const handleAddNode = ({ values }: any) => {
//   console.log(values);

//   toggleHideDialog();
// };

// return (
//   <div style={{ height: "85vh" }}>

const initialElements = [
  {
    id: "1",
    type: "input",
    data: { label: "Input Node" },
    sourcePosition: "right",
    position: { x: 500, y: 225 },
  },
  {
    id: "2",
    type: "input",
    data: { label: "Another Node" },
    sourcePosition: "right",
    position: { x: 500, y: 325 },
  },
  {
    id: "3",
    type: "input",
    data: { label: "Another Node" },
    sourcePosition: "right",
    position: { x: 500, y: 425 },
  },
  {
    id: "4",
    type: "input",
    data: { label: <div>Something else</div> },
    sourcePosition: "right",
    position: { x: 500, y: 525 },
  },
  {
    id: "5",
    type: "GameBoard",
    position: { x: 800, y: 225 },
    // style: { width: 800, height: 650 },
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
  // { id: "e1-2", source: "1", target: "2", animated: true },
  // { id: "e2-3", source: "2", target: "3" },
  // { id: "e4-5", source: "4", target: "5" },
];

const onLoad = (reactFlowInstance: any) => {
  // console.log("flow loaded:", reactFlowInstance);
  reactFlowInstance.fitView();
};

const nodeTypes = { GameBoard: GameBoard, textUpdater: TextUpdaterNode };

type OnElementsRemove = ((elements: Elements<any>) => void) | undefined;
type OnConnect = ((connection: Connection | Edge<any>) => void) | undefined;

const FlowDiagram = () => {
  // eslint-disable-next-line no-undef
  const [elements, setElements] = useState<Elements<any>>([]);
  const [randomPercentage, setRandomPercentage] = useState(0.8);
  const [hideDialog, { toggle: toggleHideDialog }] = useBoolean(true);

  const handleAddNode = ({ values }: any) => {
    console.log(values);

    toggleHideDialog();
  };

  const _items = [
    {
      key: "newNode",
      text: "Node",
      cacheKey: "myCacheKey",
      iconProps: { iconName: "Add" },
      subMenuProps: {
        items: [
          {
            key: "inputNode",
            text: "Input",
            iconProps: { iconName: "DOM" },
            onClick: toggleHideDialog,
          },
          {
            key: "inputOutputNode",
            text: "Input/Output",
            iconProps: { iconName: "DOM" },
            onClick: toggleHideDialog,
          },
          {
            key: "outputNode",
            text: "Output",
            iconProps: { iconName: "DOM" },
            onClick: toggleHideDialog,
          },
        ],
      },
    },
    {
      key: "upload",
      text: "Upload",
      iconProps: { iconName: "Upload" },
      href: "https://developer.microsoft.com/en-us/fluentui",
    },
    {
      key: "share",
      text: "Share",
      iconProps: { iconName: "Share" },
      onClick: () => console.log("Share"),
    },
    {
      key: "download",
      text: "Download",
      iconProps: { iconName: "Download" },
      onClick: () => console.log("Download"),
    },
  ];

  const onElementsRemove: OnElementsRemove = (elementsToRemove: any) => {
    setElements((els: any) => removeElements(elementsToRemove, els));
  };

  // useMemo(() => {
  //   setElements((elements) =>
  //     elements.map((node) => {
  //       if (node.id !== "5") {
  //         return node;
  //       }

  //       return {
  //         ...node,
  //         data: {
  //           ...node.data,
  //           randomPercentage,
  //         },
  //       };
  //     })
  //   );
  // }, [randomPercentage]);

  const updateBoradData = useCallback(() => {
    setElements((nextElements) => {
      return nextElements.map((node) => {
        if (node.id !== "5") {
          return node;
        }

        let isConnected = false;
        nextElements.forEach((element) => {
          if (element.id === "e1-5") {
            isConnected = true;
          }
        });

        console.log(isConnected);

        if (isConnected) {
          return {
            ...node,
            data: {
              ...node.data,
              randomPercentage,
            },
          };
        } else {
          return node;
        }
      });
    });
  }, [randomPercentage]);

  const onConnect: OnConnect = (params) => {
    console.log("params >>> ", params);
    setElements((els) => {
      console.log(els);
      return addEdge(
        {
          id: `e${params.source}-${params.target}`,
          source: `${params.source}`,
          target: `${params.target}`,
        },
        els
      );
    });
  };

  const onChange = useCallback(
    (event: any) => {
      setElements((elements: any) =>
        elements.map((node: any) => {
          if (node.id !== "1") {
            return node;
          }

          setRandomPercentage(event.target.value);

          return {
            ...node,
            data: {
              ...node.data,
              randomPercentage,
            },
          };
        })
      );
    },
    [randomPercentage]
  );

  useEffect(() => {
    setElements([
      {
        id: "1",
        type: "textUpdater",
        data: {
          label: "Random Percentage:",
          onChange: onChange,
          randomPercentage: randomPercentage,
        },
        sourcePosition: Position.Right,
        position: { x: 500, y: 225 },
      },
      {
        id: "2",
        type: "input",
        data: { label: "Another Node" },
        sourcePosition: Position.Right,
        position: { x: 500, y: 325 },
      },
      {
        id: "3",
        type: "input",
        data: { label: "Another Node" },
        sourcePosition: Position.Right,
        position: { x: 500, y: 425 },
      },
      {
        id: "4",
        type: "input",
        data: { label: <div>Something else</div> },
        sourcePosition: Position.Right,
        position: { x: 500, y: 525 },
      },
      {
        id: "5",
        type: "GameBoard",
        data: {
          onChange: onChange,
        },
        position: { x: 800, y: 225 },
        // style: { width: 800, height: 650 },
      },
    ]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div style={{ height: "65em" }}>
      {/* <CommandBarBasic _items={_items} /> */}
      <ReactFlow
        snapToGrid
        onLoad={onLoad}
        onElementsRemove={onElementsRemove}
        onConnect={onConnect}
        elements={elements}
        nodeTypes={nodeTypes}
      >
        <Controls />
        <MiniMap
          nodeColor={(node) => {
            switch (node.type) {
              case "input":
                return "red";
              case "default":
                return "#00ff00";
              case "output":
                return "rgb(0,0,255)";
              default:
                return "#eee";
            }
          }}
          nodeStrokeWidth={3}
        />
        <Background variant={BackgroundVariant.Dots} gap={12} size={0.5} />
      </ReactFlow>
      <DialogBlocking
        hideDialog={hideDialog}
        toggleHideDialog={toggleHideDialog}
      >
        <Form
          onSubmit={({ values }: { values: any }) => handleAddNode(values)}
          render={() => {
            return (
              <Field
                name="myField"
                component={() => <TextField placeholder="name" />}
              />
            );
          }}
        />
        <DialogFooter>
          <PrimaryButton onClick={handleAddNode} text="Add" />
          <DefaultButton onClick={toggleHideDialog} text="Don't Add" />
        </DialogFooter>
      </DialogBlocking>
    </div>
  );
};

export default FlowDiagram;

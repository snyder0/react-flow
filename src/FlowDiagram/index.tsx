import {
  DefaultButton,
  DialogFooter,
  PrimaryButton,
  TextField,
} from "@fluentui/react";
import React, { useState } from "react";
import ReactFlow, {
  removeElements,
  addEdge,
  Background,
  MiniMap,
  Controls,
  BackgroundVariant,
  OnLoadFunc,
} from "react-flow-renderer";
import { CommandBarBasic } from "./components/CommandBar";
import { DialogBlocking } from "./components/Dialog";
import initialElements, { NodeData } from "./initial-elements";
import { useBoolean } from "@fluentui/react-hooks";
import { Field, Form } from "react-final-form";

const FlowDiagram = () => {
  const [elements, setElements] = useState(initialElements);
  const [hideDialog, { toggle: toggleHideDialog }] = useBoolean(true);

  const onLoad: OnLoadFunc<NodeData> = (reactFlowInstance) => {
    const elements = reactFlowInstance.getElements();

    console.log(elements);

    const newElements = elements.map((node, index) => {
      return (node = {
        ...node,
        data: {
          label: `Node ${node.id}`,
        },
      });
    });

    setElements(newElements);

    reactFlowInstance.fitView();
  };

  const onElementsRemove = (elementsToRemove: any) => {
    return setElements((els: any) => removeElements(elementsToRemove, els));
  };

  const onConnect = (params: any) => {
    return setElements((els: any) => addEdge(params, els));
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

  const handleAddNode = ({ values }: any) => {
    console.log(values);

    toggleHideDialog();
  };

  return (
    <div style={{ height: "85vh" }}>
      <CommandBarBasic _items={_items} />
      <ReactFlow
        snapToGrid
        onLoad={onLoad}
        onElementsRemove={onElementsRemove}
        onConnect={onConnect}
        elements={elements}
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
          onSubmit={({ values }) => handleAddNode(values)}
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

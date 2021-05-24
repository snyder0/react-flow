import * as React from "react";
import {
  CommandBar,
  ICommandBarItemProps,
} from "@fluentui/react/lib/CommandBar";
import { IButtonProps } from "@fluentui/react/lib/Button";

type CommandBarBasicProps = {
  _items: ICommandBarItemProps[];
};

const overflowProps: IButtonProps = { ariaLabel: "More commands" };

export const CommandBarBasic: React.FunctionComponent<CommandBarBasicProps> = ({
  _items,
}) => {
  return (
    <div>
      <CommandBar
        items={_items}
        overflowItems={_overflowItems}
        overflowButtonProps={overflowProps}
        farItems={_farItems}
        ariaLabel="Use left and right arrow keys to navigate between commands"
      />
    </div>
  );
};

const _overflowItems: ICommandBarItemProps[] = [
  {
    key: "move",
    text: "Move to...",
    onClick: () => console.log("Move to"),
    iconProps: { iconName: "MoveToFolder" },
  },
  {
    key: "copy",
    text: "Copy to...",
    onClick: () => console.log("Copy to"),
    iconProps: { iconName: "Copy" },
  },
  {
    key: "rename",
    text: "Rename...",
    onClick: () => console.log("Rename"),
    iconProps: { iconName: "Edit" },
  },
];

const _farItems: ICommandBarItemProps[] = [
  {
    key: "tile",
    text: "Grid view",
    // This needs an ariaLabel since it's icon-only
    ariaLabel: "Grid view",
    iconOnly: true,
    iconProps: { iconName: "Tiles" },
    onClick: () => console.log("Tiles"),
  },
  {
    key: "info",
    text: "Info",
    // This needs an ariaLabel since it's icon-only
    ariaLabel: "Info",
    iconOnly: true,
    iconProps: { iconName: "Info" },
    onClick: () => console.log("Info"),
  },
];

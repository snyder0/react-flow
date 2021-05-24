import * as React from "react";
import { Dialog, DialogType, DialogFooter } from "@fluentui/react/lib/Dialog";
import { PrimaryButton, DefaultButton } from "@fluentui/react/lib/Button";
import { ContextualMenu } from "@fluentui/react/lib/ContextualMenu";
import { SpinButton } from "@fluentui/react/lib/SpinButton";
import { Toggle } from "@fluentui/react/lib/Toggle";
import {
  ComboBox,
  IComboBoxOption,
  SelectableOptionMenuItemType,
  TextField,
} from "@fluentui/react/lib/index";

const options: IComboBoxOption[] = [
  {
    key: "Header1",
    text: "First heading",
    itemType: SelectableOptionMenuItemType.Header,
  },
  { key: "A", text: "Option A" },
  { key: "B", text: "Option B" },
  { key: "C", text: "Option C" },
  { key: "D", text: "Option D" },
  { key: "divider", text: "-", itemType: SelectableOptionMenuItemType.Divider },
  {
    key: "Header2",
    text: "Second heading",
    itemType: SelectableOptionMenuItemType.Header,
  },
  { key: "E", text: "Option E" },
  { key: "F", text: "Option F", disabled: true },
  { key: "G", text: "Option G" },
  { key: "H", text: "Option H" },
  { key: "I", text: "Option I" },
  { key: "J", text: "Option J" },
];
const dragOptions = {
  moveMenuItemText: "Move",
  closeMenuItemText: "Close",
  menu: ContextualMenu,
};
const modalPropsStyles = { main: { maxWidth: 450 } };
const iconProps = { iconName: "IncreaseIndentLegacy" };
const dialogContentProps = {
  type: DialogType.normal,
  title: "Add Node",
  subText: "Enter the details of your node",
};
const log = (text: string): (() => void) => {
  return (): void => {
    console.log(text);
  };
};

type DialogBlockingProps = {
  hideDialog: boolean;
  toggleHideDialog: () => void;
};

export const DialogBlocking: React.FunctionComponent<DialogBlockingProps> = ({
  hideDialog,
  toggleHideDialog,
  children,
}) => {
  const modalProps = React.useMemo(
    () => ({
      isBlocking: true,
      styles: modalPropsStyles,
      dragOptions: dragOptions,
    }),
    []
  );

  return (
    <>
      <Dialog
        hidden={hideDialog}
        onDismiss={toggleHideDialog}
        dialogContentProps={dialogContentProps}
        modalProps={modalProps}
      >
        {children}
      </Dialog>
    </>
  );
};

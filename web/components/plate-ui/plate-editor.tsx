"use client";

import { platePlugins } from "./create-plate-plugins";
import { Editor } from "@/components/plate-ui/editor";
import { FixedToolbar } from "@/components/plate-ui/fixed-toolbar";
import { FixedToolbarButtons } from "@/components/plate-ui/fixed-toolbar-buttons";
import { FloatingToolbar } from "@/components/plate-ui/floating-toolbar";
import { FloatingToolbarButtons } from "@/components/plate-ui/floating-toolbar-buttons";
import { Plate, type Value } from "@udecode/plate-common";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

interface PlateEditorProps {
  setValue: (newValue: Value) => void;
  readOnly: boolean;
  initialValue?: Value;
}

export function PlateEditor({
  setValue,
  readOnly = false,
  initialValue,
  ...props
}: PlateEditorProps) {
  return (
    <DndProvider backend={HTML5Backend}>
      <Plate
        plugins={platePlugins}
        initialValue={initialValue}
        onChange={(newValue) => {
          if (!newValue) return;
          if (newValue.length === 0) return setValue([]);
          setValue(newValue);
        }}
      >
        <FixedToolbar>
          <FixedToolbarButtons />
        </FixedToolbar>

        <Editor {...props} readOnly={readOnly} className="h-80" />

        <FloatingToolbar>
          <FloatingToolbarButtons />
        </FloatingToolbar>
      </Plate>
    </DndProvider>
  );
}

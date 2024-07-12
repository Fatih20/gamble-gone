"use client";

import { platePlugins } from "./create-plate-plugins";
import { Editor } from "@/components/plate-ui/editor";
import { Plate, type Value } from "@udecode/plate-common";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

interface PlateEditorProps {
  initialValue: Value;
}

export function PlateRender({ initialValue, ...props }: PlateEditorProps) {
  return (
    <DndProvider backend={HTML5Backend}>
      <Plate plugins={platePlugins} initialValue={initialValue}>
        <Editor
          {...props}
          readOnly={true}
          className="space-y-6 border-0 p-0 text-lg"
        />
      </Plate>
    </DndProvider>
  );
}

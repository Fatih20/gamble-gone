"use client";

import { ToolbarButton } from "./toolbar";
import { withRef } from "@udecode/cn";
import {
  useMarkToolbarButton,
  useMarkToolbarButtonState,
} from "@udecode/plate-common";
import React from "react";

export const MarkToolbarButton = withRef<
  typeof ToolbarButton,
  {
    clear?: string | string[];
    nodeType: string;
  }
>(({ clear, nodeType, ...rest }, ref) => {
  const state = useMarkToolbarButtonState({ clear, nodeType });
  const { props } = useMarkToolbarButton(state);

  return <ToolbarButton ref={ref} {...props} {...rest} />;
});

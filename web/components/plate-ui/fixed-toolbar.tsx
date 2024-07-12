import { Toolbar } from "./toolbar";
import { withCn } from "@udecode/cn";

export const FixedToolbar = withCn(
  Toolbar,
  "supports-backdrop-blur:bg-background/60 sticky left-0 top-[57px] z-[60] w-full justify-between overflow-x-auto rounded-t-lg border-b border-b-border bg-background/95 backdrop-blur",
);

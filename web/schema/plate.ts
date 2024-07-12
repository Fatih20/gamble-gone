import { type TElement, type TDescendant } from "@udecode/plate";
import { z } from "zod";

const UnknownObject = z.record(z.unknown());

const TText = z
  .object({
    text: z.string(),
  })
  .and(UnknownObject);

const TElement: z.ZodType<TElement> = z.lazy(() =>
  z
    .object({
      children: z.array(TDescendant),
      type: z.string(),
    })
    .and(UnknownObject),
);

const TDescendant: z.ZodType<TDescendant> = z.union([TElement, TText]);

const Value = z.array(TElement);

export const PlateRichTextSchema = Value;

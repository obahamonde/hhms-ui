import { Note } from "tone/build/esm/core/type/Units";

export interface ISample {
  midi: number;
  frequency: number | ComputedRef<number>;
  note: Note | ComputedRef<Note>;
  length: "1n" | "2n" | "4n" | "8n" | "16n" | "32n" | "64n" | "128n";
}

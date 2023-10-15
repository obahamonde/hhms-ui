import { defineStore, acceptHMRUpdate } from "pinia";
import { reactive, computed } from "vue";
import type { ISample } from "~/types"; // Import your ISample type

export const useSequencerStore = defineStore("sequencerState", () => {
  const state = reactive({
    sequence: [] as ISample[],
  });

  const addNoteToSequence = (note: ISample) => {
    state.sequence.push(note);
  };

  const removeNoteFromSequence = (index: number) => {
    state.sequence.splice(index, 1);
  };

  const clearSequence = () => {
    state.sequence = [];
  };

  const sequenceSummary = computed(() => {
    return state.sequence.map((note, index) => ({
      index,
      midi: note.midi,
      note: note.note,
      length: note.length,
    }));
  });

  const sequenceLength = computed(() => state.sequence.length);

  return {
    state,
    addNoteToSequence,
    removeNoteFromSequence,
    clearSequence,
    sequenceSummary,
    sequenceLength,
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useSequencerStore, import.meta.hot));
}

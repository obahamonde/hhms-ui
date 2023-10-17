<template>
  <div class="grid overflow-auto">
    <div v-for="midiNote in midiNotes" :key="midiNote.midi" class="grid-row">
      <div
        v-for="(note, index) in sequencerState.sequence"
        :key="index"
        :class="{
          'grid-item': true,
          'bg-green': sequencerState.sequence[index].midi === midiNote.midi,
        }"
        @click="playNote(note.note, note.length)"
      ></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import * as Tone from "tone";
const sequencerStore = useSequencerStore();
const sequencerState = sequencerStore.state;
const synth = new Tone.Synth().toDestination();
const midiNotes = computed(() => {
  const notes = [];
  for (let i = 36; i < 101; i++) {
    notes.push(getFullNoteInfo(i));
  }
  return notes;
});
const playNote = (note: string, length: string) => {
  synth.triggerAttackRelease(note, length);
};

const currentPosition = ref(0); // Or get it from the store if it's there
const playedNotes = ref<number[]>([]);

watch(
  () => currentPosition.value,
  (newPosition) => {
    if (!playedNotes.value.includes(newPosition)) {
      playedNotes.value.push(newPosition);
    }
  },
);
const getFullNoteInfo = (midi: number) => {
  const note = Tone.Frequency(midi, "midi").toNote();
  const frequency = Tone.Frequency(midi, "midi").toFrequency();
  return {
    midi,
    note,
    frequency,
  };
};
</script>
<style>
.grid {
  display: flex;
  flex-direction: column;
}
.grid-row {
  display: flex;
  flex-direction: row;
}
.grid-item {
  width: 25px;
  height: 25px;
  border: 1px solid #ccc;
  text-align: center;
}
</style>

<template>
  <div class="grid">
    <div v-for="midiNote in midiNotes" :key="midiNote.midi" class="grid-row">
      <div
        v-for="(note, index) in sequencerState.sequence"
        :key="index"
        :class="[
          'grid-item',
          {
            'is-playing':
              note.midi === midiNote.midi && index === currentPosition,
          },
          { 'has-played': hasPlayed(note.midi, index) },
        ]"
        @click="playNote(note.note, note.length)"
      >
        {{ note.note === midiNote.note ? note.note : "" }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import * as Tone from "tone";
const sequencerStore = useSequencerStore();
const sequencerState = sequencerStore.state;
const synth = new Tone.Synth().toDestination();
const playNote = (note: string, length: string) => {
  synth.triggerAttackRelease(note, length);
};

const currentPosition = ref(0); // Or get it from the store if it's there
const playedNotes = ref<number[]>([]);

const hasPlayed = (midi: number, index: number) => {
  return playedNotes.value.some(
    (pos) => pos === index && sequencerState.sequence[pos]?.midi === midi,
  );
};
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
const midiNotes = computed(() => {
  const notes = [];
  for (let i = 36; i < 101; i++) {
    notes.push(getFullNoteInfo(i));
  }
  return notes;
});
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
  width: 50px;
  height: 50px;
  border: 1px solid #ccc;
  text-align: center;
  line-height: 50px;
}
.is-playing {
  background-color: green;
}
.has-played {
  background-color: lightgreen;
}
</style>

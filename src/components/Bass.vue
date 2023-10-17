<script setup lang="ts">
import * as Tone from "tone";
import type { ISample } from "~/types";
const synth = new Tone.Synth().toDestination();
const midiNote = ref<number>(28);
const playNote = (note: string, length: string) => {
  synth.triggerAttackRelease(note, length);
};
const getFullNoteInfo = (midi: number) => {
  const note = Tone.Frequency(midi, "midi").toNote();
  const frequency = Tone.Frequency(midi, "midi").toFrequency();
  return {
    midi,
    note,
    frequency,
    length: "8n",
  };
};
const sample = computed<ISample>(() => getFullNoteInfo(midiNote.value));
</script>
<template>
  <input
    type="range"
    :min="28"
    :max="55"
    v-model="midiNote"
    @input="playNote(sample.note, sample.length)"
  />
  />
</template>

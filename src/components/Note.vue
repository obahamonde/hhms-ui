<script setup lang="ts">
import type { ISample } from "~/types/audio";
import * as Tone from "tone";
const props = defineProps<{
  synth: Tone.Synth;
}>();
const midi = ref<number>(60);
const length = ref<"1n" | "2n" | "4n" | "8n" | "16n" | "32n">("8n");
const sample = reactive<ISample>({
  midi: midi.value,
  frequency: computed(() => Tone.Frequency(midi.value, "midi").toFrequency()),
  note: computed(() => Tone.Frequency(midi.value, "midi").toNote()),
  length: length.value,
});
const play = () => {
  props.synth.triggerAttackRelease(sample.note, "8n");
};

watch(
  () => midi,
  async (newMidi) => {
    sample.midi = newMidi.value;
    sample.frequency = Tone.Frequency(newMidi.value, "midi").toFrequency();
    sample.note = Tone.Frequency(newMidi.value, "midi").toNote();
  },
);
</script>
<template>
  <input type="range" min="0" max="127" v-model="midi" @input="play" />
  <div>{{ sample.frequency }}</div>
  <div>{{ sample.note }}</div>
</template>

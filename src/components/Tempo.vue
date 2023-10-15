<script setup lang="ts">
import * as Tone from "tone";
const tempo = ref<number>(120);
const emit = defineEmits(["tempo"]);
watch(tempo, (newTempo) => {
  Tone.Transport.bpm.value = newTempo;
});
onMounted(() => {
  Tone.Transport.start();
  emit("tempo", tempo.value);
});
</script>
<template>
  <div>
    <label for="tempo">Tempo: {{ tempo }}</label>
    <input id="tempo" type="range" min="40" max="220" v-model="tempo" />
  </div>
</template>

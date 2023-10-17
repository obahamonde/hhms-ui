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
  <div class="row center gap-2">
    <label for="tempo" class="text-title text-gray-500 text-xs"
      >Tempo: {{ tempo }}</label
    >
    <input id="tempo" type="range" min="40" max="220" v-model="tempo" />
  </div>
</template>

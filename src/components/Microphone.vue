<template>
  <div>
    <Icon
      :icon="isListening ? 'mdi:microphone-off' : 'mdi:microphone'"
      @click="toggleMicrophone"
			class="x2 z-50 m-4"
    />
  </div>
</template>

<script setup lang="ts">
const { isListening, result, speech } = useSpeech();
const emit = defineEmits(["stop"]);
const toggleMicrophone = () => {
  if (isListening.value) {
    speech.stop();
    emit("stop", result.value);
  } else {
    speech.start();
  }
};

</script>

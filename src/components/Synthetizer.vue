<script setup lang="ts">
import * as Tone from "tone";
const synth = new Tone.Synth().toDestination();
</script>
<template>
  <slot :synth="synth"></slot>
</template>

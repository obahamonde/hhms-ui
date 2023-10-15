<script setup lang="ts">
useTitle("Home");
useFavicon("/favicon.png");
</script>
<template>
  <Synthetizer>
    <template #default="{ synth }">
      <Note :synth="synth" />
    </template>
  </Synthetizer>
</template>

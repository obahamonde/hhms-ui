<script setup lang="ts">
useTitle("Home");
useFavicon("/favicon.svg");
</script>
<template>
  <Auth v-slot="{ state }">
    <Landing />
    </Auth>
</template>
<route lang="yaml">
meta:
  layout: home
</route>

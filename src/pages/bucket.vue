<script setup lang="ts"></script>
<template>
  <Auth>
    <template #default="{ state }">
      <Upload :user="state.user" v-if="state.user" />
    </template>
  </Auth>
</template>

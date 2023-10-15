<script setup lang="ts">
import type { ISample } from "~/types/audio";
const props = defineProps({
  note: {
    type: Object as PropType<ISample>,
    required: true,
  },
});
</script>
<template>
  <div>
    <slot :note="props.note"></slot>
  </div>
</template>

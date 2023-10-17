<script setup lang="ts">
const { state } = useStore();
const route = useRoute();
const router = useRouter();
const token = computed(() => route.query.token as string);
onBeforeMount(async () => {
  if (state.token) return;
  if (token.value) {
    state.token = token.value;
    const res = await fetch("/api/user?token=" + token.value);
    const data = await res.json();
    console.log(data);
    state.user = data;
    router.push("/discover");
  } else {
    window.open("/api/", "_self");
  }
});
</script>
<template>
  <Notifier/>
  <slot :state="state" v-if="state.user" />
  <p class="font-script bl fixed my-4 mx-6 text-gray-500 z--1">@{{ state.user?.username }}</p>
</template>

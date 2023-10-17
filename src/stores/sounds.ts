import { defineStore, acceptHMRUpdate } from "pinia";
import type { SoundInstance } from "~/types";

export const useSoundsStore = defineStore("sounds", () => {
  const soundState = reactive({
    sounds: [] as SoundInstance[],
    downloadedFiles: [] as File[],
  });

  return {
    soundState,
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useSoundsStore, import.meta.hot));
}

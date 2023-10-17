import { defineStore, acceptHMRUpdate } from "pinia";
import { AudioFile } from "~/types";

export const useFileStore = defineStore("file", () => {
  const fileState = reactive<{ files: AudioFile[] }>({
    files: [],
  })

  return {
    fileState
  }
}
)

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useFileStore, import.meta.hot))
}
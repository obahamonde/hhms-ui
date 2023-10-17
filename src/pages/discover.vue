<script setup lang="ts">
import type { SoundInstance, SearchResponse, Upload, AudioFile } from "~/types";
const { state, notify } = useStore();
const { soundState: store } = useSoundsStore();
const { fileState: filesUpload } = useFileStore();
const { modelValue } = defineModels<{
  modelValue: string;
}>();
const result = ref<SearchResponse>();
const filter = ref();
const showModal = ref(false);
const search = async (value: string, token: string) => {
  if (!value) return;
  const res = await fetch(
    "/api/search?token=" +
      token +
      "&query=" +
      value +
      "&sort=score" +
      "&filter=" +
      filter.value,
  );
  const data = await res.json();
  result.value = data;
};
const showDetail = async (id: number, token: string) => {
  const res = await fetch("/api/fetch?token=" + token + "&id=" + id);
  const data = (await res.json()) as SoundInstance;
  store.sounds.unshift(data);
  showModal.value = true;
};

const downloadFile = async (sound: SoundInstance, token: string) => {
  const response = await fetch(sound.download, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const arrayBuffer = await response.arrayBuffer();
  const blob = new Blob([arrayBuffer], { type: "audio/wav" });
  const file_ = new File([blob], sound.name + ".wav")
  store.downloadedFiles.push(file_);
  const url = URL.createObjectURL(blob);
  const newFile: Upload = {
    name: sound.name,
    key: sound.username+"-"+sound.id.toString()+"-"+sound.name,
    size: blob.size,
    url: url,
    type: blob.type,
    lastModified: Date.now(),
    file: file_,
  };
  const formData = new FormData();
  formData.append("file", newFile.file);
  const { data } = await useFetch(
    `/api/upload?key=${newFile.key}&size=${newFile.size}&user=${state.user?.ref}`,
    {
      method: "POST",
      body: formData,
    },
  ).json();
  const file = unref(data) as AudioFile;
  filesUpload.files.push(file);
  notify("File downloaded","success")
};



</script>
<template>
  <Auth>
    <template #default="{ state }">

      <div class="row center">
      <Input
        v-model="modelValue"
        @keyup.enter="search(modelValue, state.token!)"
        placeholder="Descubre Sonidos..."
        class="sh"
      />
      <select
        v-model="filter"
        class="rounded-lg shadow-lg px-4 mx-2 py-2 sh dark:bg-gray-800 dark:text-gray-200"
        @change="search(modelValue, state.token!)"
      >
        <option value="bass">Bass</option>
        <option value="reverb">Reverb</option>
        <option value="melody">Melodic</option>
      </select>
      </div>
      <div class="p-4">
        <div
          v-for="item in result?.results"
          :key="item.id"
          class="rounded-lg shadow-lg mb-4 p-4"
        >
          <h2 class="text-xl font-semibold mb-2">{{ item.name }}</h2>
          <div class="mt-2">
            <span
              class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
              v-for="tag in item.tags"
              :key="tag"
            >
              {{ tag }}
            </span>
          </div>
          <a
            :href="item.license"
            target="_blank"
            class="text-blue-500 hover:underline text-sm mt-2 inline-block"
          >
            License
          </a>
          <button
            class="bg-primary m-2 px-2 py-1 dark:bg-success text-success dark:text-primary rounded-xl text-xs hover:underline"
            @click="showDetail(item.id, state.token!)"
          >
            See More
          </button>
        </div>
      </div>
      <Modal v-if="showModal" @close="showModal = false">
        <template #body>
          <Sounds
            v-for="sound in store.sounds"
            :soundData="sound"
            :key="sound.id"
            @download="downloadFile(sound, state.token!)"
          />
        </template>
      </Modal>
    </template>
  </Auth>
</template>

<script setup lang="ts">
import { User, Upload,AudioFile } from "~/types";
const filesData = reactive<Upload[]>([]);
const { fileState:filesUpload } = useFileStore();
const { notify } = useStore();
const props = defineProps<{
  user: User;
}>();
const onDrop = async (files: File[] | null) => {
  if (!files || files.length === 0) return;
  files
    .map((file) => {
      const url = useObjectUrl(file);
      return {
        user: props.user.ref,
        name: file.name,
        key: props.user.username+"-"+String(new Date())+"-"+file.name,
        size: file.size,
        url: url.value,
        type: file.type,
        lastModified: file.lastModified,
        file: file,
      };
    })
    .forEach(async (file:Upload) => {
      filesData.push(file);
      const formData = new FormData();
      formData.append("file", file.file);
      const { data } = await useFetch(
        `/api/upload?key=${file.key}&size=${file.size}&user=${props.user.ref}`,
        {
          method: "POST",
          body: formData,
        },
      ).json();
      filesUpload.files.push(unref(data));
      notify("File uploaded","success")
    });
  await getFiles();
};
const dropZoneRef = ref<HTMLElement>();

const { isOverDropZone } = useDropZone(dropZoneRef, onDrop);

const useInputEl = () => {
  const el = document.createElement("input");
  el.onchange = (e) => {
    const files = (e.target as HTMLInputElement).files as FileList;
    onDrop(Array.from(files));
  };
  el.setAttribute("type", "file");
  el.setAttribute("multiple", "true");
  el.setAttribute("accept", "*/*");
  el.click();
};

const deleteFile = async (id:string ) => {
  await useFetch(`/api/upload?ref=${id}`, {
    method: "DELETE",
  }).json();
  const filteredFile = filesUpload.files.filter((f) => f.ref !== id);
  filesUpload.files.splice(filesUpload.files.indexOf(filteredFile[0]), 1);
  await getFiles();
  notify("File deleted","success")
};

const getFiles = async () => {
  const { data } = await useFetch(
    `/api/upload?user=${props.user.ref}`,
  ).json();
  const files = unref(data);
  filesUpload.files = files;
};

onMounted(async () => {
  await getFiles();
});
</script>

<template>
  <div class="flex gap-4 overflow-auto">
    <div class="w-screen relative rounded-lg sh h-100vh">
      <div
        ref="dropZoneRef"
        @click="useInputEl"
        multiple
        class="flex flex-col w-full min-h-200px h-auto bg-gray-400/10 justify-center items-center mt-6"
      >
        <div>
          {{ isOverDropZone ? "Drop here" : "Drag and drop files here" }}
        </div>
      </div>
      <div class="col center m-8">
        <div class="grid3 p-8 gap-8" v-if="filesUpload.files.length > 0">
          <div
            v-for="(file, index) in filesUpload.files"
            :key="index"
            class="col bg-gray-100 sh center gap-2 p-4"
          >
            <p class="row gap-4">
              <Icon
                icon="mdi-close"
                @click="deleteFile(file.ref)"
                class="x2 cp hover:red-700 text-red-500 scale"
              />
            </p>
            <p class="text-sm text-body">
              {{ (file.size / 1000).toFixed(2) }} Kb
            </p>
            <div class="col center p-8">
              <audio controls :src="file.url" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { SoundInstance } from '~/types';
defineProps({
	soundData: {
		type: Object as PropType<SoundInstance>,
		required: true,
	},
});
</script>
<template>
<div class="p-4">
    <div class="bg-white rounded-lg shadow-lg mb-4 p-4">
     <div class="row justify-around gap-4">
      <h1 class="text-2xl font-semibold mb-4">{{ soundData.name }} by <strong class="font-cursive">{{ soundData.username }}</strong></h1> 	<button @click="$emit('download',soundData)" class="bg-blue-500 text-white p-2 rounded m-2 row center gap-2 hover:bg-success hover:text-primary" title="Download"><Icon icon="mdi-download" class="x2" />Download</button>
      </div>
      <!-- Image Previews -->
      <div class="grid gap-4 mb-4">
        <div v-for="(imgSrc, imgKey) in soundData.images" :key="imgKey" >
          <div v-if="imgKey?.endsWith('l')">
          <img :src="imgSrc" :alt="imgKey" class="w-full h-48 rounded sh animate " />
            <div class="text-center text-sm text-gray-600 font-sans">{{ imgKey }}</div>
          </div>
        </div>
      </div>

      <!-- Other Data -->
      <div class="grid grid-cols-2 gap-4">
        <div v-for="(value, key) in soundData" :key="key" >
          <div class="font-medium text-gray-600">{{ key }}</div>
          <div class="text-gray-800">
            <!-- Special handling for objects and arrays -->
            <div v-if="Array.isArray(value)">
              <span v-for="item in value" :key="item" class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                {{ item }}
              </span>
            </div>
            <div v-else-if="key==='license' || key==='url' || key==='download' || key==='pack' || key==='bookmark' || key==='comments' || key==='comment' || key==='rate' || key==='similar_sounds' || key==='analysis_frames' || key==='analysis_stats'" class="text-blue-500 hover:underline">
              <a :href="value" target="_blank" class="text-blue-500 hover:underline">{{ value }}</a>
            </div>
            <div v-else-if="typeof value === 'object' && key !== 'images'">
              <div v-for="(subValue, subKey) in value" :key="subKey">
                {{ subKey }}: {{ subValue }}
              </div>
            </div>
            
            <div v-else-if="key !== 'images'">
              {{ value }}
            </div>
					
          </div>
        </div>
      </div>
    </div>
    
  </div>
</template>
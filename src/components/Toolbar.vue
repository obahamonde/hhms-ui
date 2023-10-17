<script setup lang="ts"></script>
<template>
  <div
    class="flex items-center justify-between rounded-full bg-zinc-800 p-2 max-w-max"
  >
    <button class="toolbar-btn">
      <Icon icon="mdi:plus" class="x2" />
      <span class="sr-only">Create a comment</span>
    </button>
    <div class="flex space-x-2 border-r border-zinc-600 pr-1">
      <div class="relative">
        <RouterLink to="/" class="toolbar-btn">
          <Icon icon="mdi-home" class="btn-icon" />
        </RouterLink>
        <RouterLink to="/chatbot" class="toolbar-btn">
        <Icon icon="mdi-chat" class="btn-icon" />
      </RouterLink>
        <RouterLink to="/piano" class="toolbar-btn">
          <Icon icon="mdi-piano" class="btn-icon" />
        </RouterLink>  <RouterLink to="/discover" class="toolbar-btn">
      <Icon icon="mdi-magnify" class="btn-icon" />
    </RouterLink>
        <RouterLink to="/bucket" class="toolbar-btn">
          <Icon icon="mdi-bucket" class="btn-icon" />
        </RouterLink>
        
      </div>
    </div>

    <div class="flex items-center justify-center space-x-2 pl-1">
      
    </div>

    <button class="toolbar-btn">
      <Icon icon="mdi-mixer" class="btn-icon" />
      <span class="sr-only">Open menu</span>
    </button>
  
  </div>
</template>

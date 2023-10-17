<template>
  <main class="flex h-screen flex-col items-center justify-between p-2 gap-2">
    <img
      src="/logo.png"
      alt="Logo"
      class="x4 tl fixed m-2 invert dark:filter-none"
    />
    <Toolbar />
    <RouterView />
  </main>
</template>

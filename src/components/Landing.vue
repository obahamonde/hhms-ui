<script setup lang="ts">
const items = ref([
  {
    title: "Aprende",
    description: "Pule tus habilidades con nuestro tutor de Inteligencia Artificial.",
    href: "/chatbot",
  },
  {
    title: "Crea",
    description: "Descubre lo que puedes hacer con nuestro Music Studio.",
    href: "/piano",
  },
  {
    title: "Explora",
    description: "Accede a la biblioteca de sonidos más grande del mundo FreeSound.",
    href: "/discover",
  },
  {
    title: "Comparte",
    description: "Muéstrale al mundo lo que puedes hacer con HHMS.",
    href: "/bucket",
  },
]);
</script>
<template>
  <div
    class="z-10 max-w-5xl w-full col center font-mono text-sm lg:flex overflow-auto"
  >
    <p
      class="m-4 text-xs fixed col center left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 p-2 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto lg:rounded-xl lg:border lg:bg-gray-200 lg:p-2 lg:dark:bg-zinc-800/30"
    >
      No podemos cambiar el mundo a menos que nosotros mismos cambiemos.&nbsp;
      <p class="font-mono font-bold text-xs mt-2">- The Notorious B.I.G.</p>
    </p>
  </div>

  <div
    class="relative flex place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px] z-[-1]"
  >
    <img
      class="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] invert dark:filter-none x10"
      src="/logo.png"
      alt="App Logo"
      priority
    />
  </div>

  <div
    class="mb-32 row text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left"
  >
    <RouterLink
      v-for="action in items"
      :to="action.href"
      class="group rounded-lg border border-transparent p-2 m-2 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
      target="_blank"
      rel="noopener noreferrer"
    >
      <h2 class="mb-3 text-2xl font-semibold">
        {{ action.title }}
        <span
          class="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none"
        >
          -&gt;
        </span>
      </h2>
      <p class="m-0 max-w-[30ch] text-sm opacity-50">
        {{ action.description }}
      </p>
    </RouterLink>
  </div>
</template>

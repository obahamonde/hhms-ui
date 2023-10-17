<template>
  <nav flex="~ gap-4" mt-6 justify-center text-xl>
    <RouterLink icon-btn to="/" title="Inicio" data-test-id="home">
      <Icon icon="mdi-home" />
    </RouterLink>

    <button icon-btn @click="toggleDark()" title="Modo Oscuro">
      <Icon :icon="isDark ? 'mdi-lightbulb-off' : 'mdi-lightbulb-on'" />
    </button>

    <RouterLink icon-btn to="/about" title="Nosotros" data-test-id="about">
      <Icon icon="mdi-information" />
    </RouterLink>
  </nav>
</template>

<script setup>
import { ref, computed, onMounted, provide } from 'vue';
import Sidebar from './components/Sidebar.vue';
import Header from './components/Header.vue';
import Folders from './components/Folders.vue';
import RecentFiles from './components/RecentFiles.vue';

const data = ref(null);
const isMobileMenuOpen = ref(false);
const searchQuery = ref('');

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
};

const filteredFolders = computed(() => {
  if (!data.value) return [];
  const q = searchQuery.value.toLowerCase().trim();
  if (!q) return data.value.folders;
  return data.value.folders.filter((f) => f.name.toLowerCase().includes(q));
});

const filteredRecentFiles = computed(() => {
  if (!data.value) return [];
  const q = searchQuery.value.toLowerCase().trim();
  if (!q) return data.value.recentFiles;
  return data.value.recentFiles.filter((f) => f.name.toLowerCase().includes(q));
});

// Provide the state to child components
provide('isMobileMenuOpen', isMobileMenuOpen);
provide('toggleMobileMenu', toggleMobileMenu);
provide('searchQuery', searchQuery);

onMounted(async () => {
  try {
    const response = await fetch('/assets/data.json');
    data.value = await response.json();
  } catch (err) {
    console.error('Failed to load data', err);
  }
});
</script>

<template>
  <div
    class="w-full h-screen overflow-hidden bg-[#FDFDFD] flex lg:flex-row flex-col mx-auto font-sans text-blackText relative"
  >
    <!-- Mobile Overlay -->
    <div
      v-if="isMobileMenuOpen"
      class="fixed inset-0 bg-black/50 z-40 lg:hidden transition-opacity"
      @click="toggleMobileMenu"
    ></div>

    <template v-if="data">
      <Sidebar :navigation="data.navigation" :storage="data.storage" />
      <!-- Main Content -->
      <main
        class="flex-1 flex flex-col pt-[36px] lg:pl-[68px] lg:pr-[67px] px-[24px] pb-[35px] overflow-y-auto overflow-x-hidden w-full relative z-0"
      >
        <Header :user="data.user" />
        <Folders :folders="filteredFolders" class="mt-[34px]" />
        <RecentFiles :recentFiles="filteredRecentFiles" />
      </main>
    </template>
    <div v-else class="w-full min-h-screen flex items-center justify-center">
      <span class="text-sub">Loading...</span>
    </div>
  </div>
</template>

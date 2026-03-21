<script setup>
import { ref, onMounted } from 'vue';
import Sidebar from './components/Sidebar.vue';
import Header from './components/Header.vue';
import Folders from './components/Folders.vue';
import RecentFiles from './components/RecentFiles.vue';

const data = ref(null);

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
    class="w-full min-h-screen bg-[#FDFDFD] flex lg:flex-row flex-col mx-auto font-sans text-blackText relative"
  >
    <template v-if="data">
      <Sidebar :navigation="data.navigation" :storage="data.storage" />
      <!-- Main Content -->
      <main
        class="flex-1 flex flex-col pt-[36px] lg:pl-[68px] lg:pr-[67px] px-[24px] pb-[35px] overflow-y-auto w-full"
      >
        <Header :user="data.user" />
        <Folders :folders="data.folders" class="mt-[34px]" />
        <RecentFiles :recentFiles="data.recentFiles" />
      </main>
    </template>
    <div v-else class="w-full min-h-screen flex items-center justify-center">
      <span class="text-sub">Loading...</span>
    </div>
  </div>
</template>

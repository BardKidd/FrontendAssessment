<template>
  <!-- 
    Header Container 
    1440*1024 layout:
    Overall height 70px.
    Responsive/Fluid width (managed by parent container layout).
  -->
  <header class="flex justify-between items-center w-full h-[70px]">
    <!-- Left titles -->
    <div class="flex items-center gap-[8px] h-full">
      <button
        class="lg:hidden text-sub hover:text-main2 focus:outline-none mr-[8px]"
        @click="toggleMobileMenu"
      >
        <!-- Hamburger Icon -->
        <svg
          class="w-6 h-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>
      <div class="flex flex-col justify-center h-full">
        <h1 class="text-[28px] font-bold text-main2 leading-none lg:mb-[14px]">
          My Cloud
        </h1>
        <p
          class="hidden lg:block text-[20px] font-medium text-sub leading-none tracking-tight"
        >
          Welcome, {{ user?.name || 'James Alto' }}!
          <span class="ml-[12px]">👋</span>
        </p>
      </div>
    </div>

    <!-- Right actions -->
    <div class="flex items-center">
      <!-- Search Input (Desktop) -->
      <SearchBar
        v-model="searchQuery"
        placeholder="Search anything here"
        class="header-search hidden lg:flex w-[336px] mr-[12px]"
      />

      <!-- Notification Icon -->
      <button
        class="header-notify w-[40px] h-[40px] bg-white rounded-[8px] flex flex-shrink-0 items-center justify-center relative hover:text-brand transition focus:outline-none shadow-figma-drop mr-[12px] -mt-[4px]"
      >
        <svg
          class="w-[20px] h-[20px] text-main2"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z"
          />
        </svg>
        <!-- Red dot indicator with number -->
        <span
          class="absolute top-[8px] right-[8px] min-w-[12px] h-[12px] bg-accentRed rounded-full text-white text-[8px] font-bold flex items-center justify-center leading-none px-[2px]"
          >1</span
        >
      </button>

      <!-- Settings Icon -->
      <button
        class="header-settings hidden sm:flex w-[40px] h-[40px] bg-white rounded-[8px] flex-shrink-0 items-center justify-center hover:text-brand transition focus:outline-none shadow-figma-drop mr-[12px] -mt-[4px]"
      >
        <svg
          class="w-[20px] h-[20px] text-main2"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fill-rule="evenodd"
            d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
            clip-rule="evenodd"
          />
        </svg>
      </button>

      <!-- Avatar -->
      <div
        class="header-avatar w-[40px] h-[40px] rounded-[8px] overflow-hidden shrink-0 cursor-pointer bg-white shadow-figma-drop -mr-[4.5px] -mt-[5px]"
      >
        <img
          src="/assets/avatars/member.jpg"
          alt="Avatar"
          class="w-full h-full object-cover"
        />
      </div>
    </div>
  </header>

  <!-- Mobile Search Bar -->
  <SearchBar
    v-model="searchQuery"
    placeholder="Search anything here"
    class="flex lg:hidden mt-[12px] w-full"
  />
</template>

<script setup>
import { inject } from 'vue';
import SearchBar from './SearchBar.vue';

defineProps({
  user: { type: Object, default: () => ({}) },
});

const toggleMobileMenu = inject('toggleMobileMenu');
const searchQuery = inject('searchQuery');
</script>

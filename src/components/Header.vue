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
      <button class="lg:hidden text-[#757897] hover:text-[#051F61] focus:outline-none mr-[8px]" @click="toggleMobileMenu">
        <!-- Hamburger Icon -->
        <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
           <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
      <div class="flex flex-col justify-center h-full">
        <h1 class="text-[28px] font-bold text-[#051F61] leading-none lg:mb-[8px]">My Cloud</h1>
        <p class="hidden lg:block text-[20px] font-medium text-[#757897] leading-none tracking-tight">Welcome, {{ user?.name || 'James Alto' }}! 👋</p>
      </div>
    </div>
    
    <!-- Right actions -->
    <div class="flex items-center gap-[12px] lg:gap-[24px]">
      <!-- Search Input -->
      <div class="hidden lg:flex bg-white rounded-[8px] w-[336px] h-[40px] items-center py-[8px] px-[16px] shadow-[0px_2px_100px_rgba(0,0,0,0.1)] gap-[16px]">
        <svg class="w-[24px] h-[24px] text-[#757897] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
        </svg>
        <input type="text" v-model="searchQuery" placeholder="Search anything here" class="outline-none h-[24px] text-[14px] w-full bg-transparent text-[#757897] placeholder-[#757897]" />
      </div>

      <!-- Notification Icon -->
      <button class="w-[40px] h-[40px] bg-white rounded-[8px] flex flex-shrink-0 items-center justify-center relative hover:text-[#0061FF] transition focus:outline-none shadow-[0px_2px_100px_rgba(0,0,0,0.1)]">
        <svg class="w-[20px] h-[20px] text-[#051F61]" fill="currentColor" viewBox="0 0 20 20">
          <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z"/>
        </svg>
        <!-- Red dot indicator with number -->
        <span class="absolute top-[8px] right-[8px] min-w-[12px] h-[12px] bg-[#EB5757] rounded-full text-white text-[8px] font-bold flex items-center justify-center leading-none px-[2px]">1</span>
      </button>

      <!-- Settings Icon -->
      <button class="hidden sm:flex w-[40px] h-[40px] bg-white rounded-[8px] flex-shrink-0 items-center justify-center hover:text-[#0061FF] transition focus:outline-none shadow-[0px_2px_100px_rgba(0,0,0,0.1)]">
        <svg class="w-[20px] h-[20px] text-[#051F61]" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clip-rule="evenodd"/>
        </svg>
      </button>

      <!-- Avatar -->
      <div class="w-[40px] h-[40px] rounded-[8px] overflow-hidden shrink-0 cursor-pointer bg-white shadow-[0px_2px_100px_rgba(0,0,0,0.1)]">
        <img src="/assets/avatars/member.jpg" alt="Avatar" class="w-full h-full object-cover" />
      </div>
    </div>
  </header>
</template>

<script setup>
import { inject } from 'vue';

defineProps({
  user: { type: Object, default: () => ({}) }
});

const toggleMobileMenu = inject('toggleMobileMenu');
const searchQuery = inject('searchQuery');
</script>

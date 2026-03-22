<template>
  <aside
    class="fixed inset-y-0 left-0 z-50 transform transition-transform duration-300 w-[262px] bg-white h-screen shadow-[0px_2px_100px_rgba(0,0,0,0.1)] flex flex-col pt-[43px] pb-[40px] px-[38px] flex-shrink-0 overflow-y-auto overflow-x-hidden custom-scrollbar lg:relative lg:translate-x-0"
    :class="isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'"
  >
    <!-- Logo -->
    <div class="flex items-center justify-between mb-[clamp(40px,8.3vh,85px)]">
      <div class="flex items-center cursor-pointer gap-[10px]">
        <!-- Icon part -->
        <svg
          class="h-[28px] w-auto flex-shrink-0"
          viewBox="0 0 54 46"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M13.5 0L0 8.8L13.5 17.6L27 8.8L13.5 0ZM40.5 0L27 8.8L40.5 17.6L54 8.8L40.5 0ZM0 26.4L13.5 35.2L27 26.4L13.5 17.6L0 26.4ZM54 26.4L40.5 35.2L27 26.4L40.5 17.6L54 26.4ZM13.5 36.8L27 45.6L40.5 36.8L27 28L13.5 36.8Z"
            fill="#0061FF"
          />
        </svg>
        <!-- Text part -->
        <span
          class="font-black text-[25px] text-black leading-none font-sans tracking-[0.3px] -translate-x-[5px] -translate-y-[1px]"
          >Dropbox</span
        >
      </div>
      <!-- Close button on Mobile -->
      <button
        class="lg:hidden text-sub hover:text-main2 focus:outline-none -mr-[10px]"
        @click="toggleMobileMenu"
      >
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
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>

    <!-- Navigation -->
    <nav class="space-y-[clamp(16px,5.4vh,56px)]">
      <button
        v-for="item in navigation"
        :key="item.id"
        @click="activeMenu = item.id"
        class="w-full flex items-center gap-[20px] relative transition-colors duration-200 text-[20px] font-semibold leading-[24px]"
        :class="
          activeMenu === item.id
            ? 'text-main2'
            : 'text-sub hover:text-main2 group'
        "
      >
        <!-- Active Indicator Box with SVG Crop -->
        <div
          v-if="activeMenu === item.id"
          class="absolute -left-[38px] top-1/2 -translate-y-1/2 w-[11px] h-[37px] overflow-hidden flex items-center justify-start"
        >
          <img
            src="/assets/icons/logo-dropbox.svg"
            alt=""
            class="h-[37px] max-w-none object-left"
          />
        </div>

        <!-- Menu Icon -->
        <div
          class="w-[20px] h-[20px] flex items-center justify-center relative flex-shrink-0"
        >
          <div
            class="w-full h-full transition-colors duration-200"
            :style="{
              maskImage: `url(${item.icon})`,
              maskSize: 'contain',
              maskRepeat: 'no-repeat',
              maskPosition: 'center',
              WebkitMaskImage: `url(${item.icon})`,
              WebkitMaskSize: 'contain',
              WebkitMaskRepeat: 'no-repeat',
              WebkitMaskPosition: 'center',
            }"
            :class="
              activeMenu === item.id
                ? 'bg-brand'
                : 'bg-sub group-hover:bg-main2'
            "
          ></div>
        </div>

        <span class="whitespace-nowrap truncate">{{ item.label }}</span>
      </button>
    </nav>

    <!-- Storage Widget -->
    <div
      v-if="storage"
      class="mt-auto w-[182px] h-[269px] mx-auto bg-white rounded-[20px] shadow-[0px_2px_30px_rgba(0,0,0,0.06)] flex flex-col items-start pt-[20px] pb-[20px] px-[20px] relative box-border flex-shrink-0"
    >
      <div
        class="flex justify-start flex-1 items-end mb-[18px] w-full pl-[5px]"
      >
        <!-- 3D Folder Icon -->
        <img
          src="/assets/img/file1-DrawKit3D.png"
          alt="Folder"
          class="w-[110px] h-[110px] object-contain -translate-x-[24px] -translate-y-[1px]"
        />
      </div>
      <div class="w-full flex flex-col items-center">
        <div class="w-[142px] -translate-x-[2px]">
          <div
            class="text-[16px] font-semibold text-main2 mb-[10px] leading-[17px] text-left -translate-y-[15px]"
          >
            {{ storage.percentage }}% In-use
          </div>
          <div
            class="w-full h-[6px] bg-brandLight rounded-[8px] mb-[10px] relative overflow-hidden -translate-x-[1px] -translate-y-[11px]"
          >
            <div
              class="h-full bg-main2 rounded-[8px] absolute left-0 top-0 transition-all duration-300"
              :style="{ width: storage.percentage + '%' }"
            ></div>
          </div>
          <div
            class="flex items-center w-full justify-between text-[12px] leading-[13px] mb-[22px] -translate-x-[1px] -translate-y-[1px] -mt-[15px]"
          >
            <span class="text-main2 font-bold"
              >{{ storage.used }}{{ storage.unit }}</span
            >
            <span class="text-sub font-semibold"
              >{{ storage.total }}{{ storage.unit }}</span
            >
          </div>
          <button
            class="w-[142px] h-[40px] bg-brand text-white rounded-[8px] font-bold text-[14px] leading-[17px] hover:opacity-90 transition -translate-x-[3px]"
          >
            Upgrade
          </button>
        </div>
      </div>
    </div>
  </aside>
</template>

<script setup>
import { ref, inject } from 'vue';

const props = defineProps({
  navigation: { type: Array, default: () => [] },
  storage: { type: Object, default: () => ({}) },
});

const activeMenu = ref('home');
const isMobileMenuOpen = inject('isMobileMenuOpen');
const toggleMobileMenu = inject('toggleMobileMenu');
</script>

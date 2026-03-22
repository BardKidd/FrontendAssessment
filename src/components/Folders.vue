<template>
  <div class="w-full">
    <div class="flex justify-between items-center mb-[18px]">
      <h2
        class="text-[24px] font-medium text-main2 leading-[24px] h-[24px]"
        style="font-family: 'Lato', sans-serif"
      >
        All files
      </h2>
      <button
        class="bg-[#EBF2FF] text-brand px-[20px] py-[10px] rounded-[8px] text-[14px] font-bold flex items-center justify-center hover:bg-[#DCE7FF] transition focus:outline-none h-[40px] leading-[20px] shadow-[0px_1px_2px_rgba(16,24,40,0.05)]"
      >
        <span class="mr-2">+</span> Add new
      </button>
    </div>

    <!-- Grid -->
    <div
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-[24px] gap-y-[24px]"
    >
      <div
        v-for="folder in folders.slice(0, 6)"
        :key="folder.id"
        class="bg-white rounded-[20px] w-full shadow-figma-card flex flex-col justify-between hover:shadow-md transition p-[30px] box-border"
      >
        <!-- Top row: Icon and dots -->
        <div class="flex justify-between items-start">
          <div class="flex items-center gap-[16px]">
            <div
              class="relative w-[40px] h-[40px] flex items-center justify-center flex-shrink-0"
            >
              <img
                src="/assets/icons/icon-folder.svg"
                class="absolute w-[241px] h-[240px] max-w-none pointer-events-none"
                alt="Folder Icon"
              />
            </div>
            <div class="flex flex-col">
              <h3
                class="font-medium text-blackText text-[16px] leading-[18px] mb-[4px]"
              >
                {{ folder.name }}
              </h3>
              <p class="font-medium text-[14px] text-sub leading-tight">
                {{ folder.modifiedDate }}
              </p>
            </div>
          </div>
          <div class="relative">
            <button
              class="text-sub hover:text-main2 focus:outline-none flex items-center h-full pt-[2px]"
              @click.stop="toggleDropdown(folder.id)"
            >
              <svg
                class="w-[24px] h-[24px]"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"
                />
              </svg>
            </button>
            <!-- Fake Dropdown -->
            <DropdownMenu
              v-if="openDropdownId === folder.id"
              :items="folderMenuItems"
              class="absolute right-0 top-[30px] z-50"
            />
          </div>
        </div>

        <!-- Bottom info -->
        <div class="flex mt-[33px] gap-[23px]">
          <div class="flex flex-col w-[148px] flex-shrink-0">
            <div
              class="font-medium text-[14px] leading-[18px] text-sub mb-[10px] tracking-wide"
            >
              Shared Users
            </div>
            <div class="relative h-[36px] w-full">
              <img
                v-for="(u, idx) in folder.sharedUsers.slice(0, 4)"
                :key="idx"
                :src="u.avatar"
                :style="{ zIndex: idx, left: `${idx * 28}px` }"
                class="absolute top-0 w-[36px] h-[36px] rounded-[10px] border-[2px] border-white object-cover bg-gray-200 box-border shadow-sm"
              />
              <div
                v-if="folder.sharedUsersCount > 0"
                :style="{
                  zIndex: 10,
                  left: `${Math.min(folder.sharedUsers.length, 4) * 28}px`,
                }"
                class="absolute top-0 w-[36px] h-[36px] rounded-[10px] border-[2px] border-white bg-[#EBF2FF] text-brand font-semibold text-[13px] flex items-center justify-center box-border"
              >
                +{{ folder.sharedUsersCount }}
              </div>
            </div>
          </div>
          <div class="flex flex-col">
            <div
              class="font-medium text-[14px] leading-[18px] text-sub mb-[10px] tracking-wide"
            >
              Inside Files
            </div>
            <div
              class="w-[78px] h-[36px] bg-[#EBF2FF] text-brand rounded-[10px] border-[2px] border-white text-[13px] font-semibold flex items-center justify-center select-none box-border"
            >
              {{ folder.insideFiles.toLocaleString() }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import DropdownMenu from './DropdownMenu.vue';

defineProps({
  folders: { type: Array, default: () => [] },
});

const folderMenuItems = [
  { label: 'Rename', iconPaths: ['M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z'] },
  { label: 'Share', iconPaths: ['M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z'] },
  { label: 'Download', iconPaths: ['M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4'] },
  { divider: true },
  { label: 'Delete', iconPaths: ['M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16'], danger: true },
];

const openDropdownId = ref(null);

const toggleDropdown = (id) => {
  openDropdownId.value = openDropdownId.value === id ? null : id;
};

const closeDropdown = () => {
  openDropdownId.value = null;
};

onMounted(() => {
  document.addEventListener('click', closeDropdown);
});

onUnmounted(() => {
  document.removeEventListener('click', closeDropdown);
});
</script>


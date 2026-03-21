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
          <button
            class="text-sub hover:text-main2 focus:outline-none flex items-center h-full pt-[2px]"
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
defineProps({
  folders: { type: Array, default: () => [] },
});
</script>

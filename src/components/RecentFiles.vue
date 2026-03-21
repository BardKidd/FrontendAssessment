<template>
  <div class="w-full">
    <h2
      class="text-[24px] font-medium text-main2 leading-[22px] mt-[36px] mb-[24px]"
      style="font-family: 'Lato', sans-serif"
    >
      Recent Files
    </h2>

    <div
      class="bg-white rounded-[20px] shadow-figma-card px-[30.5px] pt-[29.5px] pb-[15px] box-border w-full"
    >
      <!-- Table Header -->
      <div
        class="grid grid-cols-12 gap-x-[16px] pb-[16px] border-b-[1px] border-[#EFEFEF]"
      >
        <div
          class="col-span-4 flex items-center gap-[4px] cursor-pointer font-medium text-[14px] text-sub leading-[18px]"
        >
          Name
          <img
            src="/assets/icons/icon-sort.svg"
            class="w-[8px] h-[15px] ml-[2px]"
            alt="Sort"
          />
        </div>
        <div
          class="col-span-3 flex items-center gap-[4px] cursor-pointer font-medium text-[14px] text-sub leading-[18px]"
        >
          Shared Users
          <img
            src="/assets/icons/icon-sort.svg"
            class="w-[8px] h-[15px] ml-[2px]"
            alt="Sort"
          />
        </div>
        <div
          class="col-span-2 flex items-center gap-[4px] cursor-pointer font-medium text-[14px] text-sub leading-[18px]"
        >
          File Size
          <img
            src="/assets/icons/icon-sort.svg"
            class="w-[8px] h-[15px] ml-[2px]"
            alt="Sort"
          />
        </div>
        <div
          class="col-span-3 flex items-center gap-[4px] cursor-pointer font-medium text-[14px] text-sub leading-[18px]"
        >
          Last Modified
          <img
            src="/assets/icons/icon-sort.svg"
            class="w-[8px] h-[15px] ml-[2px]"
            alt="Sort"
          />
        </div>
      </div>

      <!-- Table Rows -->
      <div class="flex flex-col">
        <div
          v-for="file in recentFiles"
          :key="file.id"
          class="grid grid-cols-12 gap-x-[16px] py-[14.5px] items-center even:bg-[#F9FAFD] hover:bg-[#F9FAFD] transition duration-200 group -mx-[30.5px] px-[30.5px]"
        >
          <div class="col-span-4 flex items-center gap-[16px]">
            <div
              class="w-[40px] h-[40px] rounded-[10px] flex items-center justify-center flex-shrink-0"
              :class="{
                'bg-[#FFF4E5] text-accentOrange': file.type === 'image',
                'bg-[#EBF2FF] text-brand': file.type === 'archive',
                'bg-[#FCE7F3] text-accentPurple': file.type === 'video',
              }"
            >
              <svg
                v-if="file.type === 'image'"
                class="w-[20px] h-[20px]"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                />
              </svg>
              <svg
                v-else-if="file.type === 'archive'"
                class="w-[20px] h-[20px]"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
                />
              </svg>
              <svg
                v-else
                class="w-[20px] h-[20px]"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z"
                />
              </svg>
            </div>
            <span
              class="font-medium text-[14px] text-brand hover:underline cursor-pointer truncate"
              >{{ file.name }}</span
            >
          </div>

          <div class="col-span-3 flex items-center relative h-[36px]">
            <img
              v-for="(u, idx) in file.sharedUsers.slice(0, 4)"
              :key="idx"
              :src="u.avatar"
              :style="{ zIndex: idx, left: `${idx * 28}px` }"
              class="absolute top-0 w-[36px] h-[36px] rounded-[10px] border-[2px] border-white object-cover bg-gray-200 box-border shadow-sm"
            />
            <div
              v-if="file.sharedUsersCount > 0"
              :style="{
                zIndex: 10,
                left: `${Math.min(file.sharedUsers.length, 4) * 28}px`,
              }"
              class="absolute top-0 w-[36px] h-[36px] rounded-[10px] border-[2px] border-white bg-[#EBF2FF] text-brand font-semibold text-[13px] flex items-center justify-center box-border shadow-sm"
            >
              +{{ file.sharedUsersCount }}
            </div>
          </div>

          <div class="col-span-2 text-[14px] font-normal text-textDark">
            {{ file.size }}
          </div>

          <div
            class="col-span-3 flex justify-between items-center text-[14px] font-normal text-textDark"
          >
            <span>{{ file.modifiedDate }}</span>
            <button
              class="text-[#757897] hover:text-main2 focus:outline-none flex items-center justify-center w-[24px] h-[24px] rounded-full hover:bg-gray-100 transition mr-[12px]"
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
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
defineProps({
  recentFiles: { type: Array, default: () => [] },
});
</script>

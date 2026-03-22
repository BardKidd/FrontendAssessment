<template>
  <div class="w-full">
    <h2
      class="text-[24px] font-medium text-main2 leading-[22px] mt-[36px] mb-[24px]"
      style="font-family: 'Lato', sans-serif"
    >
      Recent Files
    </h2>

    <div
      class="bg-white rounded-[20px] shadow-figma-card px-[30.5px] pt-[29.5px] pb-[15px] box-border w-full overflow-x-auto custom-scrollbar"
    >
      <div class="min-w-[800px]">
        <!-- Table Header -->
        <div
          class="grid grid-cols-[31%_22%_20%_25%] gap-x-[16px] pb-[16px] border-b-[1px] border-[#EFEFEF]"
        >
          <div
            class="flex items-center gap-[4px] cursor-pointer font-medium text-[14px] leading-[18px] select-none"
            :class="sortKey === 'name' ? 'text-main2' : 'text-sub'"
            @click="toggleSort('name')"
          >
            Name
            <img
              src="/assets/icons/icon-sort.svg"
              class="w-[8px] h-[15px] ml-[2px]"
              :class="{ 'opacity-50': sortKey !== 'name' }"
              alt="Sort"
            />
          </div>
          <div
            class="flex items-center gap-[4px] cursor-default font-medium text-[14px] text-sub leading-[18px]"
          >
            Shared Users
            <!-- !沒有實際功能，所以先隱藏起來 -->
            <!-- <img
            src="/assets/icons/icon-sort.svg"
            class="w-[8px] h-[15px] ml-[2px]"
            alt="Sort"
          /> -->
          </div>
          <div
            class="flex items-center gap-[4px] cursor-pointer font-medium text-[14px] leading-[18px] select-none"
            :class="sortKey === 'size' ? 'text-main2' : 'text-sub'"
            @click="toggleSort('size')"
          >
            File Size
            <img
              src="/assets/icons/icon-sort.svg"
              class="w-[8px] h-[15px] ml-[2px]"
              :class="{ 'opacity-50': sortKey !== 'size' }"
              alt="Sort"
            />
          </div>
          <div
            class="flex items-center gap-[4px] cursor-pointer font-medium text-[14px] leading-[18px] select-none"
            :class="sortKey === 'date' ? 'text-main2' : 'text-sub'"
            @click="toggleSort('date')"
          >
            Last Modified
            <img
              src="/assets/icons/icon-sort.svg"
              class="w-[8px] h-[15px] ml-[2px]"
              :class="{ 'opacity-50': sortKey !== 'date' }"
              alt="Sort"
            />
          </div>
        </div>

        <!-- Table Rows -->
        <div class="flex flex-col">
          <div
            v-for="file in sortedFiles"
            :key="file.id"
            class="grid grid-cols-[30%_22%_21%_25%] 2xl:grid-cols-[31%_22%_20%_25%] gap-x-[16px] h-[71px] items-center even:bg-[#F9FAFD] hover:bg-[#F9FAFD] transition duration-200 group -mx-[30.5px] px-[30.5px]"
          >
            <div class="flex items-center gap-[16px]">
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
                class="font-medium text-[14px] text-brand hover:underline cursor-pointer truncate leading-none mt-[2px]"
                >{{ file.name }}</span
              >
            </div>

            <div
              class="flex items-center relative h-[36px] translate-x-[3px] translate-y-[1px]"
            >
              <img
                v-for="(u, idx) in file.sharedUsers.slice(0, 4)"
                :key="idx"
                :src="u.avatar"
                :style="{ zIndex: idx, left: `${idx * 25}px` }"
                class="absolute top-0 w-[36px] h-[36px] rounded-[10px] border-[2px] border-white object-cover bg-gray-200 box-border shadow-sm"
              />
              <div
                v-if="file.sharedUsersCount > 0"
                :style="{
                  zIndex: 10,
                  left: `${Math.min(file.sharedUsers.length, 4) * 25}px`,
                }"
                class="absolute top-0 w-[36px] h-[36px] rounded-[10px] border-[2px] border-white bg-[#EBF2FF] text-brand font-semibold text-[13px] flex items-center justify-center box-border shadow-sm"
              >
                +{{ file.sharedUsersCount }}
              </div>
            </div>

            <div
              class="text-[14px] font-normal text-textDark leading-none mt-[2px]"
            >
              {{ file.size }}
            </div>

            <div
              class="flex justify-between items-center text-[14px] font-normal text-textDark"
            >
              <span class="leading-none mt-[2px]">{{ file.modifiedDate }}</span>
              <div class="mr-[12px]">
                <button
                  :ref="
                    (el) => {
                      if (el) btnRefs[file.id] = el;
                    }
                  "
                  class="text-sub hover:text-main2 focus:outline-none flex items-center justify-center w-[24px] h-[24px] rounded-full hover:bg-gray-100 transition"
                  @click.stop="toggleDropdown(file.id)"
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
    </div>

    <!-- Teleported Dropdown -->
    <Teleport to="body">
      <DropdownMenu
        v-if="openDropdownId !== null"
        :items="fileMenuItems"
        class="fixed z-[9999]"
        :style="dropdownStyle"
      />
    </Teleport>
  </div>
</template>

<script setup>
import { ref, reactive, computed, nextTick, onMounted, onUnmounted } from 'vue';
import DropdownMenu from './DropdownMenu.vue';

const props = defineProps({
  recentFiles: { type: Array, default: () => [] },
});

const fileMenuItems = [
  {
    label: 'Preview',
    iconPaths: [
      'M15 12a3 3 0 11-6 0 3 3 0 016 0z',
      'M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z',
    ],
  },
  {
    label: 'Copy Link',
    iconPaths: [
      'M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z',
    ],
  },
  {
    label: 'Download',
    iconPaths: [
      'M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4',
    ],
  },
  { divider: true },
  {
    label: 'Delete',
    iconPaths: [
      'M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16',
    ],
    danger: true,
  },
];

// Sort state
const sortKey = ref(null);
const sortDir = ref('asc');

const toggleSort = (key) => {
  if (sortKey.value === key) {
    sortDir.value = sortDir.value === 'asc' ? 'desc' : 'asc';
  } else {
    sortKey.value = key;
    sortDir.value = 'asc';
  }
};

const parseSize = (sizeStr) => {
  const parts = sizeStr.match(/([\d.]+)\s*(KB|MB|GB|TB)/i);
  if (!parts) return 0;
  const num = parseFloat(parts[1]);
  const unit = parts[2].toUpperCase();
  const multipliers = { KB: 1024, MB: 1024 ** 2, GB: 1024 ** 3, TB: 1024 ** 4 };
  return num * (multipliers[unit] || 1);
};

const sortedFiles = computed(() => {
  const files = [...props.recentFiles];
  if (!sortKey.value) return files;
  const dir = sortDir.value === 'asc' ? 1 : -1;
  return files.sort((a, b) => {
    if (sortKey.value === 'name') return dir * a.name.localeCompare(b.name);
    if (sortKey.value === 'size')
      return dir * (parseSize(a.size) - parseSize(b.size));
    if (sortKey.value === 'date')
      return dir * (new Date(a.modifiedDate) - new Date(b.modifiedDate));
    return 0;
  });
});

// Dropdown state — Teleport to body
const openDropdownId = ref(null);
const btnRefs = reactive({});
const dropdownStyle = ref({});

const toggleDropdown = (id) => {
  if (openDropdownId.value === id) {
    openDropdownId.value = null;
    return;
  }
  openDropdownId.value = id;
  nextTick(() => {
    const btn = btnRefs[id];
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    const dropdownH = 180; // approximate dropdown height
    const spaceBelow = window.innerHeight - rect.bottom;
    const top =
      spaceBelow < dropdownH ? rect.top - dropdownH - 6 : rect.bottom + 6;
    dropdownStyle.value = {
      top: `${top}px`,
      left: `${rect.right - 160}px`,
    };
  });
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

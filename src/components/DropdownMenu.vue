<template>
  <div
    class="w-[160px] bg-white rounded-[12px] shadow-figma-card border border-gray-100 py-[8px]"
    @click.stop
  >
    <template v-for="(item, idx) in items" :key="item.label">
      <hr v-if="item.divider" class="my-[4px] border-gray-100" />
      <button
        v-else
        class="w-full text-left px-[16px] py-[8px] text-[13px] transition flex items-center gap-[8px]"
        :class="
          item.danger
            ? 'text-accentRed hover:bg-red-50'
            : 'text-textDark hover:bg-[#F9FAFD]'
        "
      >
        <svg
          class="w-4 h-4 flex-shrink-0"
          :class="item.danger ? '' : 'text-sub'"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            v-for="(d, i) in item.iconPaths"
            :key="i"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            :d="d"
          />
        </svg>
        {{ item.label }}
      </button>
    </template>
  </div>
</template>

<script setup>
defineProps({
  // Each item: { label: string, iconPaths: string[], danger?: boolean }
  // or { divider: true } for a separator
  items: {
    type: Array,
    default: () => [],
  },
});
</script>

<template>
  <div class="bg-white rounded-[8px] h-[40px] items-center py-[8px] px-[16px] shadow-figma-drop gap-[12px] lg:gap-[16px]">
    <svg class="w-[20px] h-[20px] lg:w-[24px] lg:h-[24px] text-sub flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
    </svg>
    <input
      type="text"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      :placeholder="placeholder"
      class="outline-none h-[24px] text-[14px] w-full bg-transparent text-sub placeholder-sub"
    />
  </div>
</template>

<script setup>
defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  placeholder: {
    type: String,
    default: 'Search anything here'
  }
});

defineEmits(['update:modelValue']);
</script>

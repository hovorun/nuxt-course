<template>
  <label
    class="rounded inline-block text-white font-bold py-2 px-4 mt-4 cursor-pointer"
    :class="{
      'bg-green-500': modelValue,
      'bg-gray-500': !modelValue,
    }"
  >
    <input
      type="checkbox"
      class="hidden"
      :value="modelValue"
      @input="$emit('update:modelValue', !modelValue)"
    >
    {{ modelValue ? 'Completed!' : 'Mark as complete' }}
  </label>
</template>

<script setup lang="ts">
defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
});

defineEmits(['update:modelValue']);
</script>

<style lang="scss" scoped>
::selection {
  display: none;
}
</style>

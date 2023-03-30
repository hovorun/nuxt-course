<template>
  <iframe
    :src="`https://player.vimeo.com/video/${props.videoId}`"
    width="464"
    title="Video player"
    allowfullscreen
    allow="accelerometer; autoplay; clipboard-write; encrypted-media;"
    height="315"
    frameborder="0"
  />
</template>

<script lang="ts" setup>
const props = defineProps({
  videoId: {
    type: Number,
    required: true,
  },
});
</script>

<style lang="scss" scoped></style>

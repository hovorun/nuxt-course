<template>
  <div>
    <p class="mt-0 uppercase font-bold text-slate-400 mb-1">
      Lesson {{ chapter.number }} - {{ lesson.number }}
    </p>

    <h2 class="my-0 font-bold text-2xl">
      {{ lesson.title }}
    </h2>

    <div class="flex space-x-4 mt-2">
      <NuxtLink
        v-if="lesson.sourceUrl"
        :to="lesson.sourceUrl"
        class="font-normal text-md text-gray-500"
      >
        Download Source Code
      </NuxtLink>

      <NuxtLink
        v-if="lesson.downloadUrl"
        :to="lesson.downloadUrl"
        class="font-normal text-md text-gray-500"
      >
        Download Video
      </NuxtLink>
    </div>

    <VideoPlayer
      v-if="lesson.videoId"
      :video-id="lesson.videoId"
    />

    <p>
      {{ lesson.text }}
    </p>

    <ClientOnly>
      <LessonCompleteButton
        :model-value="isLessonComplete"
        @update:model-value="toggleComplete"
      />
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { useLocalStorage } from '@vueuse/core';
import { useHead } from '#imports';
import { useCourseData } from '~/composables';

const data = useCourseData();
const route = useRoute();

const chapter = computed(() => {
  return data.find(chapter => chapter.slug === route.params.chapterSlug);
});

const lesson = computed(() => {
  if (!chapter.value) {
    return;
  }

  return chapter.value.lessons.find(lesson => lesson.slug === route.params.lessonSlug);
});

const pageTitle = computed(() => {
  return `${lesson.value?.title} - ${chapter.value?.title}`;
});

const progress = useLocalStorage<boolean[][]>('progress', []);

const isLessonComplete = computed<boolean>(() => {
  if (!chapter.value || !lesson.value) {
    return false;
  }

  if (!progress.value[chapter.value.number - 1]) {
    return false;
  }

  if (!progress.value[chapter.value.number - 1][lesson.value.number - 1]) {
    return false;
  }

  return progress.value[chapter.value.number - 1][lesson.value.number - 1];
});


const toggleComplete = () => {
  if (!chapter.value || !lesson.value || !progress.value) {
    return false;
  }

  if (!progress.value[chapter.value.number - 1]) {
    progress.value[chapter.value.number - 1] = [];
  }

  progress.value[chapter.value.number - 1][lesson.value.number - 1] =
      !progress.value[chapter.value.number - 1][lesson.value.number - 1];
};

useHead({
  title: pageTitle,
});

</script>

<style lang="scss" scoped></style>

import courseData from '../data/lessons.json';

export interface Chapter {
    title: string
    slug: string
    number: number
    lessons: Lesson[]
}

export interface Lesson {
    title: string
    slug: string
    number: number
    downloadUrl: string
    videoId: number
    text: string
    sourceUrl?: string
    path?: string
}

export const useCourseData = (): Chapter[] => {
  return courseData.map(chapter => {
    return {
      ...chapter,
      lessons: chapter.lessons.map(lesson => {
        return {
          ...lesson,
          path: `/course/chapter/${chapter.slug}/lesson/${lesson.slug}`,
        };
      }),
    };
  });
};

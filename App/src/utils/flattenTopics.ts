// utils/flattenTopics.ts

export interface SearchOption {
  id: number;
  title: string;
  type: "Topic" | "Content";
}

import { TopicList } from "./types";

export const flattenTopics = (data: TopicList): SearchOption[] => {
  const options: SearchOption[] = [];

  data.topics.forEach((topic) => {
    options.push({
      id: topic.id,
      title: topic.title,
      type: "Topic",
    });

    topic.contents.forEach((content) => {
      options.push({
        id: content.id,
        title: content.title,
        type: "Content",
      });
    });
  });

  return options;
};

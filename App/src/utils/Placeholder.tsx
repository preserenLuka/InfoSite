import { TopicList } from "../utils/types";

export const getPlaceholderData = async (): Promise<TopicList> => {
  return new Promise((resolve) =>
    setTimeout(() => {
      resolve({
        topics: [
          {
            id: 1,
            title: "React",
            contents: [
              { id: 1, title: "React Basics" },
              { id: 2, title: "React Advanced" },
            ],
          },
          {
            id: 2,
            title: "JavaScript",
            contents: [
              { id: 3, title: "ES6 Features" },
              { id: 4, title: "Promises and Async/Await" },
            ],
          },
        ],
      });
    }, 1000)
  );
};

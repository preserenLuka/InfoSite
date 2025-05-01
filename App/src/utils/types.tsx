export interface Content {
  id: number;
  title: string;
  description?: string;
  lastModified?: string;
  image?: string;
}

export interface Topic {
  id: number;
  title: string;
  contents: Content[];
}

export interface TopicList {
  topics: Topic[];
}

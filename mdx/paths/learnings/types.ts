export type LearningsFrontmatter = {
  title: string;
  type: string;
  isPublished: boolean;
  publishedOn: string;
  updatedOn: string;
  tags: string[];
  project?: string;
};

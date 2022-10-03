export type MiniProjectsLinkType = {
  type: "info" | "external" | "github";
  href: string;
};

export type MiniProjectsFrontmatter = {
  name: string;
  isPublished: boolean;
  publishedOn: string;
  updatedOn: string;
  tags: string[];
  techStack: string[];
  links: MiniProjectsLinkType[];
};

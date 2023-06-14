// contentlayer.config.js
import { defineDocumentType, makeSource } from "contentlayer/source-files";
var computedFields = {
  slug: {
    type: "string",
    resolve: (doc) => `/${doc._raw.flattenedPath}`
  },
  slugAsParams: {
    type: "string",
    resolve: (doc) => doc._raw.flattenedPath.split("/").slice(1).join("/")
  }
};
var miniProjectFields = {
  title: {
    type: "string",
    required: true
  },
  featuredImageLight: {
    type: "string",
    required: false
  },
  featuredImageDark: {
    type: "string",
    required: false
  },
  figmaLink: {
    type: "string",
    required: false
  },
  githubLink: {
    type: "string",
    required: false
  },
  externalLink: {
    type: "string",
    required: false
  },
  isPublished: {
    type: "boolean",
    default: false
  },
  publishedOn: {
    type: "date",
    required: false
  },
  updatedOn: {
    type: "date",
    required: false
  },
  tags: {
    type: "list",
    of: { type: "string" },
    required: true
  },
  techStack: {
    type: "list",
    of: { type: "string" },
    required: true
  }
};
var projectDisplayFields = {
  description: {
    type: "string",
    required: true
  },
  shouldAddFeaturedImageShadow: {
    type: "boolean",
    default: true
  },
  bgColorLight: {
    type: "string",
    required: false
  },
  bgColorDark: {
    type: "string",
    required: false
  },
  featuredTechStack: {
    type: "list",
    of: { type: "string" },
    required: false
  }
};
var MiniProject = defineDocumentType(() => ({
  name: "MiniProject",
  filePathPattern: "mini-projects/**/*.mdx",
  contentType: "mdx",
  fields: { ...miniProjectFields },
  computedFields
}));
var Project = defineDocumentType(() => ({
  name: "Project",
  filePathPattern: "projects/**/*.mdx",
  contentType: "mdx",
  fields: { ...miniProjectFields, ...projectDisplayFields },
  computedFields
}));
var contentlayer_config_default = makeSource({
  contentDirPath: "./content",
  documentTypes: [MiniProject, Project]
});
export {
  MiniProject,
  Project,
  contentlayer_config_default as default
};
//# sourceMappingURL=compiled-contentlayer-config-ALTMEBTM.mjs.map

import {
  MDX_MINI_PROJECTS_PREFIX,
  MDX_MINI_PROJECTS_PATH,
} from "./mini-projects/constants";

// https://stackoverflow.com/a/56263257 : use constant string as type
export type validMDXSlugPrefix = typeof MDX_MINI_PROJECTS_PREFIX;
export type validMDXFolderPath = typeof MDX_MINI_PROJECTS_PATH;

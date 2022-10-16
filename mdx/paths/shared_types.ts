import {
  MDX_MINI_PROJECTS_PREFIX,
  MDX_MINI_PROJECTS_PATH,
} from "./mini-projects/constants";
import {
  MDX_LEARNINGS_PREFIX,
  MDX_LEARNINGS_PATH,
} from "./learnings/constants";

// https://stackoverflow.com/a/56263257 : use constant string as type
export type validMDXSlugPrefix =
  | typeof MDX_MINI_PROJECTS_PREFIX
  | typeof MDX_LEARNINGS_PREFIX;
export type validMDXFolderPath =
  | typeof MDX_MINI_PROJECTS_PATH
  | typeof MDX_LEARNINGS_PATH;

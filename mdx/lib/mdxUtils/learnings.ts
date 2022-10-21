import { MDX_LEARNINGS_PATH } from "../../paths/learnings/constants";
import { MDXPostObject } from ".";
import {
  getAllMDXPostsByPath,
  getAllMDXFrontMatterByPath,
  getMDXPostBySlug,
  getMDXPostsByPath,
} from ".";
import { LearningsFrontmatter } from "@/mdx/paths/learnings/types";

/* ======================================================================= */
/* `Learnings` utils */
/* ======================================================================= */

export function getLearningsPosts() {
  return getMDXPostsByPath(MDX_LEARNINGS_PATH);
}

export async function getLearningsPostBySlug(slug: string) {
  return await getMDXPostBySlug(slug, MDX_LEARNINGS_PATH);
}

export function getAllLearningsFrontMatter() {
  return getAllMDXFrontMatterByPath(MDX_LEARNINGS_PATH);
}

export async function getAllLearningsPosts(): Promise<
  LearningsMDXPostObject[]
> {
  return (await getAllMDXPostsByPath(
    MDX_LEARNINGS_PATH
  )) as LearningsMDXPostObject[];
}

/* ======================================================================= */
/* Types */
/* ======================================================================= */

export type LearningsMDXPostObject = MDXPostObject & {
  frontMatter: LearningsFrontmatter;
  slug?: string;
};

import { MDX_MINI_PROJECTS_PATH } from "../../paths/mini-projects/constants";
import { MDXPostObject } from ".";
import {
  getAllMDXPostsByPath,
  getAllMDXFrontMatterByPath,
  getMDXPostBySlug,
  getMDXPostsByPath,
} from ".";
import { MiniProjectsFrontmatter } from "@/mdx/paths/mini-projects/types";

/* ======================================================================= */
/* `MiniProjects` utils */
/* ======================================================================= */

export function getMiniProjectsPosts() {
  return getMDXPostsByPath(MDX_MINI_PROJECTS_PATH);
}

export async function getMiniProjectsPostBySlug(slug: string) {
  return await getMDXPostBySlug(slug, MDX_MINI_PROJECTS_PATH);
}

export function getAllMiniProjectsFrontMatter() {
  return getAllMDXFrontMatterByPath(MDX_MINI_PROJECTS_PATH);
}

export async function getAllMiniProjectsPosts(): Promise<
  MiniProjectsMDXPostObject[]
> {
  return (await getAllMDXPostsByPath(
    MDX_MINI_PROJECTS_PATH
  )) as MiniProjectsMDXPostObject[];
}

/* ======================================================================= */
/* Types */
/* ======================================================================= */

export type MiniProjectsMDXPostObject = MDXPostObject & {
  frontMatter: MiniProjectsFrontmatter;
  slug?: string;
};

import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { serialize } from "next-mdx-remote/serialize";

import { validMDXFolderPath } from "../../paths/shared_types";
import { MDXRemoteSerializeResult } from "next-mdx-remote";

/* ======================================================================= */
/* `General` utils */
/* ======================================================================= */

const root = process.cwd();

export const getPathArray = (folderPath: validMDXFolderPath) => {
  // e.g. './mdx/paths/' -> ['.', 'mdx', 'paths']
  return folderPath.split("/").filter((elem) => elem !== "");
};

export const getSlugFromMDXFile = (postSlug: string) => {
  // e.g. 'slug-name.mdx' -> 'slug-name'
  return postSlug.replace(/\.mdx/, "");
};

// https://coderrocketfuel.com/article/recursively-list-all-the-files-in-a-directory-using-node-js
export const getAllMDXPosts = (dirPath: string, arrayOfFiles: string[]) => {
  const files = fs.readdirSync(dirPath);

  arrayOfFiles = arrayOfFiles || [];

  files.forEach(function (file) {
    if (fs.statSync(dirPath + "/" + file).isDirectory()) {
      // if the current file is a folder, get all the files in the folder
      arrayOfFiles = getAllMDXPosts(dirPath + "/" + file, arrayOfFiles);
    } else {
      // e.g. 'full-path/data/file.mdx' -> ['full-path', 'file.mdx']
      const splitPostPath = path
        .join(__dirname, dirPath, "/", file)
        .split("data/");

      const MDXPostFile = splitPostPath[splitPostPath.length - 1];

      if (MDXPostFile.endsWith("mdx")) {
        arrayOfFiles.push(MDXPostFile);
      }
    }
  });

  return arrayOfFiles;
};

export function getMDXPostsByPath(folderPath: validMDXFolderPath) {
  return getAllMDXPosts(folderPath, []);
}

export async function getMDXPostBySlug(
  slug: string,
  folderPath: validMDXFolderPath
): Promise<{
  frontMatter: {
    [key: string]: string | number;
  } | null;
  mdxSource: MDXRemoteSerializeResult<Record<string, unknown>> | null;
}> {
  if (slug) {
    const mdxFile = fs.readFileSync(
      path.join(root, ...getPathArray(folderPath), `${slug}.mdx`),
      "utf8"
    );

    const { data, content } = matter(mdxFile);

    const mdxSource = await serialize(content);

    return { frontMatter: { ...data }, mdxSource };
  }
  return { frontMatter: null, mdxSource: null };
}

export async function getAllMDXPostsByPath(
  folderPath: validMDXFolderPath
): Promise<MDXPostObject[]> {
  const files = getAllMDXPosts(folderPath, []);

  const postsArray = [];

  for (const file of files) {
    const source = fs.readFileSync(
      path.join(root, ...getPathArray(folderPath), file),
      "utf8"
    );

    const { data, content } = matter(source);
    const mdxSource = await serialize(content);

    postsArray.push({
      frontMatter: { ...data },
      slug: getSlugFromMDXFile(file),
      mdxSource,
    });
  }

  return postsArray;
}

export function getAllMDXFrontMatterByPath(folderPath: validMDXFolderPath) {
  const files = getAllMDXPosts(folderPath, []);

  return files.reduce((allPosts: object[], postSlug: string) => {
    const source = fs.readFileSync(
      path.join(root, ...getPathArray(folderPath), postSlug),
      "utf8"
    );
    const { data } = matter(source);

    return [
      {
        ...data,
        slug: getSlugFromMDXFile(postSlug),
      },
      ...allPosts,
    ];
  }, []);
}

/* ======================================================================= */
/* Types */
/* ======================================================================= */

export type MDXPostObject = {
  mdxSource: MDXRemoteSerializeResult<
    Record<string, unknown>,
    Record<string, string>
  >;
};

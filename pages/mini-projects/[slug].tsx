import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import { getSlugFromMDXFile } from "@/mdx/lib/mdxUtils";
import {
  getMiniProjectsPostBySlug,
  getMiniProjectsPosts,
} from "@/mdx/lib/mdxUtils/mini-projects";
import MiniProjectPageLayout from "@/mdx/paths/mini-projects/layouts/PageLayout";
import MDXHTMLElements, {
  MDXAppLink,
  MDXFeaturedImage,
} from "@/mdx/MDXHTMLElements";
import { ParsedUrlQuery } from "querystring";
import { GetStaticPaths, GetStaticProps } from "next";
import { MiniProjectsFrontmatter } from "@/mdx/paths/mini-projects/types";
import { DefaultFPLayout } from "@/design_systems/mainds/layouts/FrameLayout";
import Head from "next/head";

export default function MiniProjectsPost({
  frontMatter,
  mdxSource,
}: {
  frontMatter: MiniProjectsFrontmatter;
  mdxSource: MDXRemoteSerializeResult<
    Record<string, unknown>,
    Record<string, string>
  >;
}) {
  return (
    <div>
      <Head>
        <title>{frontMatter.name}</title>
        <meta name="description" content="Mini project." />
      </Head>
      <MiniProjectPageLayout frontMatter={frontMatter}>
        <MDXRemote
          {...mdxSource}
          components={{
            ...MDXHTMLElements,
            MDXAppLink,
            MDXFeaturedImage,
            DefaultFPLayout,
          }}
        />
      </MiniProjectPageLayout>
    </div>
  );
}

// https://wallis.dev/blog/nextjs-getstaticprops-and-getstaticpaths-with-typescript
type paramsType = ParsedUrlQuery & { slug: string };

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = getMiniProjectsPosts();

  return {
    paths: posts.map((p: string) => ({
      params: {
        slug: getSlugFromMDXFile(p),
      },
    })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { slug } = context.params as paramsType;
  const { frontMatter, mdxSource } = await getMiniProjectsPostBySlug(slug);

  return {
    props: { frontMatter, mdxSource },
  };
};

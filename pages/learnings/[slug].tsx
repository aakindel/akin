import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import { getSlugFromMDXFile } from "@/mdx/lib/mdxUtils";
import {
  getLearningsPostBySlug,
  getLearningsPosts,
} from "@/mdx/lib/mdxUtils/learnings";
import LearningsPageLayout from "@/mdx/paths/learnings/layouts/PageLayout";
import MDXHTMLElements, {
  MDXAppLink,
  MDXFeaturedImage,
} from "@/mdx/MDXHTMLElements";
import { ParsedUrlQuery } from "querystring";
import { GetStaticPaths, GetStaticProps } from "next";
import { LearningsFrontmatter } from "@/mdx/paths/learnings/types";
import { DefaultFPLayout } from "@/design_systems/mainds/layouts/FrameLayout";
import CodeBlock from "@/components/CodeBlock";
import Head from "next/head";

export default function LearningsPost({
  frontMatter,
  mdxSource,
}: {
  frontMatter: LearningsFrontmatter;
  mdxSource: MDXRemoteSerializeResult<
    Record<string, unknown>,
    Record<string, string>
  >;
}) {
  return (
    <div>
      <Head>
        <title>{frontMatter.title}</title>
        <meta name="description" content="Learnings." />
      </Head>
      <LearningsPageLayout frontMatter={frontMatter}>
        <MDXRemote
          {...mdxSource}
          components={{
            ...MDXHTMLElements,
            MDXAppLink,
            MDXFeaturedImage,
            DefaultFPLayout,
            CodeBlock,
          }}
        />
      </LearningsPageLayout>
    </div>
  );
}

// https://wallis.dev/blog/nextjs-getstaticprops-and-getstaticpaths-with-typescript
type paramsType = ParsedUrlQuery & { slug: string };

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = getLearningsPosts();

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
  const { frontMatter, mdxSource } = await getLearningsPostBySlug(slug);

  return {
    props: { frontMatter, mdxSource },
  };
};

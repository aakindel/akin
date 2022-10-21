import React from "react";
import Head from "next/head";
import Container from "@/design_systems/mainds/components/Container";
import MainNav from "@/components/MainNav";
import LearningsStyles from "./Learnings.module.scss";
import { getAllLearningsFrontMatter } from "@/mdx/lib/mdxUtils/learnings";
import { getLearningsByTag } from "@/components/LearningsList";
import { LearningsFrontmatter } from "@/mdx/paths/learnings/types";

const Learnings = ({
  frontMatterList,
}: {
  frontMatterList: LearningsFrontmatter[];
}) => {
  return (
    <div>
      <Head>
        <title>Learnings</title>
        <meta
          name="description"
          content="A collection of stuff I've learned and gathered from projects I've worked on."
        />
      </Head>
      <MainNav />
      <div style={{ marginBottom: "5rem" }}></div>

      <Container type="tighter">
        <div className={LearningsStyles["learnings-scope"]}>
          <div className={LearningsStyles["page-title"]}>Learnings</div>
          <div className={LearningsStyles["page-subtitle"]}>
            A collection of stuff I&apos;ve learned and gathered from projects
            I&apos;ve worked on.
          </div>

          <div>
            {getLearningsByTag(
              frontMatterList
                .filter(
                  // ignore unpublished files
                  (learning: LearningsFrontmatter) => learning.isPublished
                )
                .reverse()
            )}
          </div>
        </div>
      </Container>
      <div style={{ paddingBottom: "10rem" }}></div>
    </div>
  );
};

export default Learnings;

export async function getStaticProps() {
  const frontMatterList = getAllLearningsFrontMatter();

  return { props: { frontMatterList } };
}

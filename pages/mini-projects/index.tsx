import React from "react";
import Head from "next/head";
import Container from "@/design_systems/mainds/components/Container";
import MainNav from "@/components/MainNav";
import MiniProjectsStyles from "./MiniProjects.module.scss";
import { getAllMiniProjectsFrontMatter } from "@/mdx/lib/mdxUtils/mini-projects";
import { getMiniProjectsByTag } from "@/components/MiniProjectList";
import { MiniProjectsFrontmatter } from "@/mdx/paths/mini-projects/types";

const MiniProjects = ({
  frontMatterList,
}: {
  frontMatterList: MiniProjectsFrontmatter[];
}) => {
  return (
    <div>
      <Head>
        <title>Mini Projects</title>
        <meta
          name="description"
          content="A collection of smaller projects I've built to hone my development skills."
        />
      </Head>
      <MainNav />
      <div style={{ marginBottom: "5rem" }}></div>

      <Container type="tighter">
        <div className={MiniProjectsStyles["mini-projects-scope"]}>
          <div className={MiniProjectsStyles["page-title"]}>Mini Projects</div>
          <div className={MiniProjectsStyles["page-subtitle"]}>
            A collection of smaller projects I&apos;ve built to hone my
            development skills.
          </div>

          <div>
            {frontMatterList
              .filter(
                // ignore unpublished files
                (post: MiniProjectsFrontmatter) => post.isPublished
              )
              .map((post: MiniProjectsFrontmatter, index: number) => (
                <React.Fragment key={index}>
                  {getMiniProjectsByTag(frontMatterList)}
                </React.Fragment>
              ))}
          </div>
        </div>
      </Container>
      <div style={{ paddingBottom: "10rem" }}></div>
    </div>
  );
};

export default MiniProjects;

export async function getStaticProps() {
  const frontMatterList = getAllMiniProjectsFrontMatter();

  return { props: { frontMatterList } };
}

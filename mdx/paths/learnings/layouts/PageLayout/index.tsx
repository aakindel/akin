import React from "react";
import MainNav from "@components/MainNav";
import Container from "@/design_systems/mainds/components/Container";
import PageLayoutStyles from "./PageLayout.module.scss";
import { LearningsFrontmatter } from "../../types";
import AppLink from "@/components/AppLink";
import MDXStyles from "../../../../MDXHTMLElements/mdx-prose.module.scss";
import HeroIcons from "@/design_systems/mainds/components/icons/heroicons";
import { format, parseISO } from "date-fns";
export default function LearningsPageLayout({
  children,
  frontMatter,
}: {
  children: React.ReactElement;
  frontMatter: LearningsFrontmatter;
}) {
  const publishedDate = frontMatter.publishedOn
    ? format(parseISO(frontMatter.publishedOn), "yyyy/MM/dd")
    : null;
  const updatedDate = frontMatter.updatedOn
    ? format(parseISO(frontMatter.updatedOn), "yyyy/MM/dd")
    : null;
  return (
    <div>
      <MainNav />
      <div style={{ marginBottom: "5rem" }}></div>
      <div>
        <Container type="screen-lg">
          <div
            className={`${PageLayoutStyles["page-layout-scope"]} ${MDXStyles["prose-scope"]}`}
          >
            <div className={PageLayoutStyles["page-container"]}>
              <div className={PageLayoutStyles["back-button-container"]}>
                <AppLink
                  href="/learnings"
                  className={PageLayoutStyles["back-button"]}
                >
                  <HeroIcons icon="arrow-narrow-left" width={18} />
                  <span>Learnings</span>
                </AppLink>
              </div>
              <div className={PageLayoutStyles["content-container"]}>
                <div
                  className={`${MDXStyles["prose-meta"]} ${PageLayoutStyles["post-dates-container"]}`}
                  style={
                    !(publishedDate || updatedDate)
                      ? { marginTop: "0px", marginBottom: "0px" }
                      : {}
                  }
                >
                  {publishedDate && updatedDate ? (
                    <React.Fragment>
                      <span>{publishedDate}</span>
                      <HeroIcons icon="arrow-narrow-right" width={15} />
                      <span>{updatedDate}</span>
                    </React.Fragment>
                  ) : publishedDate ? (
                    <span>{publishedDate}</span>
                  ) : null}
                </div>
                <div className={PageLayoutStyles["post-header"]}>
                  <div>
                    <h1
                      className={`${MDXStyles["prose-h1"]} ${MDXStyles["project-title"]}`}
                      style={{ marginTop: "0px", marginBottom: "0px" }}
                    >
                      {frontMatter.title}
                    </h1>
                  </div>
                  <div>
                    <div
                      className={`${PageLayoutStyles["post-header__tag"]} ${
                        PageLayoutStyles[`post-header__tag-${frontMatter.type}`]
                      }`}
                    >
                      {frontMatter.type}
                    </div>
                  </div>
                </div>
                {children}
              </div>
            </div>
          </div>
        </Container>
      </div>
      <div style={{ paddingBottom: "10rem" }}></div>
    </div>
  );
}

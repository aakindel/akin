import React from "react";
import MainNav from "@components/MainNav";
import Container from "@/design_systems/mainds/components/Container";
import PageLayoutStyles from "./PageLayout.module.scss";
import { MiniProjectsFrontmatter, MiniProjectsLinkType } from "../../types";
import AppLink from "@/components/AppLink";
import MDXStyles from "../../../../MDXHTMLElements/mdx-prose.module.scss";
import HeroIcons from "@/design_systems/mainds/components/icons/heroicons";
import { format, parseISO } from "date-fns";
import IconButton from "@/components/IconButton";

const getLinkIcon = (projectLink: MiniProjectsLinkType) => {
  switch (projectLink.type) {
    case "info":
      return (
        <AppLink
          style={{ marginTop: "1px" }}
          href={projectLink.href}
          openInNewTab
        >
          <IconButton icon="information-circle" type="hover" />
        </AppLink>
      );
    case "github":
      return (
        <AppLink href={projectLink.href} openInNewTab>
          <IconButton icon="github" type="hover" />
        </AppLink>
      );
    case "external":
      return (
        <AppLink
          style={{ marginTop: "1px" }}
          href={projectLink.href}
          openInNewTab
        >
          <IconButton icon="external-link" type="hover" />
        </AppLink>
      );
    default:
      return <div></div>;
  }
};

export default function MiniProjectsPageLayout({
  children,
  frontMatter,
}: {
  children: React.ReactElement;
  frontMatter: MiniProjectsFrontmatter;
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
                  href="/mini-projects"
                  className={PageLayoutStyles["back-button"]}
                >
                  <HeroIcons icon="arrow-narrow-left" width={18} />
                  <span>Mini Projects</span>
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
                      {frontMatter.name}
                    </h1>
                  </div>
                  <div className={`${PageLayoutStyles["post-header__links"]}`}>
                    {frontMatter.links
                      .filter((link) => link.type != "info")
                      .map((link, index) => {
                        return (
                          <React.Fragment key={index}>
                            {getLinkIcon(link)}
                          </React.Fragment>
                        );
                      })}
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

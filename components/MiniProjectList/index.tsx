import React from "react";
import AppLink from "../AppLink";
import IconButton from "../IconButton";
import MiniProjectListStyles from "./MiniProjectList.module.scss";
import {
  MiniProjectsFrontmatter,
  MiniProjectsLinkType,
} from "@/mdx/paths/mini-projects/types";

type ListProps = {
  children?: React.ReactNode;
};

export const MiniProjectList = ({ children }: ListProps) => {
  return (
    <ul
      className={MiniProjectListStyles["MiniProjectList"]}
      style={{
        display: "flex",
        flexDirection: "column",
        listStyleType: "none",
      }}
    >
      {children}
    </ul>
  );
};

export function getMiniProjectsByTag(
  miniProjects: MiniProjectsFrontmatter[],
  projectTag = ""
) {
  return (
    <MiniProjectList>
      {miniProjects
        .filter((miniProject) =>
          projectTag === ""
            ? miniProject
            : miniProject.tags.includes(projectTag)
        )
        .map((miniProject, index) => {
          return <MiniProjectListItem key={index} project={miniProject} />;
        })}
    </MiniProjectList>
  );
}

const getLinkIcon = (name: string, projectLink: MiniProjectsLinkType) => {
  switch (projectLink.type) {
    case "external":
      return (
        <AppLink
          style={{ marginTop: "1px", pointerEvents: "all" }}
          href={projectLink.href}
          openInNewTab
        >
          <IconButton icon="external-link" type="hover" />
        </AppLink>
      );
    case "github":
      return (
        <AppLink
          style={{ pointerEvents: "all" }}
          href={projectLink.href}
          openInNewTab
        >
          <IconButton icon="github" type="hover" />
        </AppLink>
      );
    case "info":
      return (
        <AppLink
          className={MiniProjectListStyles["info-link"]}
          style={{ marginTop: "1px", pointerEvents: "all" }}
          href={projectLink.href}
        >
          <IconButton icon="information-circle" type="inherit" />
        </AppLink>
      );
    default:
      return <div></div>;
  }
};

// https://webgradients.com/
export const MiniProjectListItem = ({
  project,
}: {
  project: MiniProjectsFrontmatter;
}) => {
  const miniProjectItemHref = `/mini-projects/${project.name
    .toLowerCase()
    .replace(" ", "-")}`;

  if (!project.links.filter((project) => project.type === "info").length) {
    project.links.unshift({
      type: "info",
      href: miniProjectItemHref,
    });
  }
  return (
    <div className={MiniProjectListStyles["mpl-scope"]}>
      <li className={MiniProjectListStyles["list-item"]}>
        <AppLink
          className={MiniProjectListStyles["overlay-link"]}
          href={miniProjectItemHref}
        ></AppLink>
        <div className={MiniProjectListStyles["content-container"]}>
          <div className={MiniProjectListStyles["project-name-container"]}>
            <h3 className={MiniProjectListStyles["project-name"]}>
              {project.name}
            </h3>
          </div>
          <div className={MiniProjectListStyles["project-links-container"]}>
            {project.links.map((link, index) => {
              return (
                <React.Fragment key={index}>
                  {getLinkIcon(project.name, link)}
                </React.Fragment>
              );
            })}
          </div>
        </div>
      </li>
    </div>
  );
};

import React from "react";
import ProjectDisplayStyles from "./ProjectDisplay.module.scss";
import { ProjectType } from "@/data/projects";
import DSStyles from "@mainds/styles/mainds.module.scss";
import AppLink from "../AppLink";
import IconButton from "../IconButton";

type ProjectDisplayProps = {
  project: ProjectType;
};

const ProjectDisplay = ({ project }: ProjectDisplayProps) => {
  return (
    <div
      className={ProjectDisplayStyles["display-container"]}
      style={{
        backgroundColor: project.bgColor,
      }}
    >
      <div className={ProjectDisplayStyles["left-container"]}>
        <div className={ProjectDisplayStyles["left-content"]}>
          <div className={ProjectDisplayStyles["tools-list"]}>
            {project.techStack.map((tech, index) => (
              <p key={index}>{tech}</p>
            ))}
          </div>
          <h2 className={ProjectDisplayStyles["project-name"]}>
            {project.name}
          </h2>
          <p className={ProjectDisplayStyles["project-summary"]}>
            {project.description}
          </p>
          <div className={ProjectDisplayStyles["link-icon-list"]}>
            {project.links.map((link, index) => (
              <AppLink
                key={index}
                href={link.href}
                className={DSStyles["link-text"]}
                style={{ height: "24px", width: "24px" }}
                openInNewTab
              >
                {link.type === "github" ? (
                  <IconButton icon="github" type="hover" />
                ) : (
                  <div style={{ paddingTop: "1px" }}>
                    <IconButton icon="external-link" type="hover" />
                  </div>
                )}
              </AppLink>
            ))}
          </div>
        </div>
      </div>
      <div className={ProjectDisplayStyles["right-container"]}>
        <picture>
          <img
            className={ProjectDisplayStyles["project-image"]}
            src={project.imgSrc}
            alt={`${project.name} image`}
            style={{
              boxShadow: project.noShadow
                ? "none"
                : "0 0 #0000, 0 0 #0000, 0 4px 6px -1px rgb(0 0 0/0.1),0 2px 4px -2px rgb(0 0 0/0.1)",
            }}
          />
        </picture>
      </div>
    </div>
  );
};
ProjectDisplay.displayName = "ProjectDisplay";

export default ProjectDisplay;

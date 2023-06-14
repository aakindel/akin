import React from "react";
import Link from "next/link";
import { Icons } from "../Icons";
import { Button } from "../Button";
import { type Project } from "@/.contentlayer/generated";
import ThemedImage from "../ThemedImage";

type ProjectDisplayProps = {
  project: Project;
};

const ProjectDisplay = ({ project }: ProjectDisplayProps) => {
  return (
    <div
      className="mb-12 flex min-h-[480px] w-full flex-col items-center justify-center overflow-hidden rounded-[48px] sm:flex-row"
      style={{
        backgroundColor: project?.bgColorLight
          ? project?.bgColorLight
          : project?.bgColorDark
          ? project?.bgColorDark
          : "rgba(140, 140, 140, 0.1)",
      }}
    >
      <div className="mt-[72px] sm:mt-0 sm:flex sm:flex-1">
        <div className="px-[30px] sm:pl-[58px] sm:pr-0 lg:pl-[88px]">
          <div className="mb-4 flex flex-wrap gap-x-4 gap-y-[2px] text-sm text-neutral-500 dark:text-neutral-500">
            {project?.featuredTechStack
              ? project?.featuredTechStack.map((tech, index) => (
                  <p key={index}>{tech}</p>
                ))
              : project.techStack.map((tech, index) => (
                  <p key={index}>{tech}</p>
                ))}
          </div>
          <h2 className="mb-4 text-2xl font-semibold leading-[1.3] text-neutral-700 dark:text-neutral-300">
            {project.title}
          </h2>
          <p className="mb-5 text-neutral-600 dark:text-neutral-400">
            {project.description}
          </p>
          <div className="mb-4 flex items-center gap-4 text-xs">
            {project?.figmaLink && (
              <Button
                variant="emphasis"
                className="mt-px h-[23px] w-[23px] p-0"
                asChild
              >
                <Link href={project?.figmaLink} target="_blank">
                  <Icons.figma className="h-[23px] w-[23px] stroke-[0.2] p-0" />
                </Link>
              </Button>
            )}
            {project?.githubLink && (
              <Button variant="emphasis" className="h-6 w-6 p-0" asChild>
                <Link href={project?.githubLink} target="_blank">
                  <Icons.github />
                </Link>
              </Button>
            )}
            {project?.externalLink && (
              <Button variant="emphasis" className="mt-0.5 h-6 w-6 p-0" asChild>
                <Link href={project?.externalLink} target="_blank">
                  <Icons.external_link />
                </Link>
              </Button>
            )}
          </div>
        </div>
      </div>
      <div className="relative mt-5 h-48 w-full sm:h-64 sm:flex-1">
        <ThemedImage
          className="absolute left-[30px] top-0 w-[800px] rounded-lg dark:brightness-[0.9] sm:left-10"
          imageClassName={`${
            project.shouldAddFeaturedImageShadow
              ? "shadow-[0_0_rgb(0,0,0),0_0_rgb(0,0,0),0_4px_6px_-1px_rgba(0,0,0,0.1),0_2px_4px_-2px_rgba(0,0,0,0.1)]"
              : ""
          }`}
          srcLight={project?.featuredImageLight ?? ""}
          srcDark={project?.featuredImageDark ?? ""}
          alt={`${project.title} screenshot`}
          style={{
            maxWidth: "none",
          }}
          priority
        />
      </div>
    </div>
  );
};
ProjectDisplay.displayName = "ProjectDisplay";

export default ProjectDisplay;

import React from "react";
import { AppLink } from "@/components/AppLink";
import { Button } from "@/components/Button";
import { Icons } from "@/components/Icons";
import { allProjects } from "contentlayer/generated";
import ProjectDisplay from "@/components/ProjectDisplay";
import { compareDesc } from "date-fns";
import Link from "next/link";

export default function Home() {
  const projects = allProjects
    .filter((project) => project.isPublished)
    .sort((a, b) => {
      return compareDesc(
        new Date(a.publishedOn ?? ""),
        new Date(b.publishedOn ?? "")
      );
    });

  return (
    <React.Fragment>
      <div className="mx-auto max-w-[45rem] px-6 pb-10 pt-16 sm:px-8">
        <p className="mb-8 text-neutral-800 dark:text-neutral-200">
          Ayo Akindele
        </p>
        <p className="mb-8 leading-[1.7] text-neutral-700 dark:text-neutral-300">
          Building interfaces to solve design problems. Working primarily with
          React, Next.js, and Tailwind. BSc Computing Science from the
          University of Alberta.
        </p>
        <div className="flex flex-wrap gap-6">
          <AppLink href="/resume.pdf" openInNewTab>
            Resume
          </AppLink>
          <AppLink href="https://github.com/aakindel" openInNewTab>
            Github
          </AppLink>
        </div>
      </div>
      <div className="overflow-auto">
        <div className="mx-auto max-w-[45rem] px-6 sm:px-8">
          <h3 className="mb-8 block font-semibold text-neutral-700 dark:text-neutral-300">
            Projects
          </h3>
        </div>
        <div className="mx-auto max-w-5xl px-6 sm:px-8">
          {projects.map((project, index) => {
            return <ProjectDisplay key={index} project={project} />;
          })}
        </div>
      </div>
      <div className="mx-auto my-8 flex max-w-[45rem] items-center justify-center gap-6 px-6 sm:px-8">
        <Button variant="emphasis" className="h-6 w-6 p-0" asChild>
          <Link href="mailto:a.akindele01@gmail.com" target="_blank">
            <Icons.mail />
          </Link>
        </Button>
        <Button variant="emphasis" className="h-6 w-6 p-0" asChild>
          <Link href="https://github.com/aakindel" target="_blank">
            <Icons.github />
          </Link>
        </Button>
        <Button variant="emphasis" className="h-6 w-6 p-0" asChild>
          <Link href="https://www.linkedin.com/in/aakindel/" target="_blank">
            <Icons.linkedin />
          </Link>
        </Button>
      </div>
    </React.Fragment>
  );
}

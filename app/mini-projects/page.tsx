import React from "react";
import { allMiniProjects } from "contentlayer/generated";
import { compareDesc } from "date-fns";
import { Button } from "@/components/Button";
import { Icons } from "@/components/Icons";
import Link from "next/link";

export const metadata = {
  title: "Mini Projects",
  description:
    "A collection of smaller projects I've built to hone my development skills.",
};

export default async function MiniProjectsPage() {
  const miniProjects = allMiniProjects
    .filter((miniProject) => miniProject.isPublished)
    .sort((a, b) => {
      return compareDesc(
        new Date(a.publishedOn ?? ""),
        new Date(b.publishedOn ?? "")
      );
    });

  return (
    <React.Fragment>
      <div className="mx-auto max-w-[45rem] px-6 pb-10 pt-20 sm:px-8">
        <h1 className="mb-[6px] text-xl font-semibold leading-[1.9] text-neutral-700 dark:text-neutral-300">
          Mini Projects
        </h1>
        <p className="mb-6 text-[15px] leading-[1.7] text-neutral-500 dark:text-neutral-400">
          A collection of smaller projects I&apos;ve built to hone my
          development skills.
        </p>
        {miniProjects?.length ? (
          <ul className="flex list-none flex-col">
            {miniProjects.map((miniProject, index) => {
              return (
                <li key={index} className="group/item relative">
                  <Link
                    className="absolute -bottom-px -top-px left-0 right-0 ml-[-2%] w-[104%] rounded-lg bg-transparent px-[50px] py-0 group-hover/item:bg-neutral-100 group-hover/item:dark:bg-neutral-800"
                    href={miniProject.slug}
                  ></Link>
                  <div
                    className={`pointer-events-none relative flex max-w-full flex-1 items-center justify-between gap-4 border-solid border-b-neutral-100 px-0 py-4 dark:border-b-neutral-800 ${
                      (miniProjects.length > 2 &&
                        index === miniProjects.length - 1) ||
                      miniProjects.length === 1
                        ? "border-b-0"
                        : "border-b-[1px]"
                    }`}
                  >
                    <h3 className="flex flex-wrap text-[15px] font-medium text-neutral-700 dark:text-neutral-300">
                      {miniProject.title}
                    </h3>
                    <div className="pointer-events-none flex gap-3">
                      <Button
                        variant="emphasis"
                        className="pointer-events-auto mt-px h-6 w-6 p-0 transition-none group-hover/item:text-neutral-600 group-hover/item:dark:text-neutral-400"
                        asChild
                      >
                        <Link href={miniProject.slug}>
                          <Icons.information_circle />
                        </Link>
                      </Button>
                      {miniProject?.figmaLink && (
                        <Button
                          variant="emphasis"
                          className="pointer-events-auto mt-px h-[23px] w-[23px] p-0 transition-none"
                          asChild
                        >
                          <Link href={miniProject?.figmaLink} target="_blank">
                            <Icons.figma className="h-[23px] w-[23px] stroke-[0.2] p-0" />
                          </Link>
                        </Button>
                      )}
                      {miniProject?.githubLink && (
                        <Button
                          variant="emphasis"
                          className="pointer-events-auto h-6 w-6 p-0 transition-none"
                          asChild
                        >
                          <Link href={miniProject?.githubLink} target="_blank">
                            <Icons.github />
                          </Link>
                        </Button>
                      )}
                      {miniProject?.externalLink && (
                        <Button
                          variant="emphasis"
                          className="pointer-events-auto mt-px h-6 w-6 p-0 transition-none"
                          asChild
                        >
                          <Link
                            href={miniProject?.externalLink}
                            target="_blank"
                          >
                            <Icons.external_link />
                          </Link>
                        </Button>
                      )}
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        ) : (
          <p className="text-[15px] text-neutral-700 dark:text-neutral-300">
            No mini projects published.
          </p>
        )}
      </div>
    </React.Fragment>
  );
}

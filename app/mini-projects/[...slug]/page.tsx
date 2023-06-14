import React from "react";
import { notFound } from "next/navigation";
import { allMiniProjects } from "contentlayer/generated";
import { MDXContent } from "@/components/MDXComponents";
import { Icons } from "@/components/Icons";
import Link from "next/link";
import { format, parseISO } from "date-fns";
import { Button } from "@/components/Button";
import ThemedImage from "@/components/ThemedImage";
import { Metadata } from "next";

interface MiniProjectPageProps {
  params: {
    slug: string[];
  };
}

async function getMiniProjectFromParams(params: { slug: string[] }) {
  const slug = params?.slug?.join("/");
  const miniProject = allMiniProjects.find(
    (miniProject) => miniProject.slugAsParams === slug
  );

  if (!miniProject) {
    null;
  }

  return miniProject;
}

export async function generateMetadata({
  params,
}: MiniProjectPageProps): Promise<Metadata> {
  const miniProject = await getMiniProjectFromParams(params);

  if (!miniProject) {
    return {};
  }

  // https://stackoverflow.com/a/69032498 : format list with Oxford Comma
  const formatter = new Intl.ListFormat("en", {
    style: "long",
    type: "conjunction",
  });

  const formattedTechStack = formatter.format(
    miniProject.techStack.slice(0, 5)
  );

  return {
    title: miniProject.title,
    description: `Built with ${formattedTechStack}.`,
    authors: [
      {
        name: "Ayo Akindele",
        url: "https://www.ayoakindele.com/",
      },
    ],
    openGraph: {
      title: miniProject.title,
      description: `Built with ${formattedTechStack}.`,
      type: "article",
      url: `https://www.ayoakindele.com${miniProject.slug}`,
      images: [
        {
          url: `/og.png`,
          width: 1200,
          height: 630,
          alt: miniProject.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: miniProject.title,
      description: `Built with ${formattedTechStack}.`,
      images: [
        {
          url: `/og.png`,
          width: 1200,
          height: 630,
          alt: miniProject.title,
        },
      ],
    },
  };
}

export async function generateStaticParams(): Promise<
  MiniProjectPageProps["params"][]
> {
  return allMiniProjects.map((miniProject) => ({
    slug: miniProject.slugAsParams.split("/"),
  }));
}

export default async function miniProjectPage({
  params,
}: MiniProjectPageProps) {
  const miniProject = await getMiniProjectFromParams(params);

  if (!miniProject) {
    notFound();
  }

  const publishedDate = miniProject.publishedOn
    ? format(parseISO(miniProject.publishedOn), "yyyy/MM/dd")
    : null;
  const updatedDate = miniProject.updatedOn
    ? format(parseISO(miniProject.updatedOn), "yyyy/MM/dd")
    : null;

  return (
    <div className="mx-auto max-w-7xl px-6 pb-10 pt-20 sm:px-8 ">
      <div className="relative mx-auto flex max-w-[41rem] flex-col lg:grid lg:max-w-none lg:grid-cols-[1fr_minmax(0rem,_41rem)_1fr]">
        <div className="mb-12 lg:sticky lg:top-16 lg:self-start">
          <Link
            href="/mini-projects"
            className="flex w-fit items-center gap-2 text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-300"
          >
            <Icons.arrow_narrow_left className="w-4" />
            <span>Mini Projects</span>
          </Link>
        </div>
        <div className="pb-36">
          <div>
            <div
              className={`${
                !(publishedDate || updatedDate) ? "my-0" : ""
              } mdx-prose prose-meta`}
            >
              {publishedDate && updatedDate ? (
                <React.Fragment>
                  <span>{publishedDate}</span>
                  <Icons.arrow_narrow_right className="w-4" />
                  <span>{updatedDate}</span>
                </React.Fragment>
              ) : publishedDate ? (
                <span>{publishedDate}</span>
              ) : null}
            </div>
            <div
              className="mb-6 flex flex-wrap items-center justify-between gap-4"
              style={{ marginBottom: "24px" }}
            >
              <div className="mdx-prose">
                <h1 className="my-0 leading-tight" style={{ marginTop: "0px" }}>
                  {miniProject.title}
                </h1>
              </div>
              <div className="flex gap-3">
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
                    <Link href={miniProject?.externalLink} target="_blank">
                      <Icons.external_link />
                    </Link>
                  </Button>
                )}
              </div>
            </div>
          </div>
          <ThemedImage
            className="my-6 rounded-md border border-solid border-neutral-200 transition-all duration-75 dark:border-neutral-700"
            srcLight={miniProject.featuredImageLight ?? ""}
            srcDark={miniProject.featuredImageDark ?? ""}
            alt={"mini project screenshot"}
            priority
          />
          <MDXContent code={miniProject.body.code} />
        </div>
      </div>
    </div>
  );
}

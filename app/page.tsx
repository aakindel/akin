import React from "react";
import { AppLink } from "@/components/AppLink";
import { Button } from "@/components/Button";
import { Icons } from "@/components/Icons";
import MiniProjectDisplay from "@/components/MiniProjectDisplay";
import Link from "next/link";

export default function Home() {
  return (
    <React.Fragment>
      <div className="flex h-full min-h-[calc(100vh-60px)] w-full flex-col justify-between">
        <div className="h-full w-full">
          <div className="mx-auto max-w-[45rem] px-6 pb-10 pt-16 sm:px-8">
            <p className="mb-7 text-neutral-800 dark:text-neutral-200">
              Ayo Akindele
            </p>
            <p className="mb-7 leading-[1.7] text-neutral-700 dark:text-neutral-300">
              Building interfaces to solve design problems. Working primarily
              with React, Next.js, and Tailwind. BSc Computing Science from the
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
            <div className="mx-auto max-w-5xl px-6 sm:px-8">
              <Link href="/mini-projects">
                <MiniProjectDisplay />
              </Link>
            </div>
          </div>
        </div>
        <div className="mx-auto mb-8 mt-12 flex max-w-[45rem] items-center justify-center gap-6 px-6 sm:px-8">
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
      </div>
    </React.Fragment>
  );
}

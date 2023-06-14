import React from "react";
import type { NextPage } from "next";
import { AppLink } from "@/components/AppLink";

const Home: NextPage = () => {
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
    </React.Fragment>
  );
};

export default Home;

import React from "react";
import AppLink from "../AppLink";
import LearningsListStyles from "./LearningsList.module.scss";
import GeneralLearningsStyles from "@/mdx/paths/learnings/learnings.module.scss";
import { LearningsFrontmatter } from "@/mdx/paths/learnings/types";

type ListProps = {
  children?: React.ReactNode;
};

export const LearningsList = ({ children }: ListProps) => {
  return (
    <ul
      className={LearningsListStyles["LearningsList"]}
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

export function getLearningsByTag(
  learnings: LearningsFrontmatter[],
  learningTag = ""
) {
  return (
    <LearningsList>
      {learnings
        .filter((learning) =>
          learningTag === "" ? learning : learning.tags.includes(learningTag)
        )
        .map((learning, index) => {
          return <LearningsListItem key={index} learning={learning} />;
        })}
    </LearningsList>
  );
}

// https://webgradients.com/
export const LearningsListItem = ({
  learning,
}: {
  learning: LearningsFrontmatter;
}) => {
  const learningHref = `/learnings/${learning.title
    .toLowerCase()
    .replace("next.js", "nextjs")
    .split(" ")
    .join("-")}`;

  return (
    <div
      className={`${LearningsListStyles["learnings-list-scope"]} ${GeneralLearningsStyles["general-learnings-scope"]}`}
    >
      <li className={LearningsListStyles["list-item"]}>
        <AppLink
          className={LearningsListStyles["overlay-link"]}
          href={learningHref}
        ></AppLink>
        <div className={LearningsListStyles["content-container"]}>
          <div className={LearningsListStyles["project-name-container"]}>
            <h3 className={LearningsListStyles["project-name"]}>
              {learning.title}
            </h3>
          </div>
          <div className={LearningsListStyles["project-links-container"]}>
            <div
              className={`${GeneralLearningsStyles["learnings-tag"]} ${
                GeneralLearningsStyles[`learnings-tag-${learning.type}`]
              }`}
            >
              {learning.type}
            </div>
          </div>
        </div>
      </li>
    </div>
  );
};

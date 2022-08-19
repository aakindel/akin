import type { NextPage } from "next";
import Head from "next/head";
import styles from "@page_styles/Home.module.scss";
import DSStyles from "@mainds/styles/mainds.module.scss";
import AppLogo from "@/components/AppLogo";
import AppLink from "@/components/AppLink";
import Container from "@/design_systems/mainds/components/Container";
import ProjectDisplay from "@/components/ProjectDisplay";
import HeroIcons from "@/design_systems/mainds/components/icons/heroicons";
import SocialIcons from "@/design_systems/mainds/components/icons/social/simpleicons";
import IconStyles from "@/design_systems/mainds/components/icons/icons.module.scss";
import { projects } from "@/data/projects";

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Ayo Akindele</title>
        <meta
          name="description"
          content="Ayo Akindele. Building interfaces to solve design problems."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Container type="screen-md">
          <div
            style={{
              height: "60px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <AppLink href="/" style={{ height: "24px" }}>
              <AppLogo />
            </AppLink>
          </div>
        </Container>
        <Container type="screen-sm">
          <div style={{ marginBottom: "64px" }}></div>
          <p className={styles["lead-paragraph"]}>Ayo Akindele</p>
          <p className={styles["paragraph"]}>
            Building interfaces to solve design problems. Working primarily with
            React, Next.js, and Typescript. BSc Computing Science from the
            University of Alberta.
          </p>
          <div className={styles["link-container"]}>
            <p className={styles["paragraph"]}>
              <AppLink
                href="/resume.pdf"
                className={DSStyles["link-text"]}
                openInNewTab
              >
                Resume
              </AppLink>
            </p>
            <p className={styles["paragraph"]}>
              <AppLink
                href="https://github.com/aakindel"
                className={DSStyles["link-text"]}
                openInNewTab
              >
                Github
              </AppLink>
            </p>
          </div>
          <p className={styles["section-header"]}>Projects</p>
        </Container>
        <Container type="screen-md">
          {projects.map((project, index) => {
            return <ProjectDisplay key={index} project={project} />;
          })}
          <div style={{ marginBottom: "80px" }}></div>
        </Container>
        <Container type="screen-md">
          <div className={styles["footer"]}>
            <AppLink
              href="mailto:a.akindele01@gmail.com"
              className={DSStyles["link-text"]}
              style={{ height: "24px", width: "24px" }}
              openInNewTab
            >
              <HeroIcons
                className={IconStyles["light-gray-hover"]}
                icon="mail"
              />
            </AppLink>
            <AppLink
              href="https://github.com/aakindel"
              className={DSStyles["link-text"]}
              style={{ height: "24px", width: "24px" }}
              openInNewTab
            >
              <SocialIcons
                className={IconStyles["light-gray-hover"]}
                icon="github"
              />
            </AppLink>

            <AppLink
              href="https://www.linkedin.com/in/aakindel/"
              className={DSStyles["link-text"]}
              style={{ height: "24px", width: "24px" }}
              openInNewTab
            >
              <SocialIcons
                className={IconStyles["light-gray-hover"]}
                icon="linkedin"
              />
            </AppLink>
          </div>
        </Container>
      </main>
    </div>
  );
};

export default Home;

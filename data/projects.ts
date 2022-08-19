export type ProjectType = {
  name: string;
  description: string;
  techStack: string[];
  type: "img";
  imgSrc: string;
  bgColor: string;
  noShadow?: boolean;
  links: { type: "external" | "github"; href: string }[];
};

export const projects: ProjectType[] = [
  {
    name: "CMPUT 401 Portal",
    description:
      "Portal for displaying University of Alberta CMPUT 401 projects.",
    techStack: ["React", "TypeScript", "Material-UI"],
    imgSrc: "/project_401_portal.png",
    bgColor: "rgba(0, 124, 65, 0.1)",
    type: "img",
    links: [
      {
        type: "external",
        href: "http://cmput401.ca/",
      },
    ],
  },
  {
    name: "Plurr",
    description:
      "Social networking web app for sharing posts and pictures with friends.",
    techStack: ["React", "Django", "Heroku"],
    imgSrc: "/project_plurr.png",
    bgColor: "rgba(61, 139, 253, 0.1)",
    type: "img",
    links: [
      {
        type: "github",
        href: "https://github.com/aakindel/CMPUT404-project-socialdistribution",
      },
      {
        type: "external",
        href: "http://plurr.herokuapp.com/",
      },
    ],
  },
  {
    name: "Pocketbook",
    description:
      "Book sharing app for finding and exchanging interesting reads.",
    techStack: ["Java", "Android SDK", "Firebase"],
    imgSrc: "/project_pocketbook.png",
    bgColor: "rgba(255, 0, 0, 0.1)",
    noShadow: true,
    type: "img",
    links: [
      {
        type: "github",
        href: "https://github.com/aakindel/PocketBook",
      },
    ],
  },
];

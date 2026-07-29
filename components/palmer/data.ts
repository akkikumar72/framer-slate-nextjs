import { palmerAsset } from "./assets";

export type PalmerProject = {
  slug: string;
  title: string;
  date: string;
  service: string;
  client: string;
  duration: string;
  location: string;
  summary: string;
  images: string[];
};

export type PalmerArticle = {
  slug: string;
  title: string;
  category: string;
  readTime: string;
  location: string;
  date: string;
  excerpt: string;
  images: string[];
};

export const projects: PalmerProject[] = [
  {
    slug: "sonder-goods",
    title: "Sonder Goods",
    date: "2024-04-12",
    service: "Branding",
    client: "Sonder Studios Inc.",
    duration: "7-8 Weeks",
    location: "Los Angeles",
    summary:
      "A quiet but expressive identity system built around material, movement, and the confidence of less.",
    images: [
      "WSIwyrpSzX4O0fiESBwPTjSWBE.png",
      "wA52DtSvQDx894hqLZv4ezfKfz8.png",
      "Z29IwCiSBKlcPM3P9gKLM1kOQA.png",
      "c4v0BFVHL96KZfuqVprJYqGBX8.png",
      "IhwR33YbJAKylGnbmoCW4maBHI.png",
      "tkYEeCoj1udozbnzQynoaYqCI.png",
    ].map(palmerAsset),
  },
  {
    slug: "halo-wear",
    title: "Halo Wear",
    date: "2025-06-03",
    service: "Web Design",
    client: "Halo",
    duration: "6-7 Weeks",
    location: "Berlin",
    summary:
      "A precise fashion experience where campaign imagery, product rhythm, and restrained motion share the frame.",
    images: [
      "tkYEeCoj1udozbnzQynoaYqCI.png",
      "IhwR33YbJAKylGnbmoCW4maBHI.png",
      "OAptuWFNfA2ykYxM7NRYIeUI3Xc.png",
      "dW6eKw1U3UaJSOG5CQNsJkbsac.png",
      "wA52DtSvQDx894hqLZv4ezfKfz8.png",
      "WSIwyrpSzX4O0fiESBwPTjSWBE.png",
    ].map(palmerAsset),
  },
  {
    slug: "lucent-lab",
    title: "Lucent Lab",
    date: "2024-09-12",
    service: "Creative Direction",
    client: "Lucent Inc.",
    duration: "8-9 Weeks",
    location: "Tokyo",
    summary:
      "Creative direction for a future-facing studio, balancing cinematic space with a calm editorial system.",
    images: [
      "YIi7jRxIe8p6gLtM1ZMNpJyVYs.jpeg",
      "G891sPJdh93gPfGSBboEt88Now.png",
      "JXCg02dQvPtQoQ4APr28L599WRw.png",
      "6r6tLlKin4YdRCER0gZK7UJpWI.png",
      "wA52DtSvQDx894hqLZv4ezfKfz8.png",
      "WSIwyrpSzX4O0fiESBwPTjSWBE.png",
    ].map(palmerAsset),
  },
  {
    slug: "arc-bloom",
    title: "Arc Bloom",
    date: "2025-02-25",
    service: "Identity Design",
    client: "Arc Studio",
    duration: "5-6 Weeks",
    location: "Amsterdam",
    summary:
      "An identity that pairs modern restraint with warm, image-led storytelling for a growing creative practice.",
    images: [
      "Jt7zqgTjQMYT15YvEkLGKiF9Cw.png",
      "kSBqNFitJQuBzXuk7tl1FqlAHhs.png",
      "PxSsJrthME1XjSwGQXwUMx7rI.png",
      "WphhJDIoOTyAWBQ4nOmEaGTuaU.png",
      "wA52DtSvQDx894hqLZv4ezfKfz8.png",
      "WSIwyrpSzX4O0fiESBwPTjSWBE.png",
    ].map(palmerAsset),
  },
  {
    slug: "atelier-nara",
    title: "Atelier Nara",
    date: "2024-05-29",
    service: "Portfolio Site",
    client: "Nara",
    duration: "7-8 Weeks",
    location: "Seoul",
    summary:
      "A tactile portfolio for an independent atelier, designed to make every image feel collected and intentional.",
    images: [
      "7WVAcnCw5jrTdcET3CmMrpU7gf0.png",
      "svmMd86RbsKfib7KzvpKAUsHrk.png",
      "4dSYhvG1qxURxYoynH7D7s4tNhA.png",
      "zJFZn9viLHX7TzCo8VaLATwjVgU.png",
      "wA52DtSvQDx894hqLZv4ezfKfz8.png",
      "WSIwyrpSzX4O0fiESBwPTjSWBE.png",
    ].map(palmerAsset),
  },
];

export const articles: PalmerArticle[] = [
  {
    slug: "gregory-lalle",
    title: "Gregory Lalle",
    category: "Web Design",
    readTime: "11 mins",
    location: "Tokyo",
    date: "2024-05-21",
    excerpt:
      "Good design is not just about structure. It is about the emotional weight of space, rhythm, and silence.",
    images: [
      "yIiUMXJoon44xe3SOzMh1ekTV6w.png",
      "0zkhQwEFfmIvItABo0rnH6XwDrA.png",
      "t2Ax1jPqX6nJZGiYaqGTvJk2SPQ.png",
      "d20InX0N58mvnO82X9ikXnMM.png",
      "lQLsTJiqsB9ACEPrW1gQ30adDk.png",
      "csxpEgWFVTOxXWsJilvG5RWjVp0.png",
      "6iFDrQcQ1tbYR5t9ILpmgXqgD0.png",
    ].map(palmerAsset),
  },
  {
    slug: "clive-willow",
    title: "Clive Willow",
    category: "Design",
    readTime: "10 mins",
    location: "Los Angeles",
    date: "2024-02-05",
    excerpt:
      "Typography today is no longer static. It breathes, scales, and adapts, blurring function and expression.",
    images: [
      "er1aOMKJCJuCxihFmaOaonRR58.png",
      "muneBgCd8tQMZUkqv7D7M6MoMc.png",
      "xzbPNePbVo1XEJ4a3O4V473BM.png",
      "dfa6kXeZNdp07AUexK86lC0Av1Q.png",
      "iiGTolB7dNCehqd8pKKhmB9uo.png",
      "n6qKLSNOWse4XjIvQ1XrrD66oE.png",
    ].map(palmerAsset),
  },
  {
    slug: "raven-claw",
    title: "Raven Claw",
    category: "Visual Identity",
    readTime: "12 mins",
    location: "Los Angeles",
    date: "2024-06-02",
    excerpt:
      "Minimal design is not emptiness. It is clarity, intention, and the reduction of noise to amplify what matters.",
    images: [
      "N5zcGiIfGyPsuZPiCmCURaba0.png",
      "bKD6QQYP4X5OziCLBiLi0aUFEUk.png",
      "mG3D4W3YgHIt19SJ1bMfBZPHhGU.png",
      "YETkcyql4JQULueeZE26WkYSSU.png",
      "gHfc5xgLPLvQ5RxelQTL8XVSfZA.png",
      "aVOxaW9TAd0obDqqJbHz7JTt7h8.png",
    ].map(palmerAsset),
  },
  {
    slug: "clay-nicolas",
    title: "Clay Nicolas",
    category: "Portfolio",
    readTime: "10 Mins",
    location: "Los Angeles",
    date: "2025-06-10",
    excerpt:
      "Portfolios today must be more than archives. They need to feel alive, intentional, and editorial by design.",
    images: [
      "GWbDxRwp39ZkrSjQVPc6IjmS8us.png",
      "uJMIH3K4JijRLtNCNuWBj9M2cbA.png",
      "xStiaNWeTN3RO7BsQXjUWcb3jTM.png",
      "HIK9onQ4k8KGjwq99EDmJvandE.png",
      "WRGGZZ0LK6pAnTz6p4WYg1VU.png",
      "zHhv5Ns7jSq12wCrlbEeDEWkW3E.png",
      "1D2lDLcBnKpywBRPAJWNr6cpA.png",
    ].map(palmerAsset),
  },
];

export const footerImages = [
  "kDDFdQi11eufzZl2QNW6DZQPHc.png",
  "cTZryjPqV5ZMUtNQzLv4ThG3Rc.png",
  "U6Lqqgoqd6GcIuLTfi8cdeLwVO4.png",
  "BUHPRJEXyNtV4SzSuVGHESxLAQ.png",
  "D5DNZqI6mcEFCYSZWhnmUO1zKY.png",
  "V8SEwxdOqG25w8pT1yHaJ2id5iw.png",
  "dNrIdvmFhdP0xZzwxHIhE2HDHk.png",
  "uBAfSHVa5Eb3SW2z97v14rBRQ.png",
].map(palmerAsset);

export const jaydenAsset = (name: string) => `/jayden/assets/${name}`;

export const jaydenAssets = {
  ambientLeft: jaydenAsset("OWVdG7nO7rtog4qGyoyrsa1xCgg.png"),
  ambientRight: jaydenAsset("XkNF6neZ1Zhw4iYseg585mGJ6c.png"),
  heroPortrait: jaydenAsset("Sw1RXitxqpkOiWs8LmcITuaU.svg"),
  mark: jaydenAsset("rjytgkPUTbFjrXmIX6Muq6ybMLY.svg"),
  footerPortrait: jaydenAsset("W0Flr9u5hJlVmyjWEYDshQ2sPY.svg"),
  workMobile: jaydenAsset("UasOB1NbR875Pw2Ij2PGyApbU.png"),
  workHelve: jaydenAsset("hjT6B4UXkJiXQh8rHfnsip03BF0.jpg"),
  workAgency: jaydenAsset("XaE4yrDhL37AURp07EFT3SFjsG8.jpg"),
  workBackdrop: jaydenAsset("rgPOFBBht0a94MsOAn44ytXiBQ.jpg"),
  galleryOne: jaydenAsset("g1RWtjflHS2M53QcEU764KSVuik.svg"),
  galleryTwo: jaydenAsset("rtCbmzN4khPthDxAW6vxpyN3as.svg"),
  galleryThree: jaydenAsset("ZTA5Vxos3aZkpvYaimkTbJufRs.svg"),
  galleryFour: jaydenAsset("5x5ca9FKJLnltN8Z6xTKt34kIXg.jpg"),
  testimonialOne: jaydenAsset("1XRxQDpurW1mtmbTg5wRlwF8mg4.jpg"),
  testimonialTwo: jaydenAsset("Y1KprEiGivnP0lcDDc5016uGk.jpg"),
  testimonialThree: jaydenAsset("Ay9VoZJHfZdhuyziIzSKQ9Mrjys.jpg"),
  avatarOne: jaydenAsset("nTNSS8ijZFcBHjqm2WfCGBLoaMI.png"),
  avatarTwo: jaydenAsset("fz8zubzVRplu13EFkGBpdNpJI.png"),
  avatarThree: jaydenAsset("Q77zMAB74cBdPEr0bTqyfC7UaUc.png"),
  processOne: jaydenAsset("afig3T5fI6E8UQQmYSVboT7nv0.svg"),
  processTwo: jaydenAsset("UfwAsKOXpDiN91jRDn5yzqOuS8.svg"),
  processThree: jaydenAsset("YNPhyktX9kTyONeRxpGVyEtsMG0.svg"),
  processFour: jaydenAsset("IINpmf6HsR0WiEEL4DsAwbQrNUw.svg"),
  awardUp: jaydenAsset("4tWyntG9MBexWYM2WEAAmwxbJU.png"),
  awardBehance: jaydenAsset("tUPLQ4UIeYepoYzZ8CKXfvNY4Sg.png"),
  awardClutch: jaydenAsset("xs2ZbDVjM80Mil9cvILhohW3vM.png"),
  contactMail: jaydenAsset("4HNVjpXCHqlIWmpq2NjtTzYRt0.png"),
  contactPhone: jaydenAsset("rrVAqB8MGdmhKJcl6mYP6l1pTw.png"),
  contactLocation: jaydenAsset("IT4dC8x20mkhLWpttbk8Hz8QK4.png"),
  detailMobileOne: jaydenAsset("amKgmK8h6YKWCQpuzKzKCux6A.jpg"),
  detailMobileTwo: jaydenAsset("f1QxUdn4d8caOItLbdJKj3jes0.jpg"),
  detailHelveOne: jaydenAsset("2ImR2cQiNiLua90mO6rBnSn5I.jpg"),
  detailHelveTwo: jaydenAsset("v9wZMnjg0cuk365MOaQK1Mt1q5Y.jpg"),
  detailAgencyOne: jaydenAsset("YRnwcYkcqkfsFhzkG8VPYO3yYrY.jpg"),
  detailAgencyTwo: jaydenAsset("beUWH9WMTsdKJGOUskmm0BhUF8.jpg"),
  footerTexture: jaydenAsset("WPOW2IWzFRo5zYDu1a84FChDTlc.png"),
  notFoundVideo: jaydenAsset("f49a7HtOV2sbst7bzgGO2JR1RbM.mp4"),
} as const;

export type JaydenProjectSlug =
  | "x---direct-mobile"
  | "helve-website-redesign"
  | "ui-ux-agency";

export type JaydenProject = {
  slug: JaydenProjectSlug;
  category: string;
  title: string;
  date: string;
  client: string;
  duration: string;
  cardImage: string;
  detailImages: [string, string];
};

export const jaydenProjects: JaydenProject[] = [
  {
    slug: "x---direct-mobile",
    category: "Mobile App Design",
    title: "X-direct Mobile",
    date: "May 2026",
    client: "X-direct",
    duration: "6 Weeks",
    cardImage: jaydenAssets.workMobile,
    detailImages: [jaydenAssets.detailMobileOne, jaydenAssets.detailMobileTwo],
  },
  {
    slug: "helve-website-redesign",
    category: "Website Design",
    title: "Helve Website Redesign",
    date: "Mar 2026",
    client: "Helve Studio",
    duration: "5 Weeks",
    cardImage: jaydenAssets.workHelve,
    detailImages: [jaydenAssets.detailHelveOne, jaydenAssets.detailHelveTwo],
  },
  {
    slug: "ui-ux-agency",
    category: "Website Website",
    title: "UI/UX Agency Design",
    date: "Jan 2026",
    client: "Creative Agency",
    duration: "4 Weeks",
    cardImage: jaydenAssets.workAgency,
    detailImages: [jaydenAssets.detailAgencyOne, jaydenAssets.detailAgencyTwo],
  },
];

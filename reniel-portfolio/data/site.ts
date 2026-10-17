// Single place to edit personal details, links, and display options.
export const site = {
  name: "Reniel Tejones",
  role: "Computer Engineer / Digital Builder",
  location: "Cebu, Philippines",
  githubUsername: process.env.GITHUB_USERNAME || "b1gman16",
  // TODO: replace with your real links.
  linkedin: "www.linkedin.com/in/reniel-tejones",
  email: "renieltejones@gmail.com",
  // Photo lives at public/images/portrait.jpg (served from /images/portrait.jpg).
  portrait: "/images/portrait.jpg" as string | null,
  // Configurable. Set show:false to hide. Confirm the wording is accurate before deploying.
  availability: { show: true, label: "Available for select projects" },
  github: {
    includeForks: false,
    includeArchived: false,
    maxVisible: 6,
    // Repo names pinned to the front of the automatic list.
    pinned: [] as string[],
  },
} as const;

export const nav = [
  { href: "#home", label: "Home" },
  { href: "#work", label: "Work" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
];
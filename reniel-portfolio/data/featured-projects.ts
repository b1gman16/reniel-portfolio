export type FeaturedProject = {
  slug: string;
  label: string;
  title: string;
  description: string;
  areas: string[];
  image?: { src: string; alt: string };
  imageHint: string;
  links: { label: string; href: string }[];
  metrics?: { value: string; label: string }[];
  note: string;
  // Repo name (if any) to hide from the automatic GitHub list.
  repo?: string;
};

export const featuredProjects: FeaturedProject[] = [
  {
    slug: "bayfront-resort",
    label: "Hospitality / Web + Systems",
    title: "Bayfront Resort — Digital Experience",
    description:
      "A real-world hospitality project exploring resort web presence and property management workflows.",
    areas: [
      "Website design and development",
      "Hospitality business workflows",
      "Property management system development",
      "Reservations, guest operations, and admin workflows (where implemented)",
    ],
    // image: { src: "/images/bayfront/cover.jpg", alt: "Bayfront Resort website" },
    imageHint: "public/images/bayfront/cover.jpg",
    links: [], // e.g. { label: "Visit site", href: "https://..." }
    note: "TODO: mark which features are implemented, prototype, or planned.",
  },
  {
    slug: "hallguard",
    label: "Capstone / AI + IoT",
    title: "HallGuard — AI + IoT Safety System",
    description:
      "An academic capstone combining computer vision, Raspberry Pi hardware, mobile monitoring, and safety notifications. Built on a Raspberry Pi 5 with dual cameras, YOLOv8 detection, a Flutter app, and Firebase (Firestore + Cloud Messaging).",
    areas: ["Raspberry Pi 5", "YOLOv8", "Flutter", "Firebase"],
    imageHint: "public/images/hallguard/cover.jpg",
    links: [],
    metrics: [
      { value: "60,838", label: "annotated images in a custom dataset" },
      { value: "96.53%", label: "detection accuracy over 1,440 evaluation trials" },
      { value: "2.38 s", label: "average alarm response time" },
      { value: "1.33 s", label: "average notification latency" },
    ],
    note: "Figures come from the project's own evaluation conditions. They do not guarantee detection in every environment.",
  },
];

export type CaseStudySection = {
  heading: string;
  body: string[];
};

export type Project = {
  slug: string;
  index: string;
  name: string;
  tags: string[];
  oneLiner: string;
  summary: string;
  visual: "hallguard" | "homeops" | "bayfront";
  year: string;
  role: string;
  stack: string[];
  sections: CaseStudySection[];
};

export const projects: Project[] = [
  {
    slug: "hallguard",
    index: "01",
    name: "HallGuard",
    tags: ["Computer Vision", "IoT", "Full-Stack", "Embedded Systems"],
    oneLiner:
      "An AI and IoT safety system that watches campus hallway railings and flags unsafe situations in real time.",
    summary:
      "A capstone project built around two Raspberry Pi cameras, a trained detection model, and a cloud backend — designed, trained, and wired together end to end.",
    visual: "hallguard",
    year: "2024–2025",
    role: "End-to-end technical implementation — hardware, computer vision, backend, and app",
    stack: [
      "Raspberry Pi 5",
      "Python",
      "YOLOv8n",
      "CVAT",
      "Firebase / Firestore",
      "Firebase Cloud Messaging",
      "Mobile app",
    ],
    sections: [
      {
        heading: "Overview",
        body: [
          "HallGuard is a capstone project built with a small group: an AI and IoT system that monitors campus hallway railings and flags potentially unsafe situations, such as someone climbing or leaning dangerously over a railing, before they become accidents.",
        ],
      },
      {
        heading: "Context",
        body: [
          "The original concept came from a member of our group, who noticed that hallway railings on campus weren't actively monitored despite the safety risk. From there, the project needed someone to turn that concern into an actual working system — sensors, a model, a backend, and a way for staff to be notified.",
          "That's the part I took on.",
        ],
      },
      {
        heading: "The Problem",
        body: [
          "Unsafe railing behavior is brief and easy to miss. A system meant to catch it needed to run continuously on modest hardware, tell the difference between normal and risky behavior across two camera angles, and get a useful alert to someone who could respond — without flooding them with false positives.",
        ],
      },
      {
        heading: "My Role",
        body: [
          "I was responsible for building the system end to end. That meant the Raspberry Pi 5 hardware setup and dual camera streams, the computer vision pipeline from dataset to trained model, the backend logic that turns detections into events, the cloud integration, and the mobile app that surfaces alerts and device status.",
          "The idea for the project was a group effort. Making it into a working system — architecture, hardware, model, software, and the connections between all of them — was mine to figure out.",
        ],
      },
      {
        heading: "Exploration",
        body: [
          "Before building anything, I looked at what object detection models could realistically run on a Raspberry Pi without a dedicated accelerator. I compared a few lightweight architectures against our constraints — inference speed, accuracy, and how much I could reasonably train on the dataset we could collect — and settled on YOLOv8n for its balance of speed and accuracy at that scale.",
          "I also had to think through how two separate camera feeds should relate to each other, since a single angle wasn't enough to reliably judge distance from the railing.",
        ],
      },
      {
        heading: "Decisions",
        body: [
          "A few decisions shaped the rest of the build. I chose to do region-of-interest processing so the model only had to reason about the railing area rather than the whole frame, which cut down on irrelevant detections. I added temporal smoothing so a single noisy frame couldn't trigger a false alert — an unsafe classification had to hold across several frames first.",
          "I also decided to fuse detections from both cameras rather than treat them as independent feeds, since agreement between the two angles was a much stronger signal than either one alone.",
        ],
      },
      {
        heading: "Building",
        body: [
          "On the hardware side, I set up the Raspberry Pi 5 with two camera modules and got both streams running reliably in parallel. I collected and annotated the training dataset in CVAT, then trained and evaluated the YOLOv8n model against our safety-relevant classes.",
          "On the software side, I built the detection pipeline — region-of-interest filtering, temporal smoothing, multi-camera fusion — and the backend logic that turns a confirmed detection into an event. Firestore stores event metadata and device state; Firebase Cloud Messaging pushes notifications out. I also built the mobile app's monitoring, device-status, and event-history features, plus a local audio alarm for on-site response, and wired every one of these pieces into a single working system.",
        ],
      },
      {
        heading: "Challenges",
        body: [
          "Running a vision model plus two camera streams on Raspberry Pi hardware meant constantly balancing accuracy against what the hardware could actually sustain. Early versions of the model were too eager to flag normal behavior as unsafe, which is what pushed me toward temporal smoothing and region-of-interest processing rather than trying to fix it purely by retraining.",
          "Getting the two cameras to agree — physically and in software — took more iteration than I expected, since small differences in mounting angle changed how well fusion actually worked.",
        ],
      },
      {
        heading: "Result",
        body: [
          "The current system runs on the Raspberry Pi 5, watches both camera feeds continuously, and produces an event with metadata whenever it confirms unsafe behavior — triggering a local alarm, a push notification, and an entry in the app's event history that staff can review alongside device status.",
        ],
      },
      {
        heading: "What I Learned",
        body: [
          "HallGuard was the project that forced me to operate across hardware, computer vision, backend, cloud services, and an application at the same time, and to understand how a weak link in any one of them breaks the whole system. It also taught me how much of building something reliable is about reducing noise — in the model's predictions, in the sensor setup, in what actually gets escalated to a person.",
        ],
      },
      {
        heading: "Next Steps",
        body: [
          "I'd like to expand the dataset to cover more railing types and lighting conditions, explore on-device model optimization to reduce latency further, and add configurable sensitivity so different locations can be tuned without retraining the model.",
        ],
      },
    ],
  },
  {
    slug: "homeops",
    index: "02",
    name: "HomeOps",
    tags: ["Infrastructure", "Linux", "Docker", "Networking", "Self-Hosting"],
    oneLiner:
      "A personal homelab built on an old office PC — Linux, containers, and a dashboard, run and maintained by hand.",
    summary:
      "An ongoing self-hosted environment for learning infrastructure by actually operating a server, not just reading about one.",
    visual: "homeops",
    year: "Ongoing",
    role: "Sole builder and operator",
    stack: [
      "Ubuntu Server",
      "Docker / Docker Compose",
      "Tailscale",
      "SSH",
      "Crafty Controller",
      "FastAPI",
    ],
    sections: [
      {
        heading: "Overview",
        body: [
          "HomeOps is a personal homelab running on an old office PC I repurposed into a home server. It hosts a handful of self-managed services, a Minecraft server, and a small monitoring dashboard I built myself.",
        ],
      },
      {
        heading: "Context",
        body: [
          "I'd worked with Linux and infrastructure concepts academically, but wanted to actually operate a server long-term — dealing with real uptime, real configuration drift, and real troubleshooting — rather than only setting one up once for an assignment.",
        ],
      },
      {
        heading: "The Problem",
        body: [
          "Infrastructure concepts are easy to read about and easy to forget without hands-on repetition. I needed an environment where I'd have to keep something running over time, which surfaces problems that a one-off setup never does.",
        ],
      },
      {
        heading: "My Role",
        body: [
          "Everything here — provisioning, configuration, service management, networking, and the monitoring tooling — is something I set up and maintain myself, on my own time, as a personal project.",
        ],
      },
      {
        heading: "Exploration",
        body: [
          "I looked into how to structure services with Docker Compose rather than installing everything directly on the host, how Tailscale could give me secure remote access without exposing ports to the open internet, and what a lightweight way to monitor container and system health would look like for a single-machine setup.",
        ],
      },
      {
        heading: "Decisions",
        body: [
          "I chose to containerize almost everything, including the Minecraft server managed through Crafty Controller, so services stay isolated and easy to redeploy. For remote access, I picked Tailscale over opening ports directly, prioritizing security for a machine sitting on my home network. For monitoring, I decided to build a small dashboard myself with FastAPI rather than adopting a heavier off-the-shelf monitoring stack, since I wanted something I fully understood.",
        ],
      },
      {
        heading: "Building",
        body: [
          "I installed and configured Ubuntu Server on the repurposed PC, set up SSH access, and moved services into Docker containers managed through Docker Compose. I connected the machine to my Tailscale network for remote administration, set up Crafty Controller to manage the Minecraft server, and built a FastAPI-based web dashboard that reports CPU usage, CPU temperature, RAM, storage, overall server status, and the status of individual containers.",
        ],
      },
      {
        heading: "Challenges",
        body: [
          "Diagnosing issues on real hardware — thermal behavior, storage quirks, containers that quietly stopped responding — took more patience than working with disposable virtual environments. Building the monitoring dashboard also meant learning what metrics actually mattered enough to surface, rather than dumping every available number onto a page.",
        ],
      },
      {
        heading: "Result",
        body: [
          "HomeOps currently runs a set of containerized self-hosted services and a Minecraft server continuously, with a dashboard I check to see system health and container status at a glance, all administered remotely over Tailscale.",
        ],
      },
      {
        heading: "What I Learned",
        body: [
          "Running a server long-term teaches things a semester project can't — how services actually fail, how to reason about resource limits on modest hardware, and how to build monitoring that answers 'is everything okay' quickly rather than burying that answer in raw metrics.",
        ],
      },
      {
        heading: "Next Steps",
        body: [
          "I'm planning to add automated backups for the containers I care about most, look into basic alerting when something goes down, and keep expanding the dashboard as I add more services.",
        ],
      },
    ],
  },
  {
    slug: "bayfront",
    index: "03",
    name: "Bayfront Resort Website",
    tags: ["Web", "Design", "Business", "Digital Experience"],
    oneLiner:
      "A website for a newly acquired, family-owned resort — built to give a real business its first proper digital presence.",
    summary:
      "An ongoing project that shifted my focus from building technology for its own sake to building it for an actual business and its guests.",
    visual: "bayfront",
    year: "Ongoing",
    role: "Design, development, and business-facing decisions",
    stack: ["Responsive web development", "Visual design", "Information architecture", "Hosting & deployment"],
    sections: [
      {
        heading: "Overview",
        body: [
          "Bayfront Resort is a real website project for a family-owned resort that was recently acquired by new owners. The site is meant to give the resort its first real digital presence — a place where potential guests can understand what it offers before they arrive.",
        ],
      },
      {
        heading: "Context",
        body: [
          "Under new ownership, the resort had no meaningful web presence to speak of. As it opens to a wider audience, it needs a way to represent itself online that matches how it wants to be experienced in person.",
        ],
      },
      {
        heading: "The Problem",
        body: [
          "The resort needed a professional digital presence that communicates its identity, its facilities, its location, and its value to potential guests — and that could eventually support real business needs like inquiries, and later, bookings and payments.",
        ],
      },
      {
        heading: "My Role",
        body: [
          "I'm handling the website end to end: visual direction, responsive development, information architecture, and the practical decisions around hosting and deployment — while thinking about the project as a business problem first, not just a technical one.",
        ],
      },
      {
        heading: "Exploration",
        body: [
          "I spent time understanding what guests actually need to know before choosing a resort — rooms, amenities, location, atmosphere — and looked at how comparable properties present themselves online. I also thought through how the site's structure should map to how a visitor actually decides, rather than how the business is internally organized.",
        ],
      },
      {
        heading: "Decisions",
        body: [
          "I decided the site's information architecture should follow a guest's decision path — first impression, facilities, location, then how to get in touch — rather than mirroring an internal department structure. I also planned the technical foundation with future functionality in mind, so that inquiries now, and online booking and payments later, can be added without rebuilding the site from scratch.",
        ],
      },
      {
        heading: "Building",
        body: [
          "I'm building a responsive site that presents the resort's facilities, location, and character clearly, with an emphasis on the resort's own identity rather than a generic template feel. This includes the visual direction, the page structure, the responsive layout work, and getting it properly hosted and deployed.",
        ],
      },
      {
        heading: "Challenges",
        body: [
          "Working directly with a real business means balancing what looks best design-wise against what the owners actually need communicated, and doing that translation without over-promising features — like booking or payments — before they're actually built.",
        ],
      },
      {
        heading: "Result",
        body: [
          "The project is ongoing. The current focus is a professional, responsive presentation of the resort — its facilities, location, and identity — with a foundation in place to add inquiry handling and, eventually, online booking and payments.",
        ],
      },
      {
        heading: "What I Learned",
        body: [
          "This project is where building technology started to feel connected to an actual outcome for someone else's business, rather than a self-contained technical exercise. It's pushed me to think about design and development decisions in terms of what a real visitor and a real owner both need, not just what's technically interesting to build.",
        ],
      },
      {
        heading: "Next Steps",
        body: [
          "Next is building out inquiry handling, then planning the path toward online booking and payments as the resort's needs grow.",
        ],
      },
    ],
  },
];

export const otherProjects = [
  {
    name: "Student Management System",
    stack: "Java, Java Swing",
    description:
      "A desktop application for managing student records, built to practice structuring a full CRUD application with a Swing interface.",
  },
  {
    name: "Batch Payroll System",
    stack: "C#",
    description:
      "A batch-processing payroll application handling employee records and pay computation logic.",
  },
  {
    name: "Arduino Projects",
    stack: "Sensors, actuators, embedded systems",
    description:
      "A set of smaller embedded builds — sensor input, actuator control, and basic automation logic on Arduino hardware.",
  },
  {
    name: "C Hangman",
    stack: "C",
    description:
      "A command-line hangman game, built as a low-level exercise in program structure and memory management.",
  },
  {
    name: "Data Science / ML Experiment",
    stack: "Python, Pandas, NumPy, scikit-learn",
    description:
      "A self-directed experiment in data cleaning, exploration, and basic model training to get hands-on with the data science workflow.",
  },
];

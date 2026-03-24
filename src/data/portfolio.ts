export const personalInfo = {
  name: "Aditi Sharma",
  firstName: "Aditi",
  lastName: "Sharma",
  role: "Full-Stack Developer",
  roles: [
    "B.Tech CSE Student",
    "Full-Stack Developer (MERN)",
    "DSA Problem Solver",
  ],
  bio: "I'm a Computer Science Engineering student at Lovely Professional University, passionate about building full-stack web applications. I specialize in the MERN stack and love crafting clean, performant, user-friendly experiences. When I'm not coding, I'm sharpening my problem-solving skills on LeetCode and GeeksforGeeks.",
  email: "aditisharma732006@gmail.com",
  phone: "+91-7876644706",
  github: "https://github.com/aditisharma732006",
  linkedin: "https://www.linkedin.com/in/aditi-i-sharma",
  githubUsername: "aditisharma732006",
  linkedinUsername: "aditi-i-sharma",
};

export const skills = [
  {
    category: "Languages",
    color: "violet",
    items: ["Java", "C++", "JavaScript", "SQL", "HTML", "CSS"],
  },
  {
    category: "Frameworks & Libraries",
    color: "indigo",
    items: ["React.js", "Node.js", "Express.js"],
  },
  {
    category: "Databases",
    color: "purple",
    items: ["MongoDB", "MySQL", "Mongoose"],
  },
  {
    category: "Core Concepts",
    color: "blue",
    items: [
      "Data Structures & Algorithms",
      "Object-Oriented Programming",
      "RESTful APIs",
      "JWT Authentication",
    ],
  },
];

export const projects = [
  {
    id: 1,
    title: "QuizZoo",
    subtitle: "Online Quiz Platform",
    description:
      "A production-ready full-stack quiz platform where users can register, authenticate securely, create and attempt quizzes, and track performance — all in a polished, intuitive interface.",
    details: [
      "Engineered end-to-end authentication with JWT, protected API routes, and role-based access for quiz creators and participants.",
      "Designed a flexible data schema for users, quizzes, questions, and results using MongoDB + Mongoose.",
      "Built an interactive React.js frontend with real-time score tracking, quiz timers, and a performance dashboard.",
      "Developed RESTful APIs with Express.js handling quiz lifecycle from creation to submission and analytics.",
    ],
    techStack: ["React.js", "Node.js", "Express.js", "MongoDB", "Mongoose", "JWT"],
    github: "https://github.com/aditisharma732006/QuizZoo",
    liveUrl: null,
    period: "Jan 2026 – Present",
    status: "Active",
    featured: true,
  },
  {
    id: 2,
    title: "Virtual Memory Simulator",
    subtitle: "OS Concepts Visualizer",
    description:
      "An interactive browser-based simulator that brings Operating System memory management to life — visualizing paging, frame allocation, and page-replacement algorithms with step-by-step execution.",
    details: [
      "Visualizes page tables, physical frames, and memory allocation in real-time with animated transitions.",
      "Implements both LRU (Least Recently Used) and Optimal page-replacement algorithms with side-by-side comparison.",
      "Supports manual step-through and auto-run modes, making it ideal for studying OS concepts.",
      "Tracks page faults, hit ratio, and fragmentation as live metrics that update with each memory event.",
    ],
    techStack: ["HTML", "CSS", "JavaScript"],
    github: "https://github.com/Priyanshu-Singh1/Virtual-Memory-Tool",
    liveUrl: null,
    period: "Apr 2025",
    status: "Completed",
    featured: true,
  },
  {
    id: 3,
    title: "Carbon Tracker",
    subtitle: "Eco Footprint Dashboard",
    description:
      "A full-stack carbon footprint tracker that helps users log daily activities, calculate their environmental impact, and receive personalised sustainability recommendations.",
    details: [
      "Implemented one-click carbon footprint calculation from logged activities using configurable emission factors.",
      "Built activity history management with CRUD operations backed by MongoDB.",
      "Provided AI-style suggestion insights to help users identify and reduce high-impact habits.",
      "Developed as part of the CipherSchools MERN Stack curriculum, integrating full backend + frontend flow.",
    ],
    techStack: ["React.js", "Node.js", "Express.js", "MongoDB"],
    github: "https://github.com/aditisharma732006",
    liveUrl: null,
    period: "Jul 2025 – Aug 2025",
    status: "Completed",
    featured: false,
  },
];

export const achievements = [
  {
    id: 1,
    value: 120,
    suffix: "+",
    label: "DSA Problems",
    sublabel: "Solved on LeetCode",
    icon: "code",
    color: "violet",
    link: "https://leetcode.com/u/aditisharma_6/",
    linkLabel: "View LeetCode Profile",
  },
  {
    id: 2,
    value: 150,
    suffix: "+",
    label: "Coding Score",
    sublabel: "On GeeksforGeeks",
    icon: "trophy",
    color: "indigo",
    link: "https://www.geeksforgeeks.org/profile/aditisharavz8?tab=activity",
    linkLabel: "View GFG Profile",
  },
  {
    id: 3,
    value: 8.26,
    suffix: "",
    label: "CGPA",
    sublabel: "B.Tech CSE at LPU",
    icon: "graduation",
    color: "purple",
    decimals: 2,
    link: null,
    linkLabel: null,
  },
  {
    id: 4,
    value: 3,
    suffix: "",
    label: "Certifications",
    sublabel: "NPTEL & Coursera",
    icon: "certificate",
    color: "blue",
    link: null,
    linkLabel: null,
  },
];

export const education = [
  {
    id: 1,
    institution: "Lovely Professional University",
    location: "Phagwara, Punjab",
    degree: "Bachelor of Technology",
    field: "Computer Science and Engineering",
    grade: "CGPA: 8.26",
    period: "Aug 2023 – Present",
    current: true,
    icon: "university",
  },
  {
    id: 2,
    institution: "Kendriya Vidyalaya No.3",
    location: "Jalandhar, Punjab",
    degree: "Higher Secondary (Class XII)",
    field: "Science",
    grade: "80.4%",
    period: "Apr 2022 – Jun 2023",
    current: false,
    icon: "school",
  },
  {
    id: 3,
    institution: "Kendriya Vidyalaya No.3",
    location: "Jalandhar, Punjab",
    degree: "Secondary (Class X)",
    field: "General",
    grade: "85.6%",
    period: "Apr 2020 – Jun 2021",
    current: false,
    icon: "school",
  },
];

export const certificates = [
  {
    title: "Cloud Computing",
    issuer: "NPTEL",
    period: "Jan 2025 – Apr 2025",
    color: "violet",
    link: "https://drive.google.com/file/d/1068MRDFRD--qu4dWMaLTHlQCeaKOsHJT/view",
  },
  {
    title: "Computer Communications Specialization",
    issuer: "Coursera",
    period: "Sep 2024 – Nov 2024",
    color: "indigo",
    link: "https://drive.google.com/file/d/1DoHMrqVhC1PKEndtCGlkZcb1J1a3hB4t/view",
  },
  {
    title: "Software Engineering: Implementation and Testing",
    issuer: "Coursera",
    period: "May 2024",
    color: "purple",
    link: "https://drive.google.com/file/d/1gJIdVORgoX4MJMnH7BhpAgCi4ACefive/view",
  },
];

export const training = [
  {
    title: "Full-Stack Development Training",
    org: "CipherSchools",
    period: "Jul 2025 – Aug 2025",
    description:
      "Completed professional MERN Stack training covering RESTful API design, responsive UI development, and database integration through hands-on project work.",
    certificate: true,
    certificateLink:
      "https://drive.google.com/file/d/1Y9c9HvmEHr0fKf__JilT_5W58oaqCm6v/view",
  },
];

export const navLinks = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Achievements", href: "#achievements" },
  { label: "Education", href: "#education" },
  { label: "Contact", href: "#contact" },
];

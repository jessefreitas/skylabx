import { BsCodeSlash, BsGraphUp, BsHouseDoor, BsShieldCheck } from "react-icons/bs";

export const floatingNavItems = [
  {
    name: "Home",
    link: "/",
    icon: <BsHouseDoor className="h-4 w-4 text-neutral-500 dark:text-white" />,
  },
  {
    name: "Auditor",
    link: "/stack-auditor",
    icon: <BsShieldCheck className="h-4 w-4 text-neutral-500 dark:text-white" />,
  },
  {
    name: "Code Analysis",
    link: "/code-analysis",
    icon: <BsCodeSlash className="h-4 w-4 text-neutral-500 dark:text-white" />,
  },
  {
    name: "Monitor",
    link: "/performance-monitoring",
    icon: <BsGraphUp className="h-4 w-4 text-neutral-500 dark:text-white" />,
  },
];

import type { ComponentType } from "react";
import {
  Atom,
  Browsers,
  Code,
  Cube,
  FileC,
  FileCode,
  FileCpp,
  FileCss,
  FileHtml,
  FileJs,
  FilePy,
  FileRs,
  FileSql,
  FileTs,
  FileVue,
  Fire,
  GithubLogo,
  Notebook,
  Sparkle,
} from "@phosphor-icons/react/dist/ssr";

export type IconComponent = ComponentType<{
  size?: number | string;
  weight?: "thin" | "light" | "regular" | "bold" | "fill" | "duotone";
  className?: string;
  "aria-hidden"?: boolean | "true" | "false";
}>;

type IconProps = { size?: number; className?: string };

// GitHub's primary-language names -> icon
const LANGUAGES: Record<string, IconComponent> = {
  JavaScript: FileJs,
  TypeScript: FileTs,
  Python: FilePy,
  HTML: FileHtml,
  CSS: FileCss,
  SCSS: FileCss,
  C: FileC,
  "C++": FileCpp,
  Rust: FileRs,
  Vue: FileVue,
  TSQL: FileSql,
  PLpgSQL: FileSql,
  "Jupyter Notebook": Notebook,
};

// Tool names (lowercase) from data/technologies.ts -> icon
const TECH: Record<string, IconComponent> = {
  react: Atom,
  "next.js": Browsers,
  typescript: FileTs,
  javascript: FileJs,
  python: FilePy,
  firebase: Fire,
  github: GithubLogo,
  docker: Cube,
  "ai-assisted development": Sparkle,
};

export function LanguageIcon({ language, size = 14, className }: IconProps & { language: string | null }) {
  const Icon = (language && LANGUAGES[language]) || (language ? FileCode : Code);
  return <Icon size={size} className={className} aria-hidden />;
}

export function TechIcon({ name, size = 16, className }: IconProps & { name: string }) {
  const Icon = TECH[name.toLowerCase()] ?? Code;
  return <Icon size={size} className={className} aria-hidden />;
}
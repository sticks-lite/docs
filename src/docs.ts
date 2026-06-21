import home from "../pages/home.mdx?raw";
import gettingStarted from "../docs/getting-started.mdx?raw";
import installing from "../docs/installing.mdx?raw";
import basics from "../learn/basics.mdx?raw";
import classroomPrograms from "../learn/classroom-programs.mdx?raw";
import languageReference from "../reference/language-reference.mdx?raw";
import standardLibrary from "../reference/standard-library.mdx?raw";
import compilerInterpreter from "../docs/compiler-interpreter.mdx?raw";
import publicApi from "../docs/public-api.mdx?raw";
import errors from "../reference/errors.mdx?raw";
import { STICKS_LITE_VERSION_LABEL, renderVersionPlaceholders } from "./version";

export type DocPage = {
  id: string;
  title: string;
  group: string;
  description: string;
  body: string;
};

function doc(markdown: string): string {
  return renderVersionPlaceholders(markdown);
}

export const pages: DocPage[] = [
  {
    id: "overview",
    title: "Overview",
    group: "Home",
    description: "What Sticks Lite is and where to go first.",
    body: doc(home),
  },
  {
    id: "getting-started",
    title: "Quick Start",
    group: "Learn",
    description: "Install Sticks Lite, create main.slite, and run your first program.",
    body: doc(gettingStarted),
  },
  {
    id: "installing",
    title: "Installation and CLI",
    group: "Tools",
    description: "Install, update, and run .slite source files with sticks.",
    body: doc(installing),
  },
  {
    id: "learn-basics",
    title: "Learn the Basics",
    group: "Learn",
    description: "A classroom-friendly path through the language.",
    body: doc(basics),
  },
  {
    id: "classroom-programs",
    title: "Classroom Programs",
    group: "Learn",
    description: "Complete runnable programs migrated from the package examples.",
    body: doc(classroomPrograms),
  },
  {
    id: "language-reference",
    title: "Language Reference",
    group: "Reference",
    description: `The core Sticks Lite ${STICKS_LITE_VERSION_LABEL} syntax and behavior rules.`,
    body: doc(languageReference),
  },
  {
    id: "standard-library",
    title: "Standard Library",
    group: "Reference",
    description: "Built-ins for text, numbers, data structures, and errors.",
    body: doc(standardLibrary),
  },
  {
    id: "compiler-interpreter",
    title: "Interpreter Notes",
    group: "Tools",
    description: "How source files move through the lexer, parser, and runtime.",
    body: doc(compilerInterpreter),
  },
  {
    id: "public-api",
    title: "API and Embedding",
    group: "Tools",
    description: "Documented TypeScript exports for tools and classroom integrations.",
    body: doc(publicApi),
  },
  {
    id: "errors",
    title: "Errors",
    group: "Reference",
    description: "Friendly errors, hints, and classroom debugging guidance.",
    body: doc(errors),
  },
];

export const groupedPages = pages.reduce<Record<string, DocPage[]>>((acc, page) => {
  acc[page.group] ??= [];
  acc[page.group].push(page);
  return acc;
}, {});

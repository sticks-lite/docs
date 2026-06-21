import home from "../pages/home.mdx?raw";
import gettingStarted from "../docs/getting-started.mdx?raw";
import installing from "../docs/installing.mdx?raw";
import basics from "../learn/basics.mdx?raw";
import classroomPrograms from "../learn/classroom-programs.mdx?raw";
import languageReference from "../reference/language-reference.mdx?raw";
import standardLibrary from "../reference/standard-library.mdx?raw";
import compilerInterpreter from "../docs/compiler-interpreter.mdx?raw";
import publicApi from "../docs/public-api.mdx?raw";
import cli from "../docs/cli.mdx?raw";
import grammar from "../reference/grammar.mdx?raw";
import errors from "../reference/errors.mdx?raw";
import diagnostics from "../reference/diagnostics.mdx?raw";
import implementation from "../internals/implementation.mdx?raw";
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
    title: "Getting Started",
    group: "Learn",
    description: "Write and run your first Sticks Lite program.",
    body: doc(gettingStarted),
  },
  {
    id: "installing",
    title: "Installing",
    group: "Tools",
    description: "Install the CLI and verify the toolchain.",
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
    description: `The complete Sticks Lite ${STICKS_LITE_VERSION_LABEL} syntax and behavior reference.`,
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
    title: "Interpreter",
    group: "Tools",
    description: "Interpreter architecture, public APIs, and runtime model.",
    body: doc(compilerInterpreter),
  },
  {
    id: "public-api",
    title: "Public API",
    group: "Tools",
    description: "Documented TypeScript exports for tools and classroom integrations.",
    body: doc(publicApi),
  },
  {
    id: "cli",
    title: "CLI",
    group: "Tools",
    description: "Run .slite source files and project directories with the sticks CLI.",
    body: doc(cli),
  },
  {
    id: "grammar",
    title: "Grammar",
    group: "Reference",
    description: "A compact grammar reference for parser work.",
    body: doc(grammar),
  },
  {
    id: "errors",
    title: "Errors",
    group: "Reference",
    description: "Friendly errors, hints, and classroom debugging guidance.",
    body: doc(errors),
  },
  {
    id: "diagnostics",
    title: "Diagnostics",
    group: "Reference",
    description: "Modern error hints, CLI messages, and beginner mistake handling.",
    body: doc(diagnostics),
  },
  {
    id: "implementation",
    title: "Implementation Notes",
    group: "Internals",
    description: "How the lexer, parser, and interpreter fit together.",
    body: doc(implementation),
  },
];

export const groupedPages = pages.reduce<Record<string, DocPage[]>>((acc, page) => {
  acc[page.group] ??= [];
  acc[page.group].push(page);
  return acc;
}, {});

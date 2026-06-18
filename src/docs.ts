import index from "../docs/index.md?raw";
import gettingStarted from "../docs/getting-started.md?raw";
import installing from "../docs/installing.md?raw";
import tutorial from "../docs/tutorial.md?raw";
import languageReference from "../docs/language-reference.md?raw";
import standardLibrary from "../docs/standard-library.md?raw";
import compilerInterpreter from "../docs/compiler-interpreter.md?raw";
import publicApi from "../docs/public-api.md?raw";
import cli from "../docs/cli.md?raw";
import grammar from "../docs/grammar.md?raw";
import errors from "../docs/errors.md?raw";
import diagnostics from "../docs/diagnostics.md?raw";
import examples from "../docs/examples.md?raw";
import implementation from "../docs/implementation.md?raw";
import { STICKS_LITE_VERSION_LABEL } from "./version";

export type DocPage = {
  id: string;
  title: string;
  group: string;
  description: string;
  body: string;
};

export const pages: DocPage[] = [
  {
    id: "overview",
    title: "Overview",
    group: "Start",
    description: "What Sticks Lite is and where to go first.",
    body: index,
  },
  {
    id: "getting-started",
    title: "Getting Started",
    group: "Start",
    description: "Write and run your first Sticks Lite program.",
    body: gettingStarted,
  },
  {
    id: "installing",
    title: "Installing",
    group: "Start",
    description: "Install the CLI and verify the toolchain.",
    body: installing,
  },
  {
    id: "tutorial",
    title: "Tutorial",
    group: "Learn",
    description: "A classroom-friendly path through the language.",
    body: tutorial,
  },
  {
    id: "language-reference",
    title: "Language Reference",
    group: "Reference",
    description: `The complete Sticks Lite ${STICKS_LITE_VERSION_LABEL} syntax and behavior reference.`,
    body: languageReference,
  },
  {
    id: "standard-library",
    title: "Standard Library",
    group: "Reference",
    description: "Built-ins for text, numbers, data structures, and errors.",
    body: standardLibrary,
  },
  {
    id: "compiler-interpreter",
    title: "Interpreter",
    group: "Tooling",
    description: "Interpreter architecture, public APIs, and runtime model.",
    body: compilerInterpreter,
  },
  {
    id: "public-api",
    title: "Public API",
    group: "Tooling",
    description: "Documented TypeScript exports for tools and classroom integrations.",
    body: publicApi,
  },
  {
    id: "cli",
    title: "CLI",
    group: "Tooling",
    description: "Run .slite source files and project directories with the sticks CLI.",
    body: cli,
  },
  {
    id: "grammar",
    title: "Grammar",
    group: "Reference",
    description: "A compact grammar reference for parser work.",
    body: grammar,
  },
  {
    id: "errors",
    title: "Errors",
    group: "Reference",
    description: "Friendly errors, hints, and classroom debugging guidance.",
    body: errors,
  },
  {
    id: "diagnostics",
    title: "Diagnostics",
    group: "Reference",
    description: "Modern error hints, CLI messages, and beginner mistake handling.",
    body: diagnostics,
  },
  {
    id: "examples",
    title: "Examples",
    group: "Learn",
    description: "Small programs showing common patterns.",
    body: examples,
  },
  {
    id: "implementation",
    title: "Implementation Notes",
    group: "Tooling",
    description: "How the lexer, parser, and interpreter fit together.",
    body: implementation,
  },
];

export const groupedPages = pages.reduce<Record<string, DocPage[]>>((acc, page) => {
  acc[page.group] ??= [];
  acc[page.group].push(page);
  return acc;
}, {});
